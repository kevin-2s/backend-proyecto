import { Module } from '@nestjs/common';
import { CodigoBarrasController } from './adapters/input/http/codigo-barras.controller';
import { CodigoBarrasService } from '../application/services/codigo-barras.service';
import { ItemsModule } from '../../items/infrastructure/items.module';

@Module({
  imports: [ItemsModule],
  controllers: [CodigoBarrasController],
  providers: [CodigoBarrasService],
})
export class CodigoBarrasModule {}
