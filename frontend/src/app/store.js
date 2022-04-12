import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/auth-slice";

export const store = configureStore({
  reducer: {
    authSlice,
  },
});
