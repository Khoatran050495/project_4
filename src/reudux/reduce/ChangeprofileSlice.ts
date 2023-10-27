import { createSlice } from "@reduxjs/toolkit";

const ChangeprofileSlice = createSlice({
  name: "ChangeprofileSlice",
  initialState: {
    status: true,
    data: "",
  },
  reducers: {
    changeStatus1: (state, action) => {
      state.status = !state.status;
      state.data = action.payload;
    },
  },
});

const { actions, reducer } = ChangeprofileSlice;
export const { changeStatus1 } = actions;
export default reducer;
