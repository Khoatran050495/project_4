import { Product } from 'src/Module/Products/DB/Products.entity';
import { User } from 'src/Module/Users/DB/Users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  Users_id: number;

  @Column({ nullable: false })
  Product_id: number;

  @Column({ nullable: true })
  start: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user: any) => user.comments)
  @JoinColumn({ name: 'Users_id' })
  user: User;

  @ManyToOne(() => Product, (product: any) => product.comments)
  @JoinColumn({ name: 'Product_id' })
  product: Product;
}
