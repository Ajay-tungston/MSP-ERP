import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import { MutatingDots } from "react-loader-spinner";
import useRefreshTocken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshTocken();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log("Refresh token failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [accessToken, refresh]);

  return isLoading ? (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      loading...
      {/* <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#ff871f"
        secondaryColor="#fa8c2d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
      /> */}
    </div>
  ) : (
    <Outlet />
  );
};

export default PersistLogin;
