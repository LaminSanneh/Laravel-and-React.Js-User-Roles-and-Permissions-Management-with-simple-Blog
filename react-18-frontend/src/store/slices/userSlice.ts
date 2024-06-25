import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  makeCreateUserRequest,
  makeDeleteUserRequest,
  makeFetchUserRequest,
  makeFetchUsersRequest,
  makeUpdateUserRequest,
} from "../../services/userService";

export const fetchUsers = createAsyncThunk<User[], void>(
  "user/fetchUsers",
  async () => {
    try {
      return makeFetchUsersRequest();
    } catch (error) {
      throw new Error("Failed to get users data");
    }
  }
);

export const fetchUser = createAsyncThunk<User, number>(
  "user/fetchUser",
  async (id) => {
    try {
      return makeFetchUserRequest(id);
    } catch (error) {
      throw new Error("Failed to get single user data");
    }
  }
);

export const deleteUser = createAsyncThunk<number, number>(
  "user/deleteUser",
  async (id) => {
    try {
      return makeDeleteUserRequest(id);
      return id;
    } catch (error) {
      throw new Error("Failed to delete single user data");
    }
  }
);

export const createUser = createAsyncThunk<User, CreateUserData>(
  "user/createUser",
  async (userData) => {
    try {
      return makeCreateUserRequest(userData);
    } catch (error) {
      throw new Error("Failed to get users data");
    }
  }
);

export const updateUser = createAsyncThunk<User, UpdateUserData>(
  "user/updateUser",
  async (userData) => {
    try {
      return makeUpdateUserRequest(userData);
    } catch (error) {
      throw new Error("Failed to update users");
    }
  }
);

interface UserBasic {
  name: string;
}

export interface CreateUserData extends UserBasic {
  email: string;
}

// e.g. format
// {
//   1: true,
//   4: false
// }
interface UpdateUserDataRole {
  [index: number]: boolean;
}

export interface UpdateUserData extends UserBasic {
  id: number;
  phone?: string;
  address?: string;
  active?: boolean;
  roles: UpdateUserDataRole;
}

export interface Role {
  id: number;
  name: string;
}

interface User extends UserBasic {
  id: number;
  email: string;
  active: boolean;
  phone: string;
  address: string;
  roles: Role[];
  created_at: string;
  updated_at: string;
}

interface InitialState {
  users: User[];
  loading: boolean;
  error: string | null;
  // statusMessage: string | null;
}

const initialState: InitialState = {
  users: [],
  loading: false,
  error: null,
  // statusMessage: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faled to load users";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faled to create users";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, action.payload];
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faled to update users";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [
          ...state.users.filter((user) => {
            return action.meta.arg !== user.id;
          }),
        ];
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faled to delete user";
      })
      .addDefaultCase(() => {});
  },
});

export default userSlice.reducer;
