import { CartItem } from 'src/Module/CardItem/DB/Carditem.entity';
import { User } from 'src/Module/Users/DB/Users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn()
  Orders_id: number;

  @Column({ nullable: false })
  Users_id: number;

  @Column({ default: 1 })
  status_orders: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user: any) => user.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'Users_id' })
  user: User;

  @OneToMany(() => CartItem, (CartItem: any) => CartItem.order)
  carditem: CartItem[];
}
