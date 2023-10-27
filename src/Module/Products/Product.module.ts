import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecModule } from '../Specs/Specs.module';
import { SpecService } from '../Specs/Specs.service';
import { Product } from './DB/Products.entity';
import { ProductController } from './product.controller';
import { ProductService } from './Product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SpecModule],
  controllers: [ProductController],
  providers: [ProductService, SpecService],
})
export class ProductsModule {}
