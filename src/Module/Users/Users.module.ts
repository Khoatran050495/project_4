import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoogleStrategy } from '../Strategy/Google.Strategy';
import { User } from './DB/Users.entity';
import { UserController } from './Users.controller';
import { UserService } from './Users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [UserController],
  providers: [UserService, GoogleStrategy],
  exports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
