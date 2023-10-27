import { Request, Response } from 'express';
import { multerUpload } from 'src/Config/Multer.config';

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { UserDTO } from './DTO/Users.DTO';
import { UserService } from './Users.service';

@Controller('api/v1/user')
export class UserController {
  constructor(public UserService: UserService) {}

  //================================================================================================> đăng ký
  @Post('/register')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'imageAvartar', maxCount: 1 }],
      multerUpload,
    ),
  )
  async registerUser(
    @UploadedFiles() files: { imageAvartar?: Express.Multer.File[] },
    @Res() res: Response,
    @Body() body: UserDTO,
  ) {
    if (files.imageAvartar) {
      body.imgavatar = files.imageAvartar[0].path;
    }
    return await this.UserService.registerUser(body, res);
  }

  //============================================================================================> đăng nhập
  @Post('/login')
  async loginUser(@Body() body: any, @Res() res: Response) {
    return await this.UserService.loginUser(body, res);
  }

  //============================================================================================> login với google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle() {}
  @Get('/oauth-google')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const { data, accessToken, refreshToken } = req.user;
    res.cookie('refreshToken', refreshToken, {
      //Lưu refreshToken vào cookie khi đăng nhập thành công
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.redirect(
      `http://localhost:3000/auth/Login?token=${accessToken}`,
    );
  }

  //============================================================================================> đăng xuất
  @Post('/logout')
  async logoutUser(@Res() res: Response, @Req() req: Request) {
    return await this.UserService.logoutUser(res, req);
  }

  //============================================================================================> GET user by id
  @Get('/getusebyid/:idUser')
  async getUserById(
    @Param('idUser') idUser: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return await this.UserService.getUserById(idUser, res, req);
  }

  //============================================================================================> PATCH sửa thông tin Profile
  @Patch('/patchuserformprofile/:idUser')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'imageAvartar', maxCount: 1 }],
      multerUpload,
    ),
  )
  async ChangeProfileUser(
    @UploadedFiles() files: { imageAvartar?: Express.Multer.File[] },
    @Param('idUser') idUser: string,
    @Body() body: UserDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    if (files.imageAvartar) {
      body.imgavatar = files.imageAvartar[0].path;
    }
    return await this.UserService.ChangeProfileUser(idUser, body, res, req);
  }

  //============================================================================================> PATCH đổi password
  @Patch('/patchuserpassword/:idUser')
  async ChangePassworkUser(
    @Param('idUser') idUser: string,
    @Body() body: UserDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return await this.UserService.ChangePassworkUser(idUser, body, res, req);
  }

  //============================================================================================> POST đổi password từ form login
  @Post('/postuserforgot')
  async ChangePassworkUserLoginFrom(
    @Body() body: UserDTO,
    @Res() res: Response,
  ) {
    return await this.UserService.ChangePassworkUserLoginFrom(body, res);
  }

  //============================================================================================> POST mã xác nhận để đổi password
  @Post('/postsubmituserforgot')
  async ChangePassworkCode(@Body() body: UserDTO, @Res() res: Response) {
    return await this.UserService.ChangePassworkCode(body, res);
  }

  //============================================================================================> refectoken
  @Post('/refreshtoken')
  async RefreshToken(@Res() res: Response, @Req() req: Request) {
    return await this.UserService.RefreshToken(res, req);
  }

  //============================================================================================> get toàn bộ user
  @Get('/getalluser')
  async getAllUser(@Res() res: Response, @Req() req: Request) {
    return await this.UserService.getAllUser(res, req);
  }

  //============================================================================================> active user
  @Patch('/patchuser/:id')
  async patchUser(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UserDTO,
  ) {
    return await this.UserService.patchUser(res, id, body);
  }
}
