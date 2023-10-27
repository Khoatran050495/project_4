import { Response } from 'express';

import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { OrderDTO } from './DTO/Orders.DTO';
import { OrderService } from './Orders.service';

@Controller('/api/v1/orders')
export class OrderController {
  constructor(public OrdersService: OrderService) {}

  //================================================================================================> POST order
  @Post('/postorders')
  async postorders(@Body() body: OrderDTO, @Res() res: Response) {
    return await this.OrdersService.postorders(body, res);
  }

  //================================================================================================> GET order
  @Get('/getorders/:idUser')
  async getorders(@Param('idUser') idUser: number, @Res() res: Response) {
    return await this.OrdersService.getorders(idUser, res);
  }
}
