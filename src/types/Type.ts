import { JwtPayload } from "jwt-decode";

export interface ILogin {
  // username: string;
  passwords: string;
  email: string;
}

export interface IGetform {
  username: string;
  email: string;
  passwords: string;
  phoneNumber: string;
  birthday: string;
  address: string;
}

export interface ICartItem {
  Quantity: number;
  Product_id: number;
  product: {
    imgSmall: string;
    nameProduct: string;
    price: number;
  };
}

export interface ICartproduct {
  index: number;
  imgSmall: string;
  nameProduct: string;
  price: string;
  goodsInStock: number;
  id: number;
}

export interface ICartProductProps {
  products: ICartproduct[];
}

export interface IHistory {
  index: number;
  Quantity: number;
  createdAt: string;
  Total_Price: number;
  Payment: number;
  Status_history: number;
  product: {
    nameProduct: string;
    price: number;
  };
}

export interface DecodedToken extends JwtPayload {
  exp: number;
}

export interface IDataUser {
  email: string;
  username: string;
  phoneNumber: string;
  birthday: string;
  address: string;
}

export interface IDataPassword {
  passwords: string;
  Newpassword: string;
  RepeatNewPassword: string;
}
