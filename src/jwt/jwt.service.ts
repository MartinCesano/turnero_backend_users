import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { Payload } from 'src/interfaces/payload';
import * as moment from 'moment';

@Injectable()
export class JwtService {
  config = {
    auth: {
      secret: 'authSecret',
      expiresIn: '15m',
    },
    refresh: {
      secret: 'refreshSecret',
      expiresIn: '1d',
    },
  };

  generateToken(
    payload: { email: string },
    type: 'refresh' | 'auth' = 'auth',
  ): string {
    return sign(payload, this.config[type].secret, {
      expiresIn: this.config[type].expiresIn,
    });
  }

  refreshToken(refreshToken: string) {
    try {
      const payload = verify(refreshToken, this.config.refresh.secret) as Payload;
      const currentTime = Math.floor(Date.now() / 1000);
      const timeToExpire = (payload.exp - currentTime) / 60;
      if (timeToExpire < 20) { // Si el token está a menos de 20 minutos de expirar
        return {
          accessToken: this.generateToken({ email: payload.email }),
          refreshToken: this.generateToken({ email: payload.email }, 'refresh'),
          expirationTime: moment().add(10, 'minutes').toDate(),
        };
      } else {
        return {
          accessToken: this.generateToken({ email: payload.email }),
          expirationTime: moment().add(10, 'minutes').toDate(),
        };
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  getPayload(token: string, type: 'refresh' | 'auth' = 'auth'): Payload {
    return verify(token, this.config[type].secret) as Payload;
  }

  validateToken(token: string, type: 'refresh' | 'auth' = 'auth'): Payload {
    try {
      return verify(token, this.config[type].secret) as Payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
