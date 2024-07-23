import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PermissionEntity extends BaseEntity	{
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, user => user.permissions)
  users: UserEntity[];
}
