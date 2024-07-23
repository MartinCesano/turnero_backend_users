import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from 'src/jwt/jwt.module';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [JwtModule, PermissionsModule],
  exports: [UsersService],
})
export class UsersModule {}
