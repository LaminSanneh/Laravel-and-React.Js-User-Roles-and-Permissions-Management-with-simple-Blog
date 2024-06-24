import React, { useEffect, useState } from "react";
import "./UserProfileComponent.css";
import { useAppDispatch, useAppSelector } from "../store";
import { getUser, updateUserProfile } from "../store/slices/userProfileSlice";

const UserProfileComponent = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const userProfile = useAppSelector((state) => {
    return state.userProfile;
  });

  useEffect(() => {
    debugger;

    dispatch(getUser())
      .unwrap()
      .then(() => {
        debugger;
        setName(userProfile.user?.name || '');
        setPhone(userProfile.user?.phone || '');
        setAddress(userProfile.user?.address || '');
        console.log("Done");
      })
      .catch((response) => {
        alert(`Error occured ${response.message}`);
      });

  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUserProfile({ name, phone, address }))
      .unwrap()
      .then(() => {
        console.log("Updated successfuly");
      })
      .catch((response) => {
        alert(`Error occured ${response.message}`);
      });
  };

  const onPropertyChage = (
    callback: typeof setName | typeof setPhone | typeof setAddress
  ) => {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
      callback(event.target.value);
    };
  };

  if (userProfile.loading) {
    return <div>...Loading</div>
  }

  return (
    <div>
      <h2 className="text-3xl mb-4 text-left pl-8 pt-4">Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="update-profile-form pl-8 pr-8 pt-4 w-100"
      >
        <input
          className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full"
          value={name}
          onChange={onPropertyChage(setName)}
          type="text"
          placeholder="name"
          id="name"
        />
        <input
          className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full"
          value={phone}
          onChange={onPropertyChage(setPhone)}
          type="text"
          placeholder="phone"
          id="phone"
        />
        <textarea
          className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full"
          value={address}
          onChange={onPropertyChage(setAddress)}
          id="address"
          placeholder="address"
        ></textarea>
        <button className="mb-4 bg-green-500 text-white">Update Profie</button>
      </form>
    </div>
  );
};

export default UserProfileComponent;
