import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reduce";

const store = configureStore({ reducer: rootReducer });

export default store;
