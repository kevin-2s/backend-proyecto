import { AsyncLocalStorage } from 'async_hooks';

export interface TenancyStore {
  tenantId: string;
}

export const tenancyLocalStorage = new AsyncLocalStorage<TenancyStore>();
