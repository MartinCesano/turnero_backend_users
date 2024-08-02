import { Module } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthorizationService,JwtService],
  imports: [UsersModule],
  exports: [AuthorizationService], 
  controllers: [AuthorizationController], 
})
export class AuthorizationModule {}

