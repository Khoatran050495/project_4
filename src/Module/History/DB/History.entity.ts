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

@Entity('History')
export class History {
  @PrimaryGeneratedColumn()
  History_id: number;

  @Column({ nullable: false })
  Orders_id: number;

  @Column({ nullable: false })
  CartItem_id: number;

  @Column({ nullable: false })
  Users_id: number;

  @Column({ nullable: false })
  Product_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  Total_Price: number;

  @Column({ nullable: false })
  Quantity: number;

  @Column({ nullable: false })
  Payment: string;

  @Column({ default: 1 })
  Status_history: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user: any) => user.histories)
  @JoinColumn({ name: 'Users_id' })
  user: User;

  @ManyToOne(() => Product, (product: any) => product.histories)
  @JoinColumn({ name: 'Product_id' })
  product: Product;
}
