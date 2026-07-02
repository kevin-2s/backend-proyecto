import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tenancyLocalStorage } from './tenancy.context';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let payloadObj: any = null;

    // Decode token payload first to check roles and the token's tenantId
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = Buffer.from(base64, 'base64').toString();
        payloadObj = JSON.parse(jsonPayload);
      } catch {
        // Ignore decoding error
      }
    }

    // Enforce tenantId resolution
    let tenantId: string;
    const isSuperAdmin = payloadObj?.roles?.map((r: string) => r.toLowerCase()).includes('super administrador');

    if (isSuperAdmin) {
      // Super Admin can override tenantId using x-tenant-id header (for cross-tenant actions)
      tenantId = (req.headers['x-tenant-id'] as string) || payloadObj?.tenantId || 'GLOBAL';
    } else {
      // Non-super-admins are strictly locked to the tenantId inside their verified JWT token
      tenantId = payloadObj?.tenantId;
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
