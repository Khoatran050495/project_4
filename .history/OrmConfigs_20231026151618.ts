import { CartItem } from 'src/Module/CardItem/DB/Carditem.entity';
import { Comment } from 'src/Module/Comments/DB/Comments.entity';
import { History } from 'src/Module/History/DB/History.entity';
import { Order } from 'src/Module/Orders/DB/Orders.entity';
import { Product } from 'src/Module/Products/DB/Products.entity';
import { Spesc } from 'src/Module/Specs/DB/Specs.entity';
import { User } from 'src/Module/Users/DB/Users.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

require('dotenv').config();
export const config1: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nest',
  entities: [Product, Spesc, User, Order, History, Comment, CartItem],
  synchronize: true,
};
