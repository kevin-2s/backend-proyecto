import { Module } from '@nestjs/common';
import { QrController } from './adapters/input/http/qr.controller';
import { QrService } from '../application/services/qr.service';
import { ItemsModule } from '../../items/infrastructure/items.module';

@Module({
  imports: [ItemsModule],
  controllers: [QrController],
  providers: [QrService],
})
export class QrModule {}
