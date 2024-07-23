import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { RefreshModule } from './refresh/refresh.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    JwtModule,
    AuthModule,
    PermissionsModule,
    UsersModule,
    LoginModule, 
    RefreshModule, 
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
