import { combineReducers } from "redux";
import postSlice from "./slices/postSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import userSlice from "./slices/userSlice";
import authReducer from "./slices/authReducer";
import userProfileSlice from "./slices/userProfileSlice";
import globalMessageMiddleware from "../middleware/globalMessageMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postSlice,
  user: userSlice,
  userProfile: userProfileSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: ((getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(globalMessageMiddleware)
  // })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
