import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { UserI } from '../interfaces/user.interface';
import { PermissionEntity } from './permission.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @ManyToMany(() => PermissionEntity, permission => permission.users, { eager: true })
  @JoinTable()
  permissions: PermissionEntity[];


  get permissionCodes() {
    if (!this.permissions) {
      return [];
    }
    return this.permissions.map(permission => permission.name);
  }
}
