import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import Users from './Users';

@Entity('tasks')
export default class Tasks {

  @PrimaryColumn()
  id: number; 

  @Column()
  description: string;

  @Column()
  yarTask: string;

  @Column()
  hourTask: string;

  @Column()
  isCheked : boolean;

  @Column()
  hourInMinutes: number;

   @Column()
   user_id : number;


  @ManyToOne(() => Users, user => user.task )
  @JoinColumn({ name: 'user_id' })
  user:Users;

}