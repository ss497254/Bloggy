import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteGuard = ({ children }) => {
  const Navigate = useNavigate();
  const authenticated = useSelector((state) => state.auth.authenticated);
  useEffect(() => {
    if (!authenticated) {
      Navigate("/sign-in");
    }
  }, []);

  return children;
};

export default RouteGuard;
