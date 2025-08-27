import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Estender a interface Request para incluir tenantId
declare global {
  namespace Express {
    interface Request {
      tenantId?: string;
    }
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extrair tenant-id do header x-tenant-id
    const tenantId = req.headers['x-tenant-id'] as string;
    
    // Validar se o tenant-id é uma string válida (opcional)
    if (tenantId && typeof tenantId === 'string' && tenantId.trim()) {
      req.tenantId = tenantId.trim();
    }
    
    next();
  }
}