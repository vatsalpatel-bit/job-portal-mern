import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/shared/Navbar";
import { getProfileApi } from "@/services/authApi";
import { setUser } from "@/redux/slices/authslice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // hydrate redux from cookie
    if (!user) {
      getProfileApi()
        .then((res) => {
          dispatch(setUser(res.data.user));
        })
        .catch(() => {
          // not logged in → ignore
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
