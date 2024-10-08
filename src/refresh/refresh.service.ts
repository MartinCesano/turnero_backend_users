import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class RefreshService {
  constructor(private readonly jwtService: JwtService) { }

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }
}
