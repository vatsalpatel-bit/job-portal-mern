import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import Jobs from "@/pages/Jobs";
import Browse from "@/pages/Browse";
import ProfilePage from "@/pages/ProfilePage";
import DetailPage from "@/pages/DetailPage";
import Companies from "@/pages/admin/Companies";

// Protected Route
import CompanyCreate from "@/pages/admin/CompanyCreate";
import CompanySetUp from "@/pages/admin/companySetup";
import CompanyEdit from "@/pages/admin/CompanyEdit";
import CompanyDetialPage from "@/pages/admin/CompanyDetialPage";
import CompanyJobsPage from "@/pages/admin/CompanyJobsPage";
import AdminJobCreate from "@/pages/admin/AdminJobCreate";
import JobEditPage from "@/pages/admin/JobEditPage";
import JobViewPage from "@/pages/admin/JobViewPage";
import JobApplicantPage from "@/pages/admin/JobApplicantPage";
import ApplicantDetailPage from "@/pages/admin/ApplicantDetailPage";
import AdminProfilePage from "@/pages/admin/AdminProfilePage";
import AdminProfileEditPage from "@/pages/admin/AdminProfileEditPage";
import NotFound from "@/pages/NotFound";
import AboutUsPage from "@/components/shared/AboutUsPage";
import HelpCenterPage from "@/components/shared/HelpCenterPage";
import PrivacyPolicyPage from "@/components/shared/PrivacyPolicyPage";
import TermAndConditionPage from "@/components/shared/TermAndConditionPage";
import SecurityPage from "@/components/shared/SecurityPage";
import ForgotPasswordPage from "@/components/shared/ForgotPasswordPage";
import ResetPasswordPage from "@/components/shared/ResetPasswordPage";
import StudentProtectedRoute from "@/components/auth/StudentProtectedRoute";
import RecruiterProtectedRoute from "@/components/auth/RecruiterProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [

      { index: true, element: <Home /> },
      {
        path: "jobs",
        element: (
          <Jobs />
        )
      },
      {
        path: "browse",
        element: (
          <>
            <StudentProtectedRoute>
              <Browse />
            </StudentProtectedRoute>
          </>)
      },
      {
        path: "profile",
        element: (
          <>
            <StudentProtectedRoute>
              <ProfilePage />
            </StudentProtectedRoute>
          </>
        )
      },
      {
        path: "job/:id",
        element: (<>
          <StudentProtectedRoute>
            <DetailPage />
          </StudentProtectedRoute>
        </>
        )
      },
      {
        path: "admin/companies",
        element: (<>
          <RecruiterProtectedRoute>
            <Companies />
          </RecruiterProtectedRoute>
        </>
        ),
      },
      {
        path: "admin/company/create",
        element: (
          <>
            <RecruiterProtectedRoute>
              <CompanyCreate />
            </RecruiterProtectedRoute>
          </>

        )
      },
      {
        path: "admin/companies/:id",
        element: (
          <>
            <RecruiterProtectedRoute>
              <CompanySetUp />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/admin/company/:id/edit",
        element: (
          <>
            <RecruiterProtectedRoute>
              <CompanyEdit />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/admin/company/:id",
        element: (
          <>
            <RecruiterProtectedRoute>
              <CompanyDetialPage />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/admin/jobs",
        element: (
          <>
            <RecruiterProtectedRoute>
              <CompanyJobsPage />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/admin/job/create",
        element: (
          <>
            <RecruiterProtectedRoute>
              <AdminJobCreate />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/admin/job/:id/edit",
        element: (
          <>
            <RecruiterProtectedRoute>
              <JobEditPage />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/admin/job/:id/view",
        element: (
          <>
            <RecruiterProtectedRoute>
              <JobViewPage />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/admin/job/:id/applicant",
        element: (
          <>
            <RecruiterProtectedRoute>
              <JobApplicantPage />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/applicant/:applicantId/:jobId/profile",
        element: (
          <>
            <RecruiterProtectedRoute>
              <ApplicantDetailPage />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/admin/profile",
        element: (
          <>
            <RecruiterProtectedRoute>
              <AdminProfilePage />
            </RecruiterProtectedRoute>
          </>
        )
      },
      {
        path: "/admin/profile/edit",
        element: (
          <>
            <RecruiterProtectedRoute>
              <AdminProfileEditPage />
            </RecruiterProtectedRoute>
          </>
        )
      },
    ],
  },

  // Public routes
  {
    path: "/signup",
    element: (
      <Signup />)
  },
  {
    path: "/login",
    element: (
      <Login />)
  },
  {
    path: "*",
    element: (
      <NotFound />
    )
  },
  {
    path: "/about us",
    element: (
      <AboutUsPage />
    )
  },
  {
    path: "/help center",
    element: (
      <HelpCenterPage />
    )
  },
  {
    path: "/privacy policy",
    element: (
      <PrivacyPolicyPage />
    )
  },
  {
    path: "/term & condition",
    element: (
      <TermAndConditionPage />
    )
  },
  {
    path: "/security",
    element: (
      <SecurityPage />
    )
  },
  {
    path: "/forgot-password",
    element: (
      <ForgotPasswordPage />
    )
  },
  {
    path: "/reset-password/:token",
    element: (
      <ResetPasswordPage />
    )
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;