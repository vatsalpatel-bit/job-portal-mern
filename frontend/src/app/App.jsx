import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import Jobs from "@/pages/Jobs";
import Browse from "@/pages/Browse";
import ProfilePage from "@/pages/ProfilePage";
import DetailPage from "@/pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 🔥 LAYOUT
    children: [
      { index: true, element: <Home /> },
      { path: "jobs", element: <Jobs /> },
      { path: "browse", element: <Browse /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "description/:jobId", element: <DetailPage /> },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
