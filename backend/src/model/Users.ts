import { Entity , Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate
  , OneToMany, JoinColumn } from 'typeorm';
import bcrypt from 'bcryptjs';

import Tasks from './Tasks';

@Entity('users')
class Users {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  haPassword(){
    this.password = bcrypt.hashSync(this.password,8);
  }


  @OneToMany(type => Tasks, task => task.user,{
    cascade: ['update', 'remove']
  })
  @JoinColumn({ name: 'user_id' })
  task: Tasks[];


}

export default Users;