import { combineReducers } from "redux";

import orders from "./OrderSlice";
import ProductStock from "./Productmanaslice";
import UserSlice from "./UserSlice";

const rootReducer = combineReducers({
  Orders: orders,
  UserSlice: UserSlice,
  ProductStock: ProductStock,
});

export default rootReducer;
