import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersModule } from '../Orders/Orders.module';
import { OrderService } from '../Orders/Orders.service';
import { CardItemController } from './Carditem.controller';
import { CardItemService } from './Carditem.service';
import { CartItem } from './DB/Carditem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), OrdersModule],
  controllers: [CardItemController],
  providers: [CardItemService, OrderService],
})
export class CardItemModule {}
