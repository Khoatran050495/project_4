export interface ILogin {
  email: string;
  passwords: string;
}

export interface IUserManagement {
  id: number;
  index: number;
  username: string;
  email: string;
  phoneNumber: number;
  address: string;
  birthday: string;
  status: number;
}

export interface IProductManagement {
  id: number;
  index: number;
  imgSmall: string;
  nameProduct: string;
  price: string;
  type: string;
  goodsInStock: number;
}
export interface IProductForm {
  nameProduct: string;
  price: string;
  type: string;
  goodsInStock: string;
  color: string;
  content: string;
  spesc_manufacturer: string;
  spesc_caliber: string;
  spesc_velocity: string;
  spesc_conditions: string;
  spesc_ammo_type: string;
  spesc_actions: string;
  spesc_barrel_style: string;
  spesc_fire_mode: string;
  spesc_gun_weight: string;
  spesc_loudness: string;
  spesc_mechanism: string;
  spesc_Ammo_Weight: string;
  spesc_Pellet_Shape: string;
  spesc_Pellet_Quantity: string;
}

export interface IOdermanagers {
  History_id: number;
  Quantity: number;
  Total_Price: number;
  Status_history: number;
  createdAt: string;
  user: {
    username: string;
    phoneNumber: string;
    address: string;
  };
  product: {
    nameProduct: string;
    color: string;
  };
}

export interface IRevenuemanagers {
  History_id: number;
  Quantity: number;
  Total_Price: number;
  createdAt: string;
  User: {
    username: string;
    phoneNumber: string;
    address: string;
  };
  Product: {
    nameProduct: string;
  };
  status: number;
}

export interface TotalOrders {
  CartItem_id: number;
  History_id: number;
  Orders_id: number;
  Payment: string;
  Product_id: number;
  Quantity: number;
  Status_history: number;
  Total_Price: string;
  Users_id: number;
  createdAt: string;
  product: {
    type: string;
  };
}

export interface TotalOrderrevenue {
  month: number;
  totalRevenue: number;
}

export interface IProduct {
  goodsInStock: number;
}

// Định nghĩa kiểu dữ liệu cho một đơn hàng
export interface IOrder {
  Status_history: number;
}
