import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../Users/Users.module';
import { UserService } from '../Users/Users.service';
import { History } from './DB/History.entity';
import { HistoryController } from './History.controller';
import { HistoryService } from './History.service';

@Module({
  imports: [TypeOrmModule.forFeature([History]), UserModule],
  controllers: [HistoryController],
  providers: [HistoryService, UserService],
})
export class HistoryModule {}
