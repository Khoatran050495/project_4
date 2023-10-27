import { Response } from 'express';
import { multerUpload } from 'src/Config/Multer.config';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { ProductDTO } from './DTO/Product.DTO';
import { ProductService } from './Product.service';

@Controller('/api/v1/products')
export class ProductController {
  constructor(public ProductService: ProductService) {}

  //============================================================================> POST all products
  @Post('/postallproducts')
  async postAllProduct(@Body() body: ProductDTO[]) {
    return await this.ProductService.postAllProduct(body);
  }

  //============================================================================> GET all products
  @Get('/getallproducts')
  async getAllProduct(@Res() res: Response) {
    return await this.ProductService.getAllProduct(res);
  }

  //============================================================================> GET products by id
  @Get('/getproducts/:id')
  async getProduct(@Param('id') id: number, @Res() res: Response) {
    return await this.ProductService.getProduct(id, res);
  }

  //============================================================================>GET products theo type
  @Get('/getproductstype/:type')
  async getProductByType(@Param('type') type: string, @Res() res: Response) {
    return await this.ProductService.getProductByType(type, res);
  }

  //============================================================================>GET products theo price
  @Get('/getproductvalue/:type/:price')
  async getProductByPrice(
    @Param('type') type: string,
    @Param('price') price: string,
    @Res() res: Response,
  ) {
    return await this.ProductService.getProductByPrice(type, price, res);
  }

  //============================================================================>GET products theo velocity
  @Get('/getproductvelocity/:velocity')
  async getProductByVelocity(
    @Param('velocity') velocity: string,
    @Res() res: Response,
  ) {
    return await this.ProductService.getProductByVelocity(velocity, res);
  }

  //============================================================================>GET products theo loundness
  @Get('/getproductloudness/:Loudness')
  async getProductByLoudness(
    @Param('Loudness') Loudness: string,
    @Res() res: Response,
  ) {
    return await this.ProductService.getProductByLoudness(Loudness, res);
  }

  //============================================================================>GET products theo AmmoWeight
  @Get('/getproductAmmoWeight/:AmmoWeight')
  async getProductByAmmoWeight(
    @Param('AmmoWeight') AmmoWeight: string,
    @Res() res: Response,
  ) {
    return await this.ProductService.getProductByAmmoWeight(AmmoWeight, res);
  }

  //============================================================================>GET products theo Caliber
  @Get('/getproductCaliber/:Caliber')
  async getProductByCaliber(
    @Param('Caliber') Caliber: string,
    @Res() res: Response,
  ) {
    return await this.ProductService.getProductByCaliber(Caliber, res);
  }

  //============================================================================> giảm số lượng trong kho
  @Patch('/editquantityproducts/:quantity/:id')
  async handleEditquantityProducts(
    @Param('quantity') quantity: number,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    return await this.ProductService.handleEditquantityProducts(
      quantity,
      id,
      res,
    );
  }

  //============================================================================> POST products
  @Post('/addproducts')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imgBig', maxCount: 1 },
        { name: 'imgSmall', maxCount: 1 },
      ],
      multerUpload,
    ),
  )
  async postProduct(
    @UploadedFiles()
    files: { imgBig?: Express.Multer.File[]; imgSmall?: Express.Multer.File[] },
    @Body() body: ProductDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    if (files.imgBig && files.imgSmall) {
      body.imgBig = files.imgBig[0].path;
      body.imgSmall = files.imgSmall[0].path;
    }
    return await this.ProductService.postProduct(body, res, req);
  }

  //============================================================================> edit sản phẩm admin
  @Patch('/editproductsadmin/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imgBig', maxCount: 1 },
        { name: 'imgSmall', maxCount: 1 },
      ],
      multerUpload,
    ),
  )
  async postProductById(
    @UploadedFiles()
    files: { imgBig?: Express.Multer.File[]; imgSmall?: Express.Multer.File[] },
    @Param('id') id: string,
    @Body() body: ProductDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    if (files.imgBig && files.imgSmall) {
      body.imgBig = files.imgBig[0].path;
      body.imgSmall = files.imgSmall[0].path;
    }
    return await this.ProductService.postProductById(id, body, res, req);
  }

  //============================================================================> xóa sản phẩm
  @Delete('/deleteproducts/:id')
  async deleteProductById(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return await this.ProductService.deleteProductById(id, res, req);
  }
}
