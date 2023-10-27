import { Strategy } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UserService } from '../Users/Users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UserService) {
    super({
      clientID:
        '260417994258-bknoo6los7j937fgp1m970vf87u7s5cc.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8888/api/v1/user/oauth-google',
      scope: ['profile', 'email'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    try {
      const dataResponse = await this.userService.validateOAuth(profile);
      done(null, dataResponse);
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  }
}
