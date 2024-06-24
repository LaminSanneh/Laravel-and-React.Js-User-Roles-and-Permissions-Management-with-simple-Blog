import React from "react";
import { logoutUser } from "../store/slices/authReducer";
import { useAppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAcceptLogout = () => {
    dispatch(logoutUser())
      .unwrap().then(() => {
        navigate("/login");
      })
      .catch((response) => {
        alert(`Error occured ${response.message}`);
      });
  };

  const handleCancelLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Logout</h2>
      <h2>Are you sure you want to logout?</h2>
      <button onClick={handleAcceptLogout}>Yes</button>
      <> </>
      <button onClick={handleCancelLogout}>No</button>
    </div>
  );
};

export default LogoutComponent;
