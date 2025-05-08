import { useDispatch } from "react-redux";
import { setAccessToken } from "../slices/authSlice";
import { api } from "../api/api";
import useLogout from "./useLogout";

const useRefreshTocken = () => {
  const dispatch = useDispatch();
  const logOut = useLogout();
  const refresh = async () => {
    try {
      const response = await api.post(
        "admin/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(
        setAccessToken({
          accessToken: response.data.accessToken,
        })
      );
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      await logOut();
      return null;
    }
  };
  return refresh;
};

export default useRefreshTocken;
