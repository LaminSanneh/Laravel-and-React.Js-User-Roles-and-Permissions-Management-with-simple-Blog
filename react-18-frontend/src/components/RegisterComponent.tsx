import React, { useState } from "react";
import "./RegisterComponent.css";
import { registerUser } from "../store/slices/authReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const naivgate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        naivgate("/login");
      })
      .catch((response) => {
        alert(`Error occured ${response.message}`);
      });
  };

  const onPropertyChage = (
    callback: typeof setName | typeof setEmail | typeof setPassword
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
      callback(event.target.value);
    };
  };

  return (
    <div>
      <h2 className="text-3xl mb-4 text-left pl-8 pt-4">Register</h2>
      <form onSubmit={handleSubmit} className="register-form pl-8 pr-8 pt-4 w-100">
          <input className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full" onChange={onPropertyChage(setName)} type="text" placeholder="name" id="name" />
          <input className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full" onChange={onPropertyChage(setEmail)} type="text" placeholder="email" id="email" />
          <input className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full" onChange={onPropertyChage(setPassword)} type="password" placeholder="password" id="password" />
          <button className="mb-4 bg-green-500 text-white">Register</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
