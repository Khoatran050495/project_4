import { Response } from 'express';
import { Between, getRepository, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Spesc } from '../Specs/DB/Specs.entity';
import { SpecDTO } from '../Specs/DTO/Specs.DTO';
import { Product } from './DB/Products.entity';
import { ProductDTO } from './DTO/Product.DTO';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Spesc) private spescRepository: Repository<Spesc>,
  ) {}

  //===================================================================================> POST all products
  async postAllProduct(data: ProductDTO[]) {
    try {
      this.productRepository.create(data);
      await this.productRepository.save(data);
      return { message: 'success' };
    } catch (error) {
      return error;
    }
  }

  //================================================================================> GET all products
  async getAllProduct(res: Response) {
    try {
      const dataUser = await this.productRepository
        .createQueryBuilder('products')
        .select([
          'products.id AS "id"',
          'products.imgSmall AS "imgSmall"',
          'products.imgBig AS "imgBig"',
          'products.nameProduct AS "nameProduct"',
          'products.price AS "price"',
          'products.color AS "color"',
          'products.goodsInStock AS "goodsInStock"',
          'products.content AS "content"',
          'products.type AS "type"',
          'products.status AS "status"',
          'ROUND(AVG(comment.start), 0) AS totalStart',
          'COUNT(comment.start) AS commentCount',
        ])
        .leftJoin('products.comment', 'comment')
        .groupBy('products.id')
        .getRawMany();

      // const dataUser = await this.productRepository.find({
      //   select: [
      //     'id',
      //     'imgSmall',
      //     'imgBig',
      //     'nameProduct',
      //     'price',
      //     'color',
      //     'goodsInStock',
      //     'content',
      //     'type',
      //   ],
      //   relations: ['comment'], // Sử dụng tên của mối quan hệ trong entity Product
      //   join: {
      //     alias: 'products',
      //     leftJoinAndSelect: {
      //       comments: 'products.comment',
      //     },
      //   },
      //   group: {
      //     id: 'products.id',
      //   },
      //   addSelect: [
      //     'ROUND(AVG(comment.start), 0) AS totalStart',
      //     'COUNT(comment.start) AS commentCount',
      //   ],
      // });

      return res.status(200).json({ data: dataUser });
    } catch (error) {
      return error;
    }
  }

  //================================================================================> GET products by id
  async getProduct(id: number, res: Response) {
    try {
      const dataUser = await this.productRepository
        .createQueryBuilder('products')
        .select([
          'products.id AS "id"',
          'products.imgSmall AS "imgSmall"',
          'products.imgBig AS "imgBig"',
          'products.nameProduct AS "nameProduct"',
          'products.price AS "price"',
          'products.color AS "color"',
          'products.goodsInStock AS "goodsInStock"',
          'products.content AS "content"',
          'products.type AS "type"',
          'products.status AS "status"',
          'ROUND(AVG(comment.start), 0) AS "totalStart"',
          'COUNT(comment.start) AS "commentCount"',
        ])
        .leftJoin('products.comment', 'comment')
        .leftJoinAndSelect('products.spesc', 'spesc') // Thêm liên kết với bảng spec
        .where('products.id = :id', { id }) // Điều kiện WHERE cho trường id
        .groupBy('products.id')
        .getRawMany();

      if (dataUser) {
        return res.status(200).json({ data: dataUser });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //================================================================================> GET products by type
  async getProductByType(type: string, res: Response) {
    try {
      const dataUser = await this.productRepository
        .createQueryBuilder('products')
        .select([
          'products.id AS "id"',
          'products.imgSmall AS "imgSmall"',
          'products.imgBig AS "imgBig"',
          'products.nameProduct AS "nameProduct"',
          'products.price AS "price"',
          'products.color AS "color"',
          'products.goodsInStock AS "goodsInStock"',
          'products.content AS "content"',
          'products.type AS "type"',
          'products.status AS "status"',
          'ROUND(AVG(comment.start), 0) AS "totalStart"',
          'COUNT(comment.start) AS "commentCount"',
        ])
        .leftJoin('products.comment', 'comment')
        .leftJoinAndSelect('products.spesc', 'spesc') // Thêm liên kết với bảng spec
        .where('products.type = :type', { type }) // Điều kiện WHERE cho trường id
        .groupBy('products.id')
        .getRawMany();
      if (dataUser) {
        return res.status(200).json({ data: dataUser });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //================================================================================> GET products by price
  async getProductByPrice(type: string, price: string, res: Response) {
    // trường loại hàng nhập vào
    const typeproduct = type.split('-');

    const typeproduct1 = typeproduct[0];
    const typeproduct2 = typeproduct[1];

    // trường giá nhập vào
    const value = price;
    const priceRange = value.split('-');

    const minPrice: number = parseInt(priceRange[0]);
    const maxPrice: number = parseInt(priceRange[1]);

    try {
      const dataUser = await this.productRepository
        .createQueryBuilder('products')
        .select([
          'products.id AS "id"',
          'products.imgSmall AS "imgSmall"',
          'products.imgBig AS "imgBig"',
          'products.nameProduct AS "nameProduct"',
          'products.price AS "price"',
          'products.color AS "color"',
          'products.goodsInStock AS "goodsInStock"',
          'products.content AS "content"',
          'products.type AS "type"',
          'products.status AS "status"',
          'ROUND(AVG(comment.start), 0) AS "totalStart"',
          'COUNT(comment.start) AS "commentCount"',
        ])
        .leftJoin('products.comment', 'comment')
        .leftJoin('products.spesc', 'spesc')
        .where('products.type = :typeproduct1', { typeproduct1 })
        .andWhere('products.price BETWEEN :minPrice AND :maxPrice', {
          minPrice,
          maxPrice,
        })
        .orWhere('products.type = :typeproduct2', { typeproduct2 })
        .andWhere('products.price BETWEEN :minPrice AND :maxPrice', {
          minPrice,
          maxPrice,
        })
        .groupBy('products.id')
        .getRawMany();

      if (dataUser) {
        return res.status(200).json({ data: dataUser });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //================================================================================> GET products by velocity
  async getProductByVelocity(velocity: string, res: Response) {
    // trường loại hàng nhập vào
    const velocityproduct = velocity.split('-');

    const velocityproduct1: number = parseInt(velocityproduct[0]);
    const velocityproduct2: number = parseInt(velocityproduct[1]);

    try {
      const dataUser = await this.productRepository
        .createQueryBuilder('products')
        .select([
          'products.id AS "id"',
          'products.imgSmall AS "imgSmall"',
          'products.imgBig AS "imgBig"',
          'products.nameProduct AS "nameProduct"',
          'products.price AS "price"',
          'products.color AS "color"',
          'products.goodsInStock AS "goodsInStock"',
          'products.content AS "content"',
          'products.type AS "type"',
          'products.status AS "status"',
          'ROUND(AVG(comment.start), 0) AS "totalStart"',
          'COUNT(comment.start) AS "commentCount"',
        ])
        .leftJoin('products.comment', 'comment')
        .leftJoin('products.spesc', 'spesc')
        .where(
          'spesc.velocity BETWEEN :velocityproduct1 AND :velocityproduct2',
          {
            velocityproduct1,
            velocityproduct2,
          },
        )
        .groupBy('products.id')
        .getRawMany();

      if (dataUser) {
        return res.status(200).json({ data: dataUser });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //================================================================================> GET products by Loudness
  async getProductByLoudness(Loudness: string, res: Response) {
    try {
      const dataUser = await this.productRepository
        .createQueryBuilder('products')
        .select([
          'products.id AS "id"',
          'products.imgSmall AS "imgSmall"',
          'products.imgBig AS "imgBig"',
          'products.nameProduct AS "nameProduct"',
          'products.price AS "price"',
          'products.color AS "color"',
          'products.goodsInStock AS "goodsInStock"',
          'products.content AS "content"',
          'products.type AS "type"',
          'products.status AS "status"',
          'ROUND(AVG(comment.start), 0) AS "totalStart"',
          'COUNT(comment.start) AS "commentCount"',
        ])
        .leftJoin('products.comment', 'comment')
        .leftJoin('products.spesc', 'spesc')
        .where('spesc.loudness = :Loudness', { Loudness }) // Điều kiện WHERE cho trường loudness
        .groupBy('products.id')
        .getRawMany();

      if (dataUser) {
        return res.status(200).json({ data: dataUser });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //================================================================================> GET products by Ammo_Weight
  async getProductByAmmoWeight(AmmoWeight: string, res: Response) {
    try {
      const dataUser = await this.productRepository
        .createQueryBuilder('products')
        .select([
          'products.id AS "id"',
          'products.imgSmall AS "imgSmall"',
          'products.imgBig AS "imgBig"',
          'products.nameProduct AS "nameProduct"',
          'products.price AS "price"',
          'products.color AS "color"',
          'products.goodsInStock AS "goodsInStock"',
          'products.content AS "content"',
          'products.type AS "type"',
          'products.status AS "status"',
          'ROUND(AVG(comment.start), 0) AS "totalStart"',
          'COUNT(comment.start) AS "commentCount"',
        ])
        .leftJoin('products.comment', 'comment')
        .leftJoin('products.spesc', 'spesc')
        .where('spesc.Ammo_Weight = :AmmoWeight', { AmmoWeight }) // Điều kiện WHERE cho trường Ammo_Weight
        .groupBy('products.id')
        .getRawMany();

      if (dataUser) {
        return res.status(200).json({ data: dataUser });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //================================================================================> GET products by caliber
  async getProductByCaliber(Caliber: string, res: Response) {
    try {
      const dataUser = await this.productRepository
        .createQueryBuilder('products')
        .select([
          'products.id AS "id"',
          'products.imgSmall AS "imgSmall"',
          'products.imgBig AS "imgBig"',
          'products.nameProduct AS "nameProduct"',
          'products.price AS "price"',
          'products.color AS "color"',
          'products.goodsInStock AS "goodsInStock"',
          'products.content AS "content"',
          'products.type AS "type"',
          'products.status AS "status"',
          'ROUND(AVG(comment.start), 0) AS "totalStart"',
          'COUNT(comment.start) AS "commentCount"',
        ])
        .leftJoin('products.comment', 'comment')
        .leftJoin('products.spesc', 'spesc')
        .where('spesc.caliber = :Caliber', { Caliber }) // Điều kiện WHERE cho trường caliber
        .groupBy('products.id')
        .getRawMany();

      if (dataUser) {
        return res.status(200).json({ data: dataUser });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //================================================================================> xóa số lượng trong kho
  async handleEditquantityProducts(
    quantity: number,
    id: number,
    res: Response,
  ) {
    try {
      const quantityStock = Number(quantity);
      const id1 = Number(id);
      const dataproduct = await this.productRepository.findOne({
        where: { id: id1 },
      });

      const Stockquantity = dataproduct?.goodsInStock;
      const newdata = Stockquantity - quantityStock;
      const dataUser = await this.productRepository.update({ id: id1 } as any, {
        goodsInStock: newdata,
      });

      if (dataUser) {
        res.status(200).json({ message: 'edit successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //===================================================================================> POST products
  async postProduct(body: ProductDTO, res: Response, req: Request) {
    try {
      // Tạo sản phẩm trong bảng Products
      const product = this.productRepository.create(body);
      const savedProduct = await this.productRepository.save(product);

      // Lấy id của sản phẩm vừa tạo
      const productId = savedProduct.id;

      // Tạo thông tin sản phẩm trong bảng Spescproducts
      const spescData = {
        product_id: productId,
        manufacturer: body.manufacturer,
        caliber: body.caliber,
        velocity: body.velocity,
        conditions: body.conditions,
        ammo_type: body.ammo_type,
        actions: body.actions,
        barrel_style: body.barrel_style,
        fire_mode: body.fire_mode,
        gun_weight: body.gun_weight,
        loudness: body.loudness,
        mechanism: body.mechanism,
        Ammo_Weight: body.Ammo_Weight,
        Pellet_Shape: body.Pellet_Shape,
        Pellet_Quantity: body.Pellet_Quantity,
      };

      const spescProduct = this.spescRepository.create(spescData);
      await this.spescRepository.save(spescProduct);

      res.status(200).json({ msg: 'Post Products Successfully' });
    } catch (error) {
      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //===================================================================================> edit sản phẩm admin
  async postProductById(
    id: string,
    body: ProductDTO,
    res: Response,
    req: Request,
  ) {
    try {
      // Lấy id của sản phẩm vừa tạo
      const productId = Number(id);

      // Tạo sản phẩm trong bảng Products
      const newproduct = {
        imgSmall: body.imgSmall,
        imgBig: body.imgBig,
        nameProduct: body.nameProduct,
        price: Number(body.price),
        color: body.color,
        goodsInStock: Number(body.goodsInStock),
        content: body.content,
        type: body.type,
      };

      // Tạo thông tin sản phẩm trong bảng Spescproducts
      const newspec = {
        manufacturer: body.manufacturer,
        caliber: Number(body.caliber),
        velocity: Number(body.velocity),
        conditions: body.conditions,
        ammo_type: body.ammo_type,
        actions: body.actions,
        barrel_style: body.barrel_style,
        fire_mode: body.fire_mode,
        gun_weight: Number(body.gun_weight),
        loudness: Number(body.loudness),
        mechanism: body.mechanism,
        Ammo_Weight: Number(body.Ammo_Weight),
        Pellet_Shape: body.Pellet_Shape,
        Pellet_Quantity: body.Pellet_Quantity,
      };

      await this.productRepository.update({ id: productId }, newproduct);
      await this.spescRepository.update({ product_id: productId }, newspec);

      res.status(200).json({ msg: 'Post Products Successfully' });
    } catch (error) {
      return res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //===================================================================================> edit sản phẩm admin
  async deleteProductById(id: string, res: Response, req: Request) {
    try {
      const id1 = Number(id);
      const dataUser = await this.productRepository.delete({ id: id1 });
      res.status(200).json({ msg: 'delete Products Successfully' });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ massge: 'server lỗi' });
    }
  }
}
