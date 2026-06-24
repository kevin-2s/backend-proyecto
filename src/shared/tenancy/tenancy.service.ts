import { Injectable } from '@nestjs/common';
import { tenancyLocalStorage } from './tenancy.context';

@Injectable()
export class TenancyService {
  getTenantId(): string {
    const store = tenancyLocalStorage.getStore();
    return store ? store.tenantId : 'default';
  }
}
