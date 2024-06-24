import axios from "axios";
import { LoginUserData, RegisterUserData } from "../store/slices/authReducer";
import authHeader from "./authHeader";

export const USER_TOKEN_KEY = "USER_TOKEN_KEY";

export const makeLoginUserRequest = async (credentials: LoginUserData) => {
  try {
    const token = (await axios.post(`http://localhost:8000/api/login`, credentials))
    .data

    authHeader.initializeToken(token);

    localStorage.setItem(USER_TOKEN_KEY, token);

    return token;
  } catch (error) {
    throw new Error("Failed to login user: service");
  }
};

export const makeLogoutUserRequest = async () => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    await axios.post(`http://localhost:8000/api/logout`, null, headers);

    authHeader.clearToken();

    localStorage.removeItem(USER_TOKEN_KEY);
  } catch (error) {
    throw new Error("Failed to loglogoutin user: service");
  }
};

export const makeRegisterUserRequest = async (credentials: RegisterUserData) => {
  try {
    return (await axios.post(`http://localhost:8000/api/register`, credentials))
      .data;
  } catch (error) {
    throw new Error("Failed to register user: service");
  }
};
