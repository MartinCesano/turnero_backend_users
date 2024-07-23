// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { PermissionEntity } from 'src/entities/permission.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'turnero_users.db',
      entities: [UserEntity,PermissionEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}