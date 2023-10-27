import { Response } from 'express';

import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';

import { HistoryDTO } from './DTO/History.DTO';
import { HistoryService } from './History.service';

@Controller('api/v1/history')
export class HistoryController {
  constructor(public HistoryService: HistoryService) {}

  //================================================================================================> post history
  @Post('/posthistory')
  async postHistory(@Body() body: HistoryDTO[], @Res() res: Response) {
    return await this.HistoryService.postHistory(body, res);
  }

  //================================================================================================> get history
  @Get('/posthistory/:id')
  async getHistory(@Param('id') id: string, @Res() res: Response) {
    return await this.HistoryService.getHistory(id, res);
  }

  //================================================================================================> get all history
  @Get('/getallhistory')
  async getAllHistory(@Res() res: Response) {
    return await this.HistoryService.getAllHistory(res);
  }

  //================================================================================================> approve history
  @Patch('/poststatushistory/:id')
  async handleapprove(@Param('id') id: string, @Res() res: Response) {
    return await this.HistoryService.handleapprove(id, res);
  }

  //================================================================================================> get history with mount
  @Get('/gethistorywithmonth')
  async gethistorywithmonth(@Res() res: Response) {
    return await this.HistoryService.gethistorywithmonth(res);
  }
}
