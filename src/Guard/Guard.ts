import * as jwt from 'jsonwebtoken';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization.split(' ')[1]; // Bearer Token
      const decoded = jwt.verify(token, process.env.DB_SCERETKEY);
      if (typeof decoded === 'object' && decoded !== null) {
        request.userId = decoded.id;
        request.userRole = decoded.role;
      }
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
