import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import measurementReducer from "./slices/measurementSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    measurement: measurementReducer,
  },
});

export default store;
