import { Comment } from 'src/Module/Comments/DB/Comments.entity';
import { History } from 'src/Module/History/DB/History.entity';
import { Order } from 'src/Module/Orders/DB/Orders.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imgavatar: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  passwords: string;

  @Column({ nullable: false })
  phoneNumber: number;

  @Column({ nullable: false })
  birthday: Date;

  @Column({ nullable: false })
  address: string;

  @Column({ default: 1 })
  status: number;

  @Column({ default: 1 })
  role: number;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  expirationTime: Date;

  @Column({ default: 1 })
  typeLogin: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Order, (Order: any) => Order.product)
  order: Order;

  @OneToMany(() => History, (History: any) => History.product, {
    onDelete: 'NO ACTION',
  })
  history: History[];

  @OneToMany(() => Comment, (Comment: any) => Comment.product)
  comment: Comment[];
}
