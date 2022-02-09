import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const Navigate = useNavigate();
  const isLoggedin = localStorage.getItem("token");
  useEffect(() => {
    if (!isLoggedin) {
      Navigate("/sign-in");
    }
  }, []);

  return children;
};

export default RouteGuard;
