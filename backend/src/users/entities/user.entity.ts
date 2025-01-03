import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserRoles } from '../DTO/user-roles.enum';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ default: 0 })
  reputationPoints: number;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.User,
  })
  role: UserRoles;

  constructor(
    id: string,
    props: {
      name: string;
      password: string;
      email: string;
      profilePicture?: string;
      reputationPoints?: number;
      role?: UserRoles;
    },
  ) {
    Object.assign(this, props);
    this.id = id;
  }
}
