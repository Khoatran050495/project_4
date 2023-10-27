import { CartItem } from 'src/Module/CardItem/DB/Carditem.entity';
import { Comment } from 'src/Module/Comments/DB/Comments.entity';
import { History } from 'src/Module/History/DB/History.entity';
import { Spesc } from 'src/Module/Specs/DB/Specs.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imgSmall: string;

  @Column({ nullable: true })
  imgBig: string;

  @Column()
  nameProduct: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  color: string;

  @Column()
  goodsInStock: number;

  @Column('text')
  content: string;

  @Column()
  type: string;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Spesc, (spesc: any) => spesc.product)
  spesc: Spesc;

  @OneToMany(() => History, (History: any) => History.product, {
    onDelete: 'NO ACTION',
  })
  history: History[];

  @OneToMany(() => Comment, (Comment: any) => Comment.product)
  comment: Comment[];

  @OneToMany(() => CartItem, (CartItem: any) => CartItem.product)
  CartItem: CartItem[];
}
