import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../Users/Users.module';
import { UserService } from '../Users/Users.service';
import { Order } from './DB/Orders.entity';
import { OrderController } from './Orders.controller';
import { OrderService } from './Orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}
