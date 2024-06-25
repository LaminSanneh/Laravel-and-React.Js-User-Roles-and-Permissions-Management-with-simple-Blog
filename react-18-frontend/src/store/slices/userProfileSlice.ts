import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeGetUserRequest, makeUpdatetUserProfileRequest } from "../../services/userProfileService";
import { Role } from "./userSlice";

interface User {
  id: number;
  name: string;
  phone: string;
  address: string;
  roles: Role[]
}

export interface UpdateUserData {
  name: string;
  phone: string;
  address: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk<User, void>(
  "userProfile/getUser",
  async () => {
    return await makeGetUserRequest();
  }
);

export const updateUserProfile = createAsyncThunk<User, UpdateUserData>(
  "userProfile/updateUser",
  async (userData) => {
    return await makeUpdatetUserProfileRequest(userData);
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get user data";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      });
  },
});

export default userProfileSlice.reducer;
