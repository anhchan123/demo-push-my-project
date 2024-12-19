import React, { ReactNode, useMemo } from "react";
import { Navigate } from "react-router-dom";

interface ProtectRouteProps {
  children: ReactNode;
}

interface UserInfo {
  email: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const user_role = localStorage.getItem("role");
  console.log("user_role", user_role);
  if (user_role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
