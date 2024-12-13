import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  constructor(
    id: string,
    props: {
      name: string;
      username: string;
      password: string;
    },
  ) {
    Object.assign(this, props);
    this.id = id;
  }
}
