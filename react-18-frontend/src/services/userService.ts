import axios from "axios";
import authHeader from "./authHeader";
import { CreateUserData, UpdateUserData } from "../store/slices/userSlice";

const envVariables = import.meta.env;

export const makeFetchUsersRequest = async () => {
    try {
      const headers = { headers: authHeader.getAuthHeader() };
      return (
        await axios.get(`${envVariables.VITE_BACKEND_URL}/users`, headers)
      ).data;
    } catch (error) {
      throw new Error("Failed to delete post: service");
    }
  };

  export const makeFetchUserRequest = async (id: number) => {
    try {
      const headers = { headers: authHeader.getAuthHeader() };
      return (
        await axios.get(`${envVariables.VITE_BACKEND_URL}/users/${id}`, headers)
      ).data;
    } catch (error) {
      throw new Error("Failed to delete post: service");
    }
  };

  export const makeDeleteUserRequest = async (id: number) => {
    try {
      const headers = { headers: authHeader.getAuthHeader() };
      return (
        await axios.delete(`${envVariables.VITE_BACKEND_URL}/users/${id}`, headers)
      ).data;
    } catch (error) {
      throw new Error("Failed to delete post: service");
    }
  };

  export const makeCreateUserRequest = async (userData: CreateUserData) => {
    try {
      const headers = { headers: authHeader.getAuthHeader() };
      return (
        await await axios.post("${envVariables.VITE_BACKEND_URL}/users", userData, headers)
      ).data;
    } catch (error) {
      throw new Error("Failed to delete post: service");
    }
  };

  export const makeUpdateUserRequest = async (userData: UpdateUserData) => {
    try {
      const headers = { headers: authHeader.getAuthHeader() };
      return (
        await axios.put(`${envVariables.VITE_BACKEND_URL}/users/${userData.id}`, userData, headers)
      ).data;
    } catch (error) {
      throw new Error("Failed to delete post: service");
    }
  };
