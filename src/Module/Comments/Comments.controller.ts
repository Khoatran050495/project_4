import { Response } from 'express';

import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { CommentService } from './Comments.service';
import { CommentDTO } from './DTO/Comments.DTO';

@Controller('api/v1/comment')
export class CommentController {
  constructor(public CommentService: CommentService) {}

  //================================================================================================> post sao
  @Post('/poststar/:idproduct/:iduser')
  async postStar(
    @Param('idproduct') idproduct: number,
    @Param('iduser') iduser: number,
    @Body() body: CommentDTO,
    @Res() res: Response,
  ) {
    return this.CommentService.postStar(idproduct, iduser, body, res);
  }

  //================================================================================================> post comment
  @Post('/postcomment/:idproduct/:iduser')
  async postComment(
    @Param('idproduct') idproduct: number,
    @Param('iduser') iduser: number,
    @Body() body: CommentDTO,
    @Res() res: Response,
  ) {
    return this.CommentService.postComment(idproduct, iduser, body, res);
  }

  //================================================================================================> get comments
  @Get('/getcomment/:idproduct')
  async getComment(
    @Param('idproduct') idproduct: number,
    @Res() res: Response,
  ) {
    return this.CommentService.getComment(idproduct, res);
  }

  //================================================================================================> get sao
  @Get('/getstart/:idproduct/:iduser')
  async getStar(
    @Param('idproduct') idproduct: number,
    @Param('iduser') iduser: number,
    @Res() res: Response,
  ) {
    return this.CommentService.getStar(idproduct, iduser, res);
  }
}
