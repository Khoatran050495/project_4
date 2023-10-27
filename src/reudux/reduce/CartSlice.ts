import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "sidebar",
  initialState: true,
  reducers: {
    CartItem: (state) => {
      return (state = !state);
    },
  },
});

const { actions, reducer } = CartSlice;
export const { CartItem } = actions;
export default reducer;
