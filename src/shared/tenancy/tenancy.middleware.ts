import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tenancyLocalStorage } from './tenancy.context';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
      const authHeader = req.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = Buffer.from(base64, 'base64').toString();
          const payload = JSON.parse(jsonPayload);
          if (payload && payload.tenantId) {
            tenantId = payload.tenantId;
          }
        } catch (e) {
          // Ignore decoding error, fallback to 'default'
        }
      }
    }

    if (!tenantId) {
      tenantId = 'default';
    }
    
    tenancyLocalStorage.run({ tenantId }, () => {
      next();
    });
  }
}
