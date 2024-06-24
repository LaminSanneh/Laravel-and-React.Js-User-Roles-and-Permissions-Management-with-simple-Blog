import axios from "axios";
import { UpdateUserData as UpdateUserProfileData } from "../store/slices/userProfileSlice";
import authHeader from "./authHeader";

export const makeGetUserRequest = async () => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    return (await axios.get(`http://localhost:8000/api/getUserData`, headers)).data;
  } catch (error) {
    throw new Error("Failed to get user data");
  }
};

export const makeUpdatetUserProfileRequest = async (userData: UpdateUserProfileData) => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    return (
      await axios.post(
        `http://localhost:8000/api/updateUserProfile`,
        userData,
        headers
      )
    ).data;
  } catch (error) {
    throw new Error("Failed to register user");
  }
};
