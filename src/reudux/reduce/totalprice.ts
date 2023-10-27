import { createSlice } from "@reduxjs/toolkit";

const ChangeprofileSlice = createSlice({
  name: "totalprice",
  initialState: {
    data: "",
  },
  reducers: {
    paypaltotalprice: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { actions, reducer } = ChangeprofileSlice;
export const { paypaltotalprice } = actions;
export default reducer;
