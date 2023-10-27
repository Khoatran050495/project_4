import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "avatar",
  initialState: true,
  reducers: {
    Avatarupdate: (state) => {
      return (state = !state);
    },
  },
});

const { actions, reducer } = CartSlice;
export const { Avatarupdate } = actions;
export default reducer;
