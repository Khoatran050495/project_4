import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
  name: "SidebarSlice",
  initialState: { status: true, data: "" },
  reducers: {
    changeStatus: (state, action) => {
      state.status = !state.status;
      state.data = action.payload;
    },
  },
});

const { actions, reducer } = SidebarSlice;
export const { changeStatus } = actions;
export default reducer;
