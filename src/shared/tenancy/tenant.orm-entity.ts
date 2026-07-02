import { Column } from 'typeorm';

export abstract class TenantOrmEntity {
  @Column({ type: 'varchar', length: 100, default: 'default' })
  tenant_id: string;
}
