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
    const requiredPermissions = this.reflector.getAllAndOverride<
      string[] | { type: 'any' | 'all'; permissions: string[] }
    >(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const { user, tenantId } = this.getRequestContext(context);
    if (!user) {
      throw new UnauthorizedException('User is not authenticated');
    }

    if (user.isSuperuser) {
      return true;
    }

    if (!tenantId) {
      throw new ForbiddenException('Tenant ID is required for this operation');
    }

    try {
      await this.performSpecificAccessChecks(user.id, tenantId, requiredPermissions);
      if (Array.isArray(requiredPermissions)) {
        const checks = this.parsePermissions(requiredPermissions);
        const hasPermissions = await this.authorizationService.canAll(
          { userId: user.id, tenantId },
          checks,
        );
        
        if (!hasPermissions) {
          throw new ForbiddenException(
            `Need the following permissions: ${requiredPermissions.join(', ')}`,
          );
        }
      } else {
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
          const logicType = type === 'any' ? 'at least one' : 'all'; 
          throw new ForbiddenException(
            `Need to have ${logicType} of the following permissions: ${permissions.join(', ')}`,
          );
        }
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException || error instanceof UnauthorizedException) {
        throw error;
      }
      
      console.error('Error verifying permissions:', error);
      throw new ForbiddenException('Error verifying permissions');
    }
  }

  private getRequestContext(context: ExecutionContext): {
    user: any;
    tenantId: string;
  } {
    let request: any;
    try {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
    } catch {
      request = context.switchToHttp().getRequest();
    }

    return {
      user: request.user,
      tenantId: request.headers?.['x-tenant-id'] || request.tenantId,
    };
  }

  private async performSpecificAccessChecks(
    userId: string,
    tenantId: string | undefined,
    requiredPermissions: string[] | { type: 'any' | 'all'; permissions: string[] }
  ): Promise<void> {
    const permissions = Array.isArray(requiredPermissions) 
      ? requiredPermissions 
      : requiredPermissions.permissions;

    if (permissions.some(p => p.includes('users.create') || p.includes('users.manage'))) {
      if (tenantId) {
        const canCreate = await this.authorizationService.canCreateTenantOwner(userId, tenantId);
        if (!canCreate) {
          throw new ForbiddenException(
            'Only global admins or tenant owners can create tenant owners'
          );
        }
      }
    }

    if (permissions.some(p => p.includes('roles.assign') || p.includes('users.manage'))) {
      if (tenantId) {
        const canAddUser = await this.authorizationService.canAddUserToTenant(userId, tenantId);
        if (!canAddUser) {
          throw new ForbiddenException(
            'Only tenant owners or global admins can add users to tenant'
          );
        }
      }
    }

    if (tenantId) {
      const userTenants = await this.authorizationService.getUserTenants(userId);
      const hasAccessToTenant = userTenants.some(tenant => tenant.id === tenantId);
      
      if (!hasAccessToTenant) {
        throw new ForbiddenException(
          'User does not have access to the requested tenant'
        );
      }
    }
  }

  private parsePermissions(permissions: string[]): Array<{ resource: string; action: string }> {
    return permissions.map(permission => {
      const [resource, action] = permission.split('.');
      if (!resource || !action) {
        throw new Error(`Invalid permission format: ${permission}. Use the format "resource.action"`);
      }
      return { resource, action };
    });
  }
}