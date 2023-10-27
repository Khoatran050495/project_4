import { Response } from 'express';
import * as nodemailer from 'nodemailer';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../Users/DB/Users.entity';
import { History } from './DB/History.entity';
import { HistoryDTO } from './DTO/History.DTO';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //================================================================================================> post history
  async postHistory(body: HistoryDTO[], res: Response) {
    try {
      // Lưu dữ liệu vào bảng "History"
      this.historyRepository.create(body);
      await this.historyRepository.save(body);
      const totalprice = body
        .reduce((pre: any, urr: any) => pre + urr.Total_Price, 0)
        .toFixed(2);

      const data = body[0];

      const user = await this.userRepository.findOne({
        where: { id: data.Users_id },
      });

      const emailuser = user?.email;
      const username = user?.username;

      // Tạo một transporter với các thông tin SMTP của bạn
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Chọn dịch vụ email của bạn (ví dụ: Gmail)
        auth: {
          user: 'trandangkhoa5495@gmail.com', // Địa chỉ email gửi
          pass: 'tyczwhncprqbsgck', // Mật khẩu email gửi
        },
      });
      // Thông tin email
      const mailOptions = {
        from: 'trandangkhoa5495@gmail.com', // Địa chỉ email gửi
        to: emailuser, // Địa chỉ email nhận
        subject: 'Password recovery confirmation Code',
        text:
          `Dear ${username},\n\n` +
          `Thank you for your purchase with the value of your order is ${totalprice},\n` +
          'Thank you very much for choosing us, and we look forward to serving you.\n\n' +
          'Best regards,\n' +
          'Your Website Team',
      };
      // Gửi email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      // Trả về kết quả thành công và dữ liệu đã được lưu
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  //================================================================================================> get history
  async getHistory(id: string, res: Response) {
    try {
      const Users_id = Number(id);
      const dataHistory = await this.historyRepository.find({
        where: { Users_id },
        order: {
          createdAt: 'DESC',
        },
        relations: ['user', 'product'],
      });
      if (dataHistory) {
        res.status(200).json({ data: dataHistory });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  //================================================================================================> get all history
  async getAllHistory(res: Response) {
    try {
      const dataHistory = await this.historyRepository.find({
        order: { Status_history: 'ASC', createdAt: 'DESC' },
        relations: ['user', 'product'],
      });
      if (dataHistory) {
        res.status(200).json({ data: dataHistory });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  //================================================================================================> approve history
  async handleapprove(id: string, res: Response) {
    try {
      const History_id = Number(id);
      const dataHistory = await this.historyRepository.find({
        where: { History_id },
      });
      if (dataHistory) {
        const [findata] = dataHistory;
        const newdata = (findata.Status_history = 2);
        await this.historyRepository.update(
          { History_id },
          { Status_history: newdata },
        );
        res.status(200).json({ data: dataHistory });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  //================================================================================================> get history with mount
  async gethistorywithmonth(res: Response) {
    try {
      const dataHistory = await this.historyRepository
        .createQueryBuilder()
        .select('DATE_FORMAT(history.createdAt, "%Y-%m")  AS month')
        .addSelect('SUM(history.Total_Price)  AS totalRevenue')
        .groupBy('month')
        .orderBy('month')
        .getRawMany();

      if (dataHistory) {
        res.status(200).json({ data: dataHistory });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
