import { Response } from 'express';

import { Controller, Delete, Param, Post, Res } from '@nestjs/common';

import { CardItemService } from './Carditem.service';

@Controller('/api/v1/carditem')
export class CardItemController {
  constructor(public CardItemService: CardItemService) {}

  //================================================================================================> POST sản phẩm vào card và cộng sản phẩm
  @Post('/postcarditem/:idproduct/:idUser')
  async postcarditem(
    @Param('idproduct') idproduct: string,
    @Param('idUser') idUser: string,
    @Res() res: Response,
  ) {
    return await this.CardItemService.postcarditem(idproduct, idUser, res);
  }

  //================================================================================================> trừ sản phẩm
  @Post('/minuscarditem/:idproduct/:idUser')
  async postCarditemMinus(
    @Param('idproduct') idproduct: string,
    @Param('idUser') idUser: string,
    @Res() res: Response,
  ) {
    return await this.CardItemService.postCarditemMinus(idproduct, idUser, res);
  }

  //================================================================================================> xóa sản phẩm
  @Delete('/deletecarditem/:idproduct/:idUser')
  async postCarditemDelete(
    @Param('idproduct') idproduct: string,
    @Param('idUser') idUser: string,
    @Res() res: Response,
  ) {
    return await this.CardItemService.postCarditemDelete(
      idproduct,
      idUser,
      res,
    );
  }

  //================================================================================================> xóa hết sản phẩm khi thanh toán xong
  @Delete('/deletecarditemall/:idUser')
  async postCarditemDeleteAll(
    @Param('idUser') idUser: string,
    @Res() res: Response,
  ) {
    return await this.CardItemService.postCarditemDeleteAll(idUser, res);
  }
}
