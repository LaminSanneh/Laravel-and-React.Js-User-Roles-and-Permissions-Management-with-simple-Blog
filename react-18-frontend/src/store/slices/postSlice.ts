import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  makeCreatePostRequest,
  makeDeletePostRequest,
  makeFetchPostRequest,
  makeFetchPostsRequest,
  makeUpdatePostRequest,
} from "../../services/postService";

export const fetchPosts = createAsyncThunk<Post[], void>(
  "post/fetchPosts",
  async () => {
    try {
      return await makeFetchPostsRequest();
    } catch (error) {
      throw new Error("Failed to get posts data");
    }
  }
);

export const fetchPost = createAsyncThunk<Post, number>(
  "post/fetchPost",
  async (id) => {
    try {
      return await makeFetchPostRequest(id);
    } catch (error) {
      throw new Error("Failed to get single post data");
    }
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "post/deletePost",
  async (id) => {
    try {
      return await makeDeletePostRequest(id);
      return id;
    } catch (error) {
      throw new Error("Failed to delete single post data");
    }
  }
);

export const createPost = createAsyncThunk<Post, CreatePostData>(
  "post/createPost",
  async (postData) => {
    try {
      return await makeCreatePostRequest(postData);
    } catch (error) {
      throw new Error("Failed to get posts data");
    }
  }
);

export const updatePost = createAsyncThunk<Post, UpdatePostData>(
  "post/updatePost",
  async (updatePostData) => {
    try {
      return await makeUpdatePostRequest(updatePostData);
    } catch (error) {
      throw new Error("Failed to update posts");
    }
  }
);

interface PostBasic {
  title: string;
  body: string;
}

export interface CreatePostData extends PostBasic {}

export interface UpdatePostData extends PostBasic {
  id: number;
}

interface Post extends PostBasic {
  id: number;
  author: {
    name: string;
  };
  created_at: string;
  updated_at: string;
}

interface InitialState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faled to load posts";
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faled to create posts";
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faled to update posts";
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [
          ...state.posts.filter((post) => {
            return action.meta.arg !== post.id;
          }),
        ];
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faled to delete post";
      })
      .addDefaultCase(() => {});
  },
});

export default postSlice.reducer;
