import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async validateToken(@Body() body: { token: string }) {
    const isValid = await this.authorizationService.validateToken(body.token);
    if (!isValid) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return { valid: true };
  }

}
