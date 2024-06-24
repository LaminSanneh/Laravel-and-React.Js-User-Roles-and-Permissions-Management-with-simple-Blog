import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

type ProtectedRouteProps = {
  children: React.JSX.Element;
  requiredRoles: number[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const userRoles = useAppSelector((state) => state.userProfile.user?.roles);
  const isAuthenticated = useAppSelector((state) => {
    return state.auth.isAuthenticated;
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles.length === 0 && userRoles) {
    return children;
  }

  const userRoleIds = userRoles?.map((userRole) => userRole.id);
  const hasRequiredRole =
    userRoleIds &&
    requiredRoles.some((role) => {
      return userRoleIds.includes(role);
    });

  if (!hasRequiredRole) {
    return <div>You do not have permission to view this page.</div>;
  }

  return children;
};

export default ProtectedRoute;
