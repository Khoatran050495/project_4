import { Response } from 'express';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from './DB/Orders.entity';
import { OrderDTO } from './DTO/Orders.DTO';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  //================================================================================> POST tạo Orders
  async postorders(body: OrderDTO, res: Response) {
    try {
      this.orderRepository.create(body);
      await this.orderRepository.save(body);
      return res.status(200).json({ msg: 'Post Products Successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'server lỗi' });
    }
  }

  //================================================================================> GET Orders
  async getorders(idUser: number, res: Response) {
    try {
      // const Users_id: number = Number(idUser);
      const dataOrder = await this.orderRepository.find({
        where: { Users_id: idUser },
        relations: ['user', 'carditem.product'],
      });
      if (dataOrder) {
        return res.status(200).json({ data: dataOrder });
      } else {
        return res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'server lỗi' });
    }
  }
}
