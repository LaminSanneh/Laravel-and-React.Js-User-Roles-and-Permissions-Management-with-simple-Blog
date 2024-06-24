import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeLoginUserRequest, makeLogoutUserRequest, makeRegisterUserRequest } from "../../services/authService";
import authHeader from "../../services/authHeader";

export interface LoginUserData {
  email: string;
  password: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: null,
  isAuthenticated: authHeader.getToken() !== '',
};

export const loginUser = createAsyncThunk<string, LoginUserData>(
  "auth/loginUser",
  async (credentials) => {
    return await makeLoginUserRequest(credentials);
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  "auth/logoutUser",
  async () => {
    return await makeLogoutUserRequest();
  }
);

export const registerUser = createAsyncThunk<void, RegisterUserData>(
  "auth/registerUser",
  async (credentials) => {
    return await makeRegisterUserRequest(credentials);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login user";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to register user";
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to logout user";
      })
      .addDefaultCase(() => {});
  },
});

export default authSlice.reducer;
