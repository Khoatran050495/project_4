import { createSlice } from "@reduxjs/toolkit";

const RefeshtHeaderSlice = createSlice({
  name: "RefeshtHeaderSlice",
  initialState: true,
  reducers: {
    CartHeader: (state) => {
      return (state = !state);
    },
  },
});

const { actions, reducer } = RefeshtHeaderSlice;
export const { CartHeader } = actions;
export default reducer;
