import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthorizationService } from '../authorization.service';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obter permissões necessárias dos metadados
    const requiredPermissions = this.reflector.getAllAndOverride<
      string[] | { type: 'any' | 'all'; permissions: string[] }
    >(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se não há permissões especificadas, permitir acesso
    if (!requiredPermissions) {
      return true;
    }

    // Obter usuário e tenant-id do contexto
    const { user, tenantId } = this.getRequestContext(context);

    // Verificar se usuário está autenticado
    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    // Verificar se tenant-id está presente (se necessário)
    if (!tenantId) {
      throw new ForbiddenException('Tenant ID é obrigatório');
    }

    try {
      // Verificar permissões baseado no tipo
      if (Array.isArray(requiredPermissions)) {
        // Comportamento padrão: verificar se tem todas as permissões (AND)
        const checks = this.parsePermissions(requiredPermissions);
        const hasPermissions = await this.authorizationService.canAll(
          { userId: user.id, tenantId },
          checks,
        );
        
        if (!hasPermissions) {
          throw new ForbiddenException(
            `Permissões necessárias: ${requiredPermissions.join(', ')}`,
          );
        }
      } else {
        // Verificação com tipo específico (any/all)
        const { type, permissions } = requiredPermissions;
        const checks = this.parsePermissions(permissions);
        let hasPermissions: boolean;

        if (type === 'any') {
          hasPermissions = await this.authorizationService.canAny(
            { userId: user.id, tenantId },
            checks,
          );
        } else {
          hasPermissions = await this.authorizationService.canAll(
            { userId: user.id, tenantId },
            checks,
          );
        }

        if (!hasPermissions) {
          const logicType = type === 'any' ? 'pelo menos uma' : 'todas';
          throw new ForbiddenException(
            `Necessário ter ${logicType} das permissões: ${permissions.join(', ')}`,
          );
        }
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException || error instanceof UnauthorizedException) {
        throw error;
      }
      
      // Log do erro para debugging
      console.error('Erro ao verificar permissões:', error);
      throw new ForbiddenException('Erro ao verificar permissões');
    }
  }

  private getRequestContext(context: ExecutionContext): {
    user: any;
    tenantId: string;
  } {
    let request: any;

    // Tentar obter contexto GraphQL primeiro
    try {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
    } catch {
      // Se falhar, usar contexto HTTP regular
      request = context.switchToHttp().getRequest();
    }

    return {
      user: request.user,
      tenantId: request.headers?.['x-tenant-id'] || request.tenantId,
    };
  }

  /**
   * Converte strings de permissões no formato "resource.action" 
   * para objetos { resource, action }
   */
  private parsePermissions(permissions: string[]): Array<{ resource: string; action: string }> {
    return permissions.map(permission => {
      const [resource, action] = permission.split('.');
      if (!resource || !action) {
        throw new Error(`Formato de permissão inválido: ${permission}. Use o formato "resource.action"`);
      }
      return { resource, action };
    });
  }
}