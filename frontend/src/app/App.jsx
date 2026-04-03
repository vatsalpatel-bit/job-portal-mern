import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import Jobs from "@/pages/Jobs";
import Browse from "@/pages/Browse";
import ProfilePage from "@/pages/ProfilePage";
import DetailPage from "@/pages/DetailPage";
import companySetup from "@/pages/admin/companySetup";

// ✅ Admin pages
import Companies from "@/pages/admin/Companies";

// ✅ Protected Route
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CompanyCreate from "@/pages/admin/CompanyCreate";
import CompanySetUp from "@/pages/admin/companySetup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "jobs", element: <Jobs /> },
      { path: "browse", element: <Browse /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "job/:id", element: <DetailPage /> },

      
      {
        path: "admin/companies",
        element: (
          <Companies />
        ),
      },
      {
        path: "admin/company/create",
        element: (
          <CompanyCreate />
        )
      },
      {
        path: "admin/companies/:id",
        element: (
          <CompanySetUp />)
      }
    ],
  },

  // 🔓 Public routes
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;