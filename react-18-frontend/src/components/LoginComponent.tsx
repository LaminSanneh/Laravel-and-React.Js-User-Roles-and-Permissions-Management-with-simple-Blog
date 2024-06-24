import React, { useState } from "react";
import "./LoginComponent.css";
import { useAppDispatch } from "../store";
import { loginUser } from "../store/slices/authReducer";
import { useNavigate } from "react-router-dom";
import { getUser } from "../store/slices/userProfileSlice";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const naivgate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser({email: username, password})).unwrap().then(() => {
      dispatch(getUser()).unwrap().then(() => {
        naivgate("/profile");
      });
    }).catch((response) => {
        alert(`Error occured ${response.message}`);
    });
  };

  const onPropertyChage = (callback: typeof setUsername | typeof setPassword) => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
        callback(event.target.value);
    }
  }

  return (
    <div>
      <h2 className="text-3xl mb-4 text-left pl-8 pt-4">Login</h2>
      <form onSubmit={handleSubmit} className="pl-8 pr-8 pt-4 w-100">
          <input className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full" onChange={onPropertyChage(setUsername)} type="text" placeholder="username" id="username" />
          <input className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full" onChange={onPropertyChage(setPassword)} type="password" placeholder="password" id="password" />
        <button className="mb-4 bg-green-500 text-white">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
