import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { logout } from "../slices/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await api.post(
        "/admin/auth/logout",
        {},
        { withCredentials: true }
      );

      dispatch(logout()); 
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return logOut;
};

export default useLogout;
