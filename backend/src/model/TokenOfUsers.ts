import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , JoinColumn} from 'typeorm';

import Users from './Users';

@Entity('userTokns')
export default class TokenOfUsers {
  @PrimaryGeneratedColumn('increment')
  id:number

  @Column()
  token: string;

  @Column()
  isValid: boolean;

  @Column()
  user_id: number

  @ManyToOne(() => Users, user => user.tokenOfUser)
  @JoinColumn({ name: 'user_id' })
  user: Users;

}