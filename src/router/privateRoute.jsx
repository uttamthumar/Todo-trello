import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("@token");
  const navigate = useNavigate();
  const router = useLocation();
  const { children } = props;
  const isLoggedIn = localStorage.getItem("@token") ? true : false;

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.clear();
        navigate("/");
      } else {
        if (router.pathname === "/dashboard") {
          navigate("/dashboard");
        }
      }
    }
  }, [token]);

  return isLoggedIn ? <>{children}</> : <Navigate replace={true} to="/" />;
};

export default PrivateRoute;
