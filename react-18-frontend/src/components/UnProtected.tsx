import React from "react";
import { Link, To } from "react-router-dom";
import { useAppSelector } from "../store";

type UnProtectedLinkProps = {
  children: React.JSX.Element | string;
  to: To;
  className?: string;
};

const UnProtectedLink: React.FC<UnProtectedLinkProps> = ({ to, children, ...props }) => {
  const isAuthenticated = useAppSelector((state) => {
    return state.auth.isAuthenticated;
  });
  const userProfile = useAppSelector((state) => {
    return state.userProfile;
  });

  if (isAuthenticated && userProfile.user) {
    return null;
  }

  const { className } = props;

  return <Link className={className} to={to}>{children}</Link>;
};

export default UnProtectedLink;
