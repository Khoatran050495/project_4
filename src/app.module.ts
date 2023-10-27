import { config1 } from 'OrmConfigs';

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardItemModule } from './Module/CardItem/Carditem.module';
import { CommentModule } from './Module/Comments/Comments.module';
import { HistoryModule } from './Module/History/History.module';
import { OrdersModule } from './Module/Orders/Orders.module';
import { ProductsModule } from './Module/Products/Product.module';
import { SpecModule } from './Module/Specs/Specs.module';
import { UserModule } from './Module/Users/Users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config1),
    ProductsModule,
    SpecModule,
    UserModule,
    OrdersModule,
    HistoryModule,
    CommentModule,
    CardItemModule,
  ],
})
export class AppModule {}
