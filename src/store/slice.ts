import { createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { UserSignUp } from "../components/auth/sign-up";
import { Response } from "./response";
import { toast } from "react-toastify";

export interface AuthState {
  loading: boolean;
  dialogAuthState: boolean;
  dialogOtherState: boolean;
}
export interface User {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  status: string;
}

const initialState: AuthState = {
  loading: false,
  dialogAuthState: false,
  dialogOtherState: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onDialogAuthState(state) {
      state.dialogAuthState = true;
    },
    closeDialogAuthState(state) {
      state.dialogAuthState = false;
      state.dialogOtherState = false;
    },
    onDialogOtherState(state) {
      state.dialogAuthState = !state.dialogAuthState;
      state.dialogOtherState = !state.dialogOtherState;
    },
    actionRequest(state) {
      state.loading = true;
    },
    actionSuccess(state) {
      state.loading = false;
    },
    actionFailure(state) {
      state.loading = false;
    },
  },
});

export const SignUp = (formData: UserSignUp) => {
  return async (
    dispatch: (arg0: {
      payload: undefined;
      type: "auth/actionRequest" | "auth/actionSuccess" | "auth/actionFailure";
    }) => void
  ) => {
    try {
      dispatch(slice.actions.actionRequest());
      const response: AxiosResponse<Response<User>> = await axios.post(
        "/auth/register",
        formData
      );
      console.log(response);

      if (response) {
        dispatch(slice.actions.actionSuccess());
        toast.success("Sign up successfully");
      }
    } catch (error: any) {
      dispatch(slice.actions.actionFailure());
      toast.error(error.response.data.message);
    }
  };
};

export const { onDialogAuthState, closeDialogAuthState, onDialogOtherState } =
  slice.actions;
export default slice.reducer;
