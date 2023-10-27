import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

require('dotenv').config();
const PORT = process.env.APP_PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: (origin, callback) => {
        const allowedOrigins = [
          'http://localhost:3000',
          'http://localhost:8080',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức HTTP được cho phép
      credentials: true, // Cho phép gửi credentials (ví dụ: cookies)
    },
  });

  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}
bootstrap();
