import { combineReducers } from "redux";

import Avatarupdate from "./AvatarSlice";
import cartSlice from "./CartSlice";
import ChangeprofileSlice from "./ChangeprofileSlice";
import HeaderSlice from "./HeaderSlice";
import RefeshtHeaderSlice from "./RefeshtHeaderSlice";
import SidebarSlice from "./SidebarSlice";
import totalprice from "./totalprice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  HeaderSlice: HeaderSlice,
  cartSlice: cartSlice,
  CartHeader: RefeshtHeaderSlice,
  SidebarSlice: SidebarSlice,
  ChangeprofileSlice: ChangeprofileSlice,
  totalprice: totalprice,
  Avatarupdate: Avatarupdate,
});

export default rootReducer;
