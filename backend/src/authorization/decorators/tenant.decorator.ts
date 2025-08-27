import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Decorator para extrair o tenant-id do contexto da requisição
 * Funciona tanto para HTTP quanto para GraphQL
 */
export const TenantId = createParamDecorator(
  (data: unknown, context: ExecutionContext): string | undefined => {
    let request: any;
    
    // Tentar obter contexto GraphQL primeiro
    try {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
    } catch {
      // Se falhar, usar contexto HTTP regular
      request = context.switchToHttp().getRequest();
    }
    
    // Extrair do header x-tenant-id
    const tenantId = request?.headers?.['x-tenant-id'];
    return tenantId && typeof tenantId === 'string' ? tenantId.trim() : undefined;
  },
);