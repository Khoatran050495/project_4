import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { PostOrdersAPI } from "../../api/OrdersClient";
import { UserAPI } from "../../api/User";
import { ILogin } from "../../types/Type";

export const register = createAsyncThunk(
  "register/fecthauthAPI",
  async (payload: any) => {
    try {
      const response = await UserAPI.register(payload);
      const userId = response?.data?.user?.id;
      const orderValue = {
        Users_id: userId,
      };
      await PostOrdersAPI.PostOrders(orderValue);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: ILogin) => {
    try {
      const response = await UserAPI.login(userData);
      localStorage.setItem("userLogin", JSON.stringify(response.data.data));
      localStorage.setItem("accessToken", response.data.accessToken);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: "",
    token: "",
    isLoggedIn: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled as any]: (state, action) => {
      // console.log(action.payload);
      state.data = action.payload?.data?.data;
      state.token = action.payload?.data?.accessToken;
      state.isLoggedIn = true;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
