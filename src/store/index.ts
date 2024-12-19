import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export interface RootState {
  auth: AuthState;
}

export default store;
