import { createSlice } from "@reduxjs/toolkit";

const HeaderSlice = createSlice({
  name: "HeaderSlice",
  initialState: {
    status: true,
    data: "",
  },
  reducers: {
    changeStatus: (state, action) => {
      state.status = !state.status;
      state.data = action.payload;
    },
  },
});

const { actions, reducer } = HeaderSlice;
export const { changeStatus } = actions;
export default reducer;
