import axios from "axios";
import { UpdateUserData } from "../store/slices/userProfileSlice";
import authHeader from "./authHeader";

const envVariables = import.meta.env;

export const makeGetUserRequest = async () => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    return (await axios.get(`${envVariables.VITE_BACKEND_URL}/getUserData`, headers)).data;
  } catch (error) {
    throw new Error("Failed to get user data");
  }
};

export const makeUpdatetUserProfileRequest = async (userData: UpdateUserData) => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    return (
      await axios.post(
        `${envVariables.VITE_BACKEND_URL}/updateUserProfile`,
        userData,
        headers
      )
    ).data;
  } catch (error) {
    throw new Error("Failed to register user");
  }
};
