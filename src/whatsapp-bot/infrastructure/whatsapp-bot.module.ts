import { Module } from '@nestjs/common';
import { ProductosModule } from '../../productos/infrastructure/productos.module';
import { ItemsModule } from '../../items/infrastructure/items.module';
import { InventarioModule } from '../../inventario/infrastructure/inventario.module';
import { UsuariosModule } from '../../usuarios/infrastructure/usuarios.module';
import { WhatsappBotController } from './adapters/input/http/whatsapp-bot.controller';
import { WhatsappBotService } from '../application/services/whatsapp-bot.service';
import { WHATSAPP_BOT_USE_CASES } from '../domain/ports/input/whatsapp-bot-use-cases.interface';

@Module({
  imports: [ProductosModule, ItemsModule, InventarioModule, UsuariosModule],
  controllers: [WhatsappBotController],
  providers: [
    {
      provide: WHATSAPP_BOT_USE_CASES,
      useClass: WhatsappBotService,
    },
  ],
})
export class WhatsappBotModule {}
