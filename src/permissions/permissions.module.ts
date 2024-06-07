import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionEntity } from 'src/entities/permissions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  providers: [PermissionsService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
