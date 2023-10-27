import { Response } from 'express';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../Orders/DB/Orders.entity';
import { CartItem } from './DB/Carditem.entity';

@Injectable()
export class CardItemService {
  constructor(
    @InjectRepository(CartItem)
    private carditemRepository: Repository<CartItem>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  //================================================================================================> POST sản phẩm và cộng sản phẩm
  async postcarditem(idproduct: string, idUser: string, res: Response) {
    try {
      let Product_id: number = Number(idproduct);
      // tìm Order id
      const result = await this.ordersRepository.find({
        where: { Users_id: idUser },
      } as any);
      const [Order] = result;
      const { Orders_id } = Order;

      // tìm CartItem
      const fineCartItem = await this.carditemRepository.find({
        where: {
          Product_id: Product_id,
          Orders_id: Orders_id,
        },
      });

      if (fineCartItem.length > 0) {
        const [fineCart] = fineCartItem;
        const newdata = fineCart.Quantity + 1;
        await this.carditemRepository.update({ Product_id, Orders_id } as any, {
          Quantity: newdata,
        });
        return res.status(200).json({ msg: 'Post Products Successfully' });
      } else if (fineCartItem.length === 0) {
        const newdata = {
          Quantity: 1,
          Product_id: Product_id,
          Orders_id: Orders_id,
        };

        this.carditemRepository.create(newdata);
        await this.carditemRepository.save(newdata);

        return res.status(200).json({ msg: 'Post Products Successfully' });
      } else {
        return res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: 'server error' });
    }
  }

  //================================================================================================> trừ sản phẩm
  async postCarditemMinus(idproduct: string, idUser: string, res: Response) {
    try {
      let Product_id: number = Number(idproduct);

      // tìm Order id
      const result = await this.ordersRepository.find({
        where: { Users_id: idUser },
      } as any);
      const [Order] = result;
      const { Orders_id } = Order;

      // tìm CartItem
      const fineCartItem = await this.carditemRepository.find({
        where: {
          Product_id: Product_id,
          Orders_id: Orders_id,
        },
      });

      const [fineCart] = fineCartItem;
      const quantity = fineCart.Quantity;
      if (quantity > 1) {
        const newdata = fineCart.Quantity - 1;
        await this.carditemRepository.update({ Product_id, Orders_id } as any, {
          Quantity: newdata,
        });
        return res.status(200).json({ msg: 'Minus Products Successfully' });
      } else {
        await this.carditemRepository.delete({ Product_id, Orders_id });
        res.status(200).json({ msg: 'Product Removed from Cart' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'server error' });
    }
  }

  //================================================================================================> xóa sản phẩm
  async postCarditemDelete(idproduct: string, idUser: string, res: Response) {
    try {
      let Product_id: number = Number(idproduct);

      // tìm Order id
      const result = await this.ordersRepository.find({
        where: { Users_id: idUser },
      } as any);
      const [Order] = result;
      const { Orders_id } = Order;

      await this.carditemRepository.delete({ Product_id, Orders_id });
      res.status(200).json({ msg: 'Product Removed from Cart' });
    } catch (error) {
      return res.status(500).json({ message: 'server error' });
    }
  }

  //================================================================================================> xóa hết sản phẩm khi thanh toán xong
  async postCarditemDeleteAll(idUser: string, res: Response) {
    try {
      let Users_id: number = Number(idUser);

      // tìm Order id
      const result = await this.ordersRepository.find({
        where: { Users_id },
      } as any);
      const [Order] = result;
      const { Orders_id } = Order;

      await this.carditemRepository.delete({ Orders_id });
      res.status(200).json({ msg: 'Product Removed from Cart' });
    } catch (error) {
      return res.status(500).json({ message: 'server error' });
    }
  }
}
