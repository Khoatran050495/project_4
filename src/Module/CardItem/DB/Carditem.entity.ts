import { Order } from 'src/Module/Orders/DB/Orders.entity';
import { Product } from 'src/Module/Products/DB/Products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('CartItem')
export class CartItem {
  @PrimaryGeneratedColumn()
  CartItem_id: number;

  @Column({ nullable: true })
  Quantity: number;

  @Column()
  Product_id: number;

  @Column()
  Orders_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product: any) => product.carditem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'Product_id' })
  product: Product;

  @ManyToOne(() => Order, (orders: any) => orders.carditem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'Orders_id' })
  order: Order;
}
