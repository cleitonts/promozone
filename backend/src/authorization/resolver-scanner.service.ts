import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { ModulesContainer } from '@nestjs/core';
import { RESOLVER_TYPE_METADATA, RESOLVER_NAME_METADATA } from '@nestjs/graphql/dist/graphql.constants';
import { ENTRY_PROVIDER_WATERMARK, GUARDS_METADATA } from '@nestjs/common/constants';
import { ResolverOperationDTO } from '@/authorization/dto/resolver-operation.dto';
import * as path from 'path';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Injectable()
export class ResolverScannerService {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly modulesContainer: ModulesContainer,
  ) {}

  private getModulePath(moduleMetatype: any, isAutoResolver: boolean = false): string | undefined {
    if (!moduleMetatype || typeof moduleMetatype !== 'function') return undefined;

    const cache: Record<string, NodeModule> | undefined = (require as any)?.cache;
    if (!cache) return moduleMetatype.name;

    const filePath = Object.values(cache)
      .find((mod) => {
        const exp = mod?.exports;
        if (!exp) return false;
        if (exp === moduleMetatype) return true;
        if (typeof exp === 'object') {
          try {
            const values = Object.values(exp);
            if (values.includes(moduleMetatype)) return true;
            // Also match by constructor name to handle transpiled export wrappers
            return values.some((v) => typeof v === 'function' && v.name === moduleMetatype.name);
          } catch {
            return false;
          }
        }
        if (typeof exp === 'function' && (exp as any).name === moduleMetatype.name) return true;
        return false;
      })?.filename;

    if (!filePath) return moduleMetatype.name;

    if (filePath.includes('node_modules')) {
      return moduleMetatype.name;
    }

    const dirPath = path.dirname(filePath);

    if (isAutoResolver) {
      return this.getPathAfterSegment(dirPath, 'dist') ?? path.relative(process.cwd(), dirPath);
    }

    // Manual resolvers
    const projectRoot = process.cwd();
    const relativePath = path.relative(projectRoot, dirPath);
    const afterSrc = this.getPathAfterSegment(relativePath, 'src');
    if (afterSrc) return afterSrc;
    const afterDist = this.getPathAfterSegment(relativePath, 'dist');
    if (afterDist) return afterDist;
    return relativePath;
  }

  private getPathAfterSegment(p: string, segment: 'src' | 'dist'): string | undefined {
    if (!p) return undefined;
    const normalized = p.replace(/\\/g, '/');
    const parts = normalized.split('/').filter(Boolean);
    const idx = parts.indexOf(segment);
    if (idx === -1) return undefined;
    return parts.slice(idx + 1).join('/');
  }

  // Locate the actual file path for a class (e.g., a resolver)
  private getClassPath(target: any): string | undefined {
    if (!target || typeof target !== 'function') return undefined;

    const cache: Record<string, NodeModule> | undefined = (require as any)?.cache;
    if (!cache) return undefined;

    const filePath = Object.values(cache)
      .find((mod) => {
        const exp = mod?.exports;
        if (!exp) return false;
        if (exp === target) return true;
        if (typeof exp === 'object') {
          try {
            const values = Object.values(exp);
            if (values.includes(target)) return true;
            return values.some((v) => typeof v === 'function' && v.name === target.name);
          } catch {
            return false;
          }
        }
        if (typeof exp === 'function' && (exp as any).name === target.name) return true;
        return false;
      })?.filename;

    if (!filePath) return undefined;

    const dirPath = path.dirname(filePath);
    // Prefer src for manual resolver class files; fallback to dist
    return this.getPathAfterSegment(dirPath, 'src') ?? this.getPathAfterSegment(dirPath, 'dist') ?? path.relative(process.cwd(), dirPath);
  }

  private findImporterModule(hostModule: any): any | undefined {
    const modules = Array.from(this.modulesContainer.values());
    for (const m of modules as any[]) {
      try {
        if (m?.imports?.has(hostModule)) {
          return m;
        }
      } catch {
      }
    }
    return undefined;
  }

  private getAllMethodNames(proto: any): string[] {
    const names = new Set<string>();
    let current = proto;
    while (current && current !== Object.prototype) {
      for (const name of Object.getOwnPropertyNames(current)) {
        if (name === 'constructor') continue;
        const desc = Object.getOwnPropertyDescriptor(current, name);
        if (desc && typeof desc.value === 'function') {
          names.add(name);
        }
      }
      current = Object.getPrototypeOf(current);
    }
    return Array.from(names);
  }

  private hasAuthGuard(guards: any[]): boolean {
    if (!guards || !Array.isArray(guards)) return false;
    return guards.some(guard => 
      guard === JwtAuthGuard || 
      guard?.name === 'JwtAuthGuard' ||
      (typeof guard === 'function' && guard.prototype instanceof JwtAuthGuard)
    );
  }

  private checkMethodAuthentication(proto: any, methodName: string): boolean {
    let p = proto;
    while (p && p !== Object.prototype) {
      const desc = Object.getOwnPropertyDescriptor(p, methodName);
      const fn = desc?.value;
      if (typeof fn === 'function') {
        const guards = Reflect.getMetadata(GUARDS_METADATA, fn);
        if (this.hasAuthGuard(guards)) return true;
      }
      
      const guards = Reflect.getMetadata(GUARDS_METADATA, p, methodName);
      if (this.hasAuthGuard(guards)) return true;
      
      p = Object.getPrototypeOf(p);
    }
    return false;
  }

  private checkClassAuthentication(clsRef: any): boolean {
    const guards = Reflect.getMetadata(GUARDS_METADATA, clsRef);
    return this.hasAuthGuard(guards);
  }

  private checkAutoResolverAuthentication(hostModule: any): boolean {
    try {
      const moduleInstance = hostModule?.instance;
      if (!moduleInstance) return false;
      
      const resolverConfig = moduleInstance?.resolvers?.[0];
      if (!resolverConfig) return false;
      
      const guards = resolverConfig.guards || [];
      return this.hasAuthGuard(guards);
    } catch {
      return false;
    }
  }

  scan(): ResolverOperationDTO[] {
    const providers = this.discovery.getProviders();
    const result: ResolverOperationDTO[] = [];

    for (const wrapper of providers as any[]) {
      // Use instance constructor as fallback for auto-generated resolvers
      const clsRef: any = wrapper?.instance?.constructor ?? wrapper?.metatype;
      if (!clsRef || typeof clsRef !== 'function') continue;

      const hostModule = wrapper.host;
      const importer = this.findImporterModule(hostModule);
      
      // Detect auto-resolver: check if hostModule name contains "NestjsQuery" or if resolver class name is auto-generated
      const isAutoResolver = hostModule?.metatype?.name?.includes('NestjsQuery') || 
                            clsRef.name.includes('AutoResolver') ||
                            clsRef.name.includes('Generated') ||
                            !clsRef.name.endsWith('Resolver');
      
      // Resolve moduleName differently for auto vs manual resolvers
      const moduleName = isAutoResolver
        ? (this.getModulePath(importer?.metatype, true) ?? this.getModulePath(hostModule?.metatype, true))
        : (this.getClassPath(clsRef) ?? this.getModulePath(importer?.metatype, false) ?? this.getModulePath(hostModule?.metatype, false));
      
      const proto = clsRef.prototype;

      const isResolver = !!Reflect.getMetadata(ENTRY_PROVIDER_WATERMARK, clsRef);
      // Detect if any method along the prototype chain has GraphQL operation metadata
      const methodNames = this.getAllMethodNames(proto);
      const hasOperationMetadata = methodNames.some((name) => {
        let p = proto;
        while (p && p !== Object.prototype) {
          // Check metadata attached to the method function itself
          const desc = Object.getOwnPropertyDescriptor(p, name);
          const fn = desc?.value;
          if (typeof fn === 'function' && (Reflect.hasMetadata(RESOLVER_TYPE_METADATA, fn) || Reflect.hasMetadata(RESOLVER_NAME_METADATA, fn))) {
            return true;
          }
          // Fallback: check metadata stored on prototype + property key
          if (Reflect.hasMetadata(RESOLVER_TYPE_METADATA, p, name) || Reflect.hasMetadata(RESOLVER_NAME_METADATA, p, name)) {
            return true;
          }
          p = Object.getPrototypeOf(p);
        }
        return false;
      });

      // Skip classes that are neither resolvers nor have GraphQL operation metadata
      if (!isResolver && !hasOperationMetadata) continue;

      const resolverName: string = Reflect.getMetadata(RESOLVER_NAME_METADATA, clsRef) ?? clsRef.name;

      for (const methodName of methodNames) {
        // find metadata up the prototype chain
        let p = proto;
        let type: string | undefined;
        let schemaName: string | undefined;
        while (p && p !== Object.prototype) {
          // Prefer metadata attached directly to the method function
          const desc = Object.getOwnPropertyDescriptor(p, methodName);
          const fn = desc?.value;
          if (typeof fn === 'function') {
            type = type ?? Reflect.getMetadata(RESOLVER_TYPE_METADATA, fn);
            schemaName = schemaName ?? Reflect.getMetadata(RESOLVER_NAME_METADATA, fn);
          }
          // Fallback: check metadata on prototype + property key
          type = type ?? Reflect.getMetadata(RESOLVER_TYPE_METADATA, p, methodName);
          schemaName = schemaName ?? Reflect.getMetadata(RESOLVER_NAME_METADATA, p, methodName);
          if (type && schemaName) break;
          p = Object.getPrototypeOf(p);
        }
        if (!type) continue;

        // Determine authentication requirement (method -> class -> auto-resolver config)
        const requiresAuth =
          this.checkMethodAuthentication(proto, methodName) ||
          this.checkClassAuthentication(clsRef) ||
          (isAutoResolver ? this.checkAutoResolverAuthentication(hostModule) : false);

        // Skip unauthenticated operations
        if (!requiresAuth) {
          continue;
        }

        result.push({
          moduleName,
          resolverClass: clsRef.name,
          resolverName,
          methodName,
          schemaName: schemaName ?? methodName,
          type,
          requiresAuth,
        });
      }
    }

    // Stable ordering for readability
    result.sort((a, b) => {
      if ((a.moduleName ?? '') !== (b.moduleName ?? '')) return (a.moduleName ?? '').localeCompare(b.moduleName ?? '');
      if (a.resolverClass !== b.resolverClass) return a.resolverClass.localeCompare(b.resolverClass);
      return a.schemaName.localeCompare(b.schemaName);
    });

    return result;
  }
}