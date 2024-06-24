import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import { createUser } from "../store/slices/userSlice";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUserComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmitCreateUserForm = () => {};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const route = useParams();
  const loading = useAppSelector((state) => state.user.loading);

  console.log(route);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEditUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(createUser({ name, email }))
      .unwrap()
      .then(() => {
        // toast.success("New user added successfully", {
        //   position: "top-right",
        // });
        navigate("/users");
      })
      .catch((response) => {
        // toast.error("Error adding user", {
        //   position: "top-right",
        // });
        console.log(`Error creating user: ${response.message}`);
      });
  };

  const cancleAddUser = () => {
    navigate("/users");
  };

  if (loading) {
    return <h2 className="text-3xl">...Loading</h2>;
  }

  return (
    <div>
      <h2 className="text-3xl mb-4 text-left pl-8 pt-4">Add User</h2>
      <form
        onSubmit={handleEditUserSubmit}
        action=""
        className="pl-8 pr-8 pt-4 w-100"
      >
        <input
          placeholder="title"
          name="title"
          className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full"
          type="text"
          value={name}
          onChange={onNameChange}
        />
        <input
          placeholder="email"
          name="email"
          className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full"
          type="text"
          value={email}
          onChange={onEmailChange}
        />
        <p>Users default password will be: "password"</p>
        <div className="flex gap-4 mb-4 justify-between">
          <a
            className="p-4 hover:cursor-pointer rounded-lg bg-red-500 text-white"
            onClick={cancleAddUser}
          >
            Cancel
          </a>
          <button
            className="bg-green-500 text-white"
            onClick={() => handleSubmitCreateUserForm()}
          >
            Create
          </button>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddUserComponent;
