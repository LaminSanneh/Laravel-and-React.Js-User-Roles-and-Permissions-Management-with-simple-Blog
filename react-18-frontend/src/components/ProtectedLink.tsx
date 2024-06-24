import React from "react";
import { Link, To } from "react-router-dom";
import { useAppSelector } from "../store";

type ProtectedLink = {
  children: React.JSX.Element | string;
  requiredRoles: number[];
  to: To;
  className?: string;
};

const ProtectedLink: React.FC<ProtectedLink> = ({ to, requiredRoles, children, ...props }) => {
  const userRoles = useAppSelector((state) => state.userProfile.user?.roles);
  const isAuthenticated = useAppSelector((state) => {
    return state.auth.isAuthenticated;
  });
//   const { user } = useSelector((state) => state.user);

  //   const hasRequiredPermission = requiredRoles.every((perm) => user.permissions.includes(perm));

  //   if (!hasRequiredPermission) {
  //     return null;
  //   }
  if (!isAuthenticated) {
    return null;
  }

  const { className } = props;

  const userRoleIds = userRoles?.map((userRole) => userRole.id);
  const hasRequiredRole =
    userRoleIds &&
    requiredRoles.some((role) => {
      return userRoleIds.includes(role);
    });

  if (!hasRequiredRole) {
    return null;
  }

  return <Link className={className} to={to}>{children}</Link>;
};

export default ProtectedLink;
