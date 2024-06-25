import axios from "axios";
import authHeader from "./authHeader";
import { CreatePostData, UpdatePostData } from "../store/slices/postSlice";

const envVariables = import.meta.env;

export const makeDeletePostRequest = async (id: number) => {
  try {
    const headers = { headers: authHeader.getAuthHeader() };
    return (
      await axios.delete(`${envVariables.VITE_BACKEND_URL}/posts/${id}`, headers)
    ).data;
  } catch (error) {
    throw new Error("Failed to delete post: service");
  }
};

export const makeFetchPostRequest = async (id: number) => {
  try {
    const headers = { headers: authHeader.getAuthHeader() };
    return (
      await axios.get(`${envVariables.VITE_BACKEND_URL}/posts/${id}`, headers)
    ).data;
  } catch (error) {
    throw new Error("Failed to fetch single post: service");
  }
};

export const makeFetchPostsRequest = async () => {
  try {
    const headers = { headers: authHeader.getAuthHeader() };
    return (
      await axios.get(`${envVariables.VITE_BACKEND_URL}/posts`, headers)
    ).data;
  } catch (error) {
    throw new Error("Failed to fetch posts: service");
  }
};

export const makeCreatePostRequest = async (postData: CreatePostData) => {
  try {
    const headers = { headers: authHeader.getAuthHeader() };
    return (
      await axios.post(`${envVariables.VITE_BACKEND_URL}/posts`, postData, headers)
    ).data;
  } catch (error) {
    throw new Error("Failed to create post: service");
  }
};

export const makeUpdatePostRequest = async (updatePostData: UpdatePostData) => {
  try {
    const headers = { headers: authHeader.getAuthHeader() };
    return (
      await axios.put(`${envVariables.VITE_BACKEND_URL}/posts`, updatePostData, headers)
    ).data;
  } catch (error) {
    throw new Error("Failed to update post: service");
  }
};
