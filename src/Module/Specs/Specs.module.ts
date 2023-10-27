import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spesc } from './DB/Specs.entity';
import { SpecController } from './Specs.controller';
import { SpecService } from './Specs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spesc])],
  controllers: [SpecController],
  providers: [SpecService],
  exports: [TypeOrmModule.forFeature([Spesc])],
})
export class SpecModule {}
