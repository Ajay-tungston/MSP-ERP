import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../api/api";
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {
  const auth = useSelector((state) => state.auth);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        console.log("no token");
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const accessToken = await refresh();
          if (!accessToken) return Promise.reject(error);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.accessToken, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
