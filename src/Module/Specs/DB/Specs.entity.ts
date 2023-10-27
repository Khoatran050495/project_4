import { Product } from 'src/Module/Products/DB/Products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Spescproducts')
export class Spesc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  product_id: number;

  @Column({ nullable: true })
  manufacturer: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  caliber: number;

  @Column({ nullable: true })
  velocity: number;

  @Column({ nullable: true })
  conditions: string;

  @Column({ nullable: true })
  ammo_type: string;

  @Column({ nullable: true })
  actions: string;

  @Column({ nullable: true })
  barrel_style: string;

  @Column({ nullable: true })
  fire_mode: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  gun_weight: number;

  @Column({ nullable: true })
  loudness: number;

  @Column({ nullable: true })
  mechanism: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  Ammo_Weight: number;

  @Column({ nullable: true })
  Pellet_Shape: string;

  @Column({ nullable: true })
  Pellet_Quantity: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Product, (product) => product.spesc, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
