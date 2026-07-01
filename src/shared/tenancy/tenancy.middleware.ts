import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tenancyLocalStorage } from './tenancy.context';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let payloadObj: any = null;
    let tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
      const authHeader = req.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = Buffer.from(base64, 'base64').toString();
          payloadObj = JSON.parse(jsonPayload);
          if (payloadObj && payloadObj.tenantId) {
            tenantId = payloadObj.tenantId;
          }
        } catch (e) {
          // Ignore decoding error
        }
      }
    }

    if (!tenantId || tenantId === 'default') {
      if (payloadObj && payloadObj.roles && Array.isArray(payloadObj.roles)) {
        const rolesLower = payloadObj.roles.map((r: string) => r.toLowerCase());
        if (rolesLower.includes('super administrador')) {
          tenantId = 'GLOBAL';
        } else if (rolesLower.includes('administrador')) {
          tenantId = 'BLOCKED';
        } else {
          tenantId = 'default';
        }
      } else {
        tenantId = 'default';
      }
    }
    
    tenancyLocalStorage.run({ tenantId }, () => {
      next();
    });
  }
}
