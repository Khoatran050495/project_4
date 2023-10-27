import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './DB/Users.entity';
import { UserDTO } from './DTO/Users.DTO';

let refreshTokenArr: any[] = [];
require('dotenv').config();
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //============================================================================> đăng ký user
  async registerUser(body: UserDTO, res: Response) {
    try {
      const { username, passwords, email } = body;
      const userName = await this.userRepository.findOne({
        where: { email },
      });
      if (userName) {
        return res.status(400).json({ msg: 'Email already exists' });
      } else {
        // trường hợp ko tồn tại thì thực hiện
        const saltRounds = 10; //độ an toàn mã hóa password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(passwords, salt); //hàm băm password==> mã hóa password
        this.userRepository.create({
          ...body,
          passwords: hashedPassword,
        });
        const user = await this.userRepository.save({
          ...body,
          passwords: hashedPassword,
        });
        //insert dữ liệu,password = password đã mã hóa
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
          to: email, // Địa chỉ email nhận
          subject: 'Password recovery confirmation Code',
          text:
            `Hello ${username},\n\n` +
            'Congratulations! You have successfully registered at our website. ' +
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
        return res
          .status(200)
          .json({ msg: 'Register Successfully', user: user });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  //================================================================================================> đăng nhập

  async loginUser(body: UserDTO, res: Response) {
    const { email, passwords } = body;
    try {
      // Kiểm tra username và trả về toàn bộ data
      const user = await this.userRepository.findOne({
        where: { email },
      });

      // Nếu có user thì so sánh password bằng hàm compare
      if (user) {
        // Kiểm tra password nhập vào vs password query từ trong DB
        const myPass = await bcrypt.compare(passwords, user.passwords);

        // Thêm điều kiện nếu có thì mới thành công và trả dữ liệu
        if (myPass) {
          const accessToken = jwt.sign({ ...user }, process.env.DB_SCERETKEY, {
            expiresIn: '1d',
          }); // Token hết hạn trong vòng 30s , vd thêm : 30d ,30m

          const refreshToken = jwt.sign(
            { ...user },
            process.env.DB_SCERETKEYREFRESH,
            {
              expiresIn: '365d',
            },
          ); // Tạo refreshToken để dự trữ
          refreshTokenArr.push(refreshToken); // push refresh token vào 1 mảng để lưu trữ
          const { passwords, ...data } = user; //loại bỏ password ra khỏi phần data trả về frontend,destructuring
          res.cookie('refreshToken', refreshToken, {
            //Lưu refreshToken vào cookie khi đăng nhập thành công
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          });

          return res.status(200).json({
            data,
            accessToken,
          });
          // Sai pass thì trả lỗi sai password
        } else {
          return res.status(401).json({ msg: 'Password Wrong' });
        }
      } else {
        // Nếu sai thì báo lỗi
        return res.status(401).json({ msg: 'Username dont exist' });
      }
    } catch (error) {
      res.status(404).json({ msg: 'not found' });
    }
  }

  //================================================================================================> đăng xuất
  async logoutUser(res: Response, req: Request) {
    res.clearCookie('refreshToken');
    refreshTokenArr = refreshTokenArr.filter(
      (token) => token !== req.cookies.refreshToken,
    );
    return res.status(200).json('Logout successfully');
  }

  async getUserById(idUser: string, res: Response, req: Request) {
    try {
      const id = Number(idUser);
      const dataUser = await this.userRepository.findOne({ where: { id } });

      if (dataUser) {
        res.status(200).json({ message: 'edit successfully', dataUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'server error' });
    }
  }

  //================================================================================================> chỉnh sửa profile
  async ChangeProfileUser(
    idUser: string,
    body: UserDTO,
    res: Response,
    req: Request,
  ) {
    try {
      const id1 = Number(idUser);

      const newUser = {
        imgavatar: body.imgavatar,
        username: body.username,
        phoneNumber: Number(body.phoneNumber),
        birthday: body.birthday,
        address: body.address,
      };

      const dataUser = await this.userRepository.update({ id: id1 }, newUser);

      if (dataUser) {
        res.status(200).json({ message: 'edit successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: 'server error' });
    }
  }

  //================================================================================================> chỉnh sửa password
  async ChangePassworkUser(
    idUser: string,
    body: UserDTO,
    res: Response,
    req: Request,
  ) {
    try {
      const newdata = body;
      const passwords = newdata.passwords;
      const newpasswords = newdata.Newpassword;
      const id = Number(idUser);
      const dataUser = await this.userRepository.findOne({ where: { id } });
      const OldPassword = dataUser.passwords;

      // Kiểm tra password nhập vào vs password query từ trong DB
      const myPass = await bcrypt.compare(passwords, OldPassword);

      if (myPass) {
        const saltRounds = 10; //độ an toàn mã hóa password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(newpasswords, salt);
        //hàm băm password==> mã hóa password
        await this.userRepository.update(
          { id },
          {
            passwords: hashedPassword,
          },
        );
        res.status(200).json({ message: 'password successfully' });
      } else {
        res.status(404).json({ message: 'incorrect password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'server error' });
    }
  }

  //================================================================================================> chỉnh sửa password từ form login
  async ChangePassworkUserLoginFrom(body: UserDTO, res: Response) {
    try {
      const email = body.email;

      const dataUser = await this.userRepository.findOne({
        where: { email },
      });

      if (dataUser) {
        const dataemail = dataUser.email;
        const dataiduser = dataUser.id;
        // tạo code
        const generateVerificationCode = (length: number) => {
          const buffer = crypto.randomBytes(Math.ceil(length / 2));
          const code = buffer.toString('hex').slice(0, length);
          // Thêm thời hạn vào mã xác nhận (2 phút)
          const expiresInMinutes = 2;
          const expirationTime = Date.now() + expiresInMinutes * 60 * 1000;

          return { code, expirationTime };
        };

        const verificationCode = generateVerificationCode(6);
        const vercode = verificationCode.code;
        const vertime = new Date(verificationCode.expirationTime);
        const datacodeandtime = { code: vercode, expirationTime: vertime };

        await this.userRepository.update(
          {
            id: dataiduser,
          },
          datacodeandtime,
        );

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
          to: dataemail, // Địa chỉ email nhận
          subject: 'Password recovery confirmation Code',
          text:
            'This code is only valid for 2 minutes.Your confirmation code is: ' +
            vercode,
        };

        // Gửi email
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        res.status(200).json({ message: 'edit successfully', dataiduser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'server error' });
    }
  }

  //================================================================================================> xác nhận mã để thay password
  async ChangePassworkCode(body: UserDTO, res: Response) {
    try {
      const id = Number(body.id);
      const code = body.yourcode;
      const password = body.newpassword;

      const dataUser = await this.userRepository.findOne({ where: { id } });
      console.log(typeof Date.now());
      console.log(typeof dataUser?.expirationTime);
      if (Date.now() > Number(dataUser?.expirationTime)) {
        res.status(404).json({ message: 'Verification code has expired' });
      } else if (code !== dataUser?.code) {
        res.status(404).json({ message: 'Verification code is invalid' });
      } else {
        const saltRounds = 10; //độ an toàn mã hóa password
        const salt = await bcrypt.genSalt(saltRounds);
        //hàm băm password==> mã hóa password
        const hashedPassword = await bcrypt.hash(password, salt);
        await this.userRepository.update(
          { id },
          {
            passwords: hashedPassword,
          },
        );
        res.status(200).json({ message: 'changed password successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: 'server error' });
    }
  }

  //================================================================================================> RefreshToken
  async RefreshToken(res: Response, req: Request) {
    const refreshToken = req.cookies.refreshToken;
    console.log('REQ', req.cookies.refreshToken);

    if (!refreshToken) return res.status(401).json('Unauthenticated');
    if (!refreshTokenArr.includes(refreshToken)) {
      return res.status(401).json('Unauthenticated');
    }
    jwt.verify(
      refreshToken,
      process.env.DB_SCERETKEYREFRESH,
      (err: any, user: any) => {
        if (err) {
          return res.status(400).json('refreshToken is not valid');
        }
        const { iat, exp, ...userOther } = user;

        refreshTokenArr = refreshTokenArr.filter(
          (token: string) => token !== refreshToken,
        );
        const newAccessToken = jwt.sign(userOther, process.env.DB_SCERETKEY, {
          expiresIn: '1d',
        });
        const newRefreshToken = jwt.sign(
          userOther,
          process.env.DB_SCERETKEYREFRESH,
          { expiresIn: '365d' },
        );
        refreshTokenArr.push(newRefreshToken);
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
        return res.status(200).json(newAccessToken);
      },
    );
  }

  //================================================================================================> get toàn bộ user
  async getAllUser(res: Response, req: Request) {
    try {
      const dataUser = await this.userRepository.find({});
      res.status(200).json({ data: dataUser });
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //================================================================================================> active user
  async patchUser(res: Response, id: string, body: UserDTO) {
    try {
      const newdata = body;
      const id1 = Number(id);
      const dataUser = await this.userRepository.update({ id: id1 }, newdata);

      if (dataUser) {
        res.status(200).json({ message: 'edit successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ massge: 'server lỗi' });
    }
  }

  //================================================================================================> login with google
  async validateOAuth(profile: any) {
    const user = await this.userRepository.findOne({
      where: { email: profile.emails[0].value },
    });

    if (user) {
      if (user.typeLogin === 1) {
        throw new Error('The Email was registered');
      } else {
        const accessToken = jwt.sign({ ...user }, process.env.DB_SCERETKEY, {
          expiresIn: '1d',
        }); // Token hết hạn trong vòng 30s , vd thêm : 30d ,30m

        const refreshToken = jwt.sign(
          { ...user },
          process.env.DB_SCERETKEYREFRESH,
          {
            expiresIn: '365d',
          },
        ); // Tạo refreshToken để dự trữ
        refreshTokenArr.push(refreshToken); // push refresh token vào 1 mảng để lưu trữ
        const { passwords, ...data } = user; //loại bỏ password ra khỏi phần data trả về frontend,destructuring

        return { data: { ...data }, accessToken, refreshToken };
      }
    } else {
      const avatarUrl =
        profile.photos.length > 0 ? profile.photos[0].value : '';

      const newUser = {
        imgavatar: avatarUrl,
        username: profile.displayName.replace(/\s+/g, ''),
        email: profile.emails[0].value,
        passwords: 'xxxxxxx',
        phoneNumber: 123456789,
        birthday: new Date(),
        address: 'xxxxxxx',
        typeLogin: 2,
      };

      this.userRepository.create(newUser);
      const user = await this.userRepository.save(newUser);

      //tạo mới orders
      console.log(user);

      const accessToken = jwt.sign({ ...user }, process.env.DB_SCERETKEY, {
        expiresIn: '1d',
      }); // Token hết hạn trong vòng 30s , vd thêm : 30d ,30m

      const refreshToken = jwt.sign(
        { ...user },
        process.env.DB_SCERETKEYREFRESH,
        {
          expiresIn: '365d',
        },
      ); // Tạo refreshToken để dự trữ
      refreshTokenArr.push(refreshToken); // push refresh token vào 1 mảng để lưu trữ
      const { passwords, ...data } = user; //loại bỏ password ra khỏi phần data trả về frontend,destructuring

      return { data, accessToken, refreshToken };
    }
  }
}
