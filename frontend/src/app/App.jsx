import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/student/Home";
import Signup from "@/authentication/Signup";
import Login from "@/authentication/Login";
import Jobs from "@/pages/student/Jobs";
import Browse from "@/pages/student/Browse";
import ProfilePage from "@/pages/student/ProfilePage";
import DetailPage from "@/components/student/jobs/DetailPage";
import Companies from "@/pages/recruiter/Companies";

// Protected Route
import CompanyCreate from "@/components/recruiter/companies/CompanyCreate";
import CompanySetUp from "@/components/recruiter/companies/CompanySetup";
import CompanyEdit from "@/components/recruiter/companies/CompanyEdit";
import CompanyDetialPage from "@/components/recruiter/companies/CompanyDetialPage";
import CompanyJobsPage from "@/pages/recruiter/CompanyJobsPage";
import AdminJobCreate from "@/components/recruiter/jobs/AdminJobCreate";
import JobEditPage from "@/components/recruiter/jobs/JobEditPage";
import JobViewPage from "@/components/recruiter/jobs/JobViewPage";
import JobApplicantPage from "@/pages/recruiter/JobApplicantPage";
import ApplicantDetailPage from "@/components/recruiter/applicant/ApplicantDetailPage";
import AdminProfilePage from "@/pages/recruiter/AdminProfilePage";
import AdminProfileEditPage from "@/components/recruiter/profile/AdminProfileEditPage";
import NotFound from "@/components/shared/NotFound";
import AboutUsPage from "@/components/shared/AboutUsPage";
import HelpCenterPage from "@/components/shared/HelpCenterPage";
import PrivacyPolicyPage from "@/components/shared/PrivacyPolicyPage";
import TermAndConditionPage from "@/components/shared/TermAndConditionPage";
import SecurityPage from "@/components/shared/SecurityPage";
import ForgotPasswordPage from "@/authentication/ForgotPasswordPage";
import ResetPasswordPage from "@/authentication/ResetPasswordPage";
import StudentProtectedRoute from "@/protected routes/StudentProtectedRoute";
import RecruiterProtectedRoute from "@/protected routes/RecruiterProtectedRoute";
import GuestProtectedRoute from "@/protected routes/GuestProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [

      {
        index: true, element: (<>
          <GuestProtectedRoute><Home /></GuestProtectedRoute></>)
      },
      {
        path: "jobs",
        element: (
          <><GuestProtectedRoute>  < Jobs /></GuestProtectedRoute></>)
      },
      {
        path: "browse",
        element: (
          <>
            <GuestProtectedRoute>
              <Browse />
            </GuestProtectedRoute>
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