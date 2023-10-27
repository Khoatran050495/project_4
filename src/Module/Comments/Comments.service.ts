import { Response } from 'express';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from './DB/Comments.entity';
import { CommentDTO } from './DTO/Comments.DTO';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  //================================================================================================> post sao
  async postStar(
    idproduct: number,
    iduser: number,
    body: CommentDTO,
    res: Response,
  ) {
    const data = {
      Users_id: Number(iduser),
      Product_id: Number(idproduct),
      start: Number(body.star),
    };

    try {
      const findComment = await this.commentRepository.findOne({
        where: { Users_id: iduser, Product_id: idproduct },
      });

      if (findComment) {
        await this.commentRepository.update(
          { Users_id: iduser, Product_id: idproduct },
          data,
        );
      } else {
        this.commentRepository.create(data);
        await this.commentRepository.save(data);
      }
      res.status(200).json({ msg: 'Post star Successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Post star Error' });
    }
  }

  //================================================================================================> post comment
  async postComment(
    idproduct: number,
    iduser: number,
    body: CommentDTO,
    res: Response,
  ) {
    const data = {
      Users_id: Number(iduser),
      Product_id: Number(idproduct),
      comment: body.comment,
    };

    try {
      const findComment = await this.commentRepository.findOne({
        where: { Users_id: iduser, Product_id: idproduct },
      });

      if (findComment) {
        await this.commentRepository.update(
          { Users_id: iduser, Product_id: idproduct },
          data,
        );
      } else {
        this.commentRepository.create(data);
        await this.commentRepository.save(data);
      }
      res.status(200).json({ msg: 'Post comment Successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Post comment Error' });
    }
  }

  //================================================================================================> get comment
  async getComment(idproduct: number, res: Response) {
    try {
      const findComment = await this.commentRepository.find({
        where: { Product_id: idproduct },
        order: {
          updatedAt: 'ASC',
        },
        relations: ['user'],
      });

      res.status(200).json({ msg: 'Post comment Successfully', findComment });
    } catch (error) {
      res.status(500).json({ msg: 'Post comment Error' });
    }
  }

  //================================================================================================> get sao
  async getStar(idproduct: number, iduser: number, res: Response) {
    try {
      const findstart = await this.commentRepository.findOne({
        where: { Users_id: iduser, Product_id: idproduct },
      });

      res.status(200).json({ msg: 'get star Successfully', findstart });
    } catch (error) {
      res.status(500).json({ msg: 'Post comment Error' });
    }
  }
}
