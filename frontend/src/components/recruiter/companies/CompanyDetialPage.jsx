import Footer from '@/components/shared/Footer';
import { setSingleCompany } from '@/redux/slices/companiesSlice';
import { deleteCompanyApi,getCompanyStatus } from '@/services/companyApi';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const CompanyDetialPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: companyId } = useParams();
  const [loading, setLoading] = useState(true);
  const company = useSelector((state) => state.company.singleCompany)

  useEffect(() => {
    const fetchCompnayStatusApi = async () => {
      try {
        setLoading(true);
        const data = await getCompanyStatus(companyId);
        dispatch(setSingleCompany(data.companyStatus));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    }
    fetchCompnayStatusApi();
  }, [companyId, dispatch]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete company and all related jobs/applications?"
    );

    if (confirmDelete) {
      try {
        setLoading(true);
        const data = await deleteCompanyApi(company._id);
        toast.success(data?.message || "Company deleted successfully");
        navigate(-1);
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message)
      } finally {
        setLoading(false)
      }

    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">

        <div className="flex flex-col items-center gap-3">

          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-gray-500">
            Loading applicants...
          </p>

        </div>

      </div>
    );
  }
  return (
   <>
  <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative pt-20">

    {/* Background Blur */}
    <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

    <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

    <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">

      {/* Header */}
      <div
        className="
        flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-4
        mb-10
        "
      >

        {/* Back */}
       <button
                       onClick={() => navigate("/admin/companies")}
                       className="
                   inline-flex items-center gap-2
                   rounded-full
                   bg-white/80
                   backdrop-blur-md
                   border border-white/60
                   px-5 py-2
                   text-sm font-medium text-gray-700
                   shadow-sm
                   hover:bg-white
                   transition-all duration-300
                   mb-5
                   "
                     >
                       <ArrowLeft size={16} />
                       Back
                     </button>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate(`/admin/company/${company._id}/edit`)}
            className="
            h-11 px-5
            rounded-2xl
            bg-white
            hover:bg-gray-100
            text-sm font-medium text-gray-700
            shadow-sm
            transition-all duration-300
            "
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="
            h-11 px-5
            rounded-2xl
            bg-red-500
            hover:bg-red-600
            text-sm font-medium text-white
            shadow-sm
            transition-all duration-300
            "
          >
            Delete
          </button>

        </div>

      </div>

      {/* Main Card */}
      <div
        className="
        rounded-[36px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        p-8 sm:p-10 lg:p-12
        "
      >

        {/* TOP SECTION */}
        <div
          className="
          flex flex-col xl:flex-row
          xl:items-start xl:justify-between
          gap-10
          "
        >

          {/* LEFT */}
          <div className="flex items-start gap-6 flex-1 min-w-0">

            {/* Logo */}
            {company?.logo ? (

              <img
                src={company.logo}
                alt="logo"
                className="
                w-24 h-24
                rounded-[28px]
                object-cover
                border border-[#edf2ff]
                shadow-sm
                shrink-0
                "
              />

            ) : (

              <div
                className="
                w-24 h-24
                rounded-[28px]
                bg-[#eef4ff]
                flex items-center justify-center
                text-3xl font-bold text-blue-700
                shrink-0
                "
              >
                {company?.name?.[0]}
              </div>

            )}

            {/* Info */}
            <div className="flex-1 min-w-0 pt-1">

              {/* Badge */}
              <div
                className="
                inline-flex items-center
                rounded-full
                bg-[#eef4ff]
                px-4 py-2
                text-sm font-medium text-blue-700
                mb-5
                "
              >
                🏢 Company Profile
              </div>

              {/* Name */}
              <h1
                className="
                text-4xl sm:text-5xl
                font-extrabold
                tracking-tight
                text-gray-900
                leading-tight
                break-words
                "
              >
                {company?.name}
              </h1>

              {/* Description */}
              <p
                className="
                mt-5
                text-gray-600
                leading-8
                max-w-2xl
                "
              >
                {company?.description || "No description available."}
              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div
            className="
            flex flex-col
            xl:items-end
            justify-start
            pt-2
            min-w-[180px]
            "
          >

            <p className="text-sm font-medium text-gray-500 mb-3">
              Total Applicants
            </p>

            <h2
              className="
              text-5xl
              font-extrabold
              tracking-tight
              text-gray-900
              leading-none
              "
            >
              {company?.totalApplicants || 0}
            </h2>

          </div>

        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* INFO GRID */}
        <div
          className="
          grid grid-cols-1 md:grid-cols-3
          gap-y-10 gap-x-8
          "
        >

          {/* Website */}
          <div>

            <p className="text-sm font-medium text-gray-500 mb-3">
              🌐 Website
            </p>

            <p className="font-semibold text-gray-900 break-all leading-7">
              {company?.website || "—"}
            </p>

          </div>

          {/* Location */}
          <div>

            <p className="text-sm font-medium text-gray-500 mb-3">
              📍 Location
            </p>

            <p className="font-semibold text-gray-900 leading-7">
              {company?.location || "—"}
            </p>

          </div>

          {/* Created */}
          <div>

            <p className="text-sm font-medium text-gray-500 mb-3">
              📅 Created
            </p>

            <p className="font-semibold text-gray-900 leading-7">

              {company?.createdAt
                ? new Date(company.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                : "—"}

            </p>

          </div>

        </div>

        {/* Bottom Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* STATS */}
        <div
          className="
          flex flex-wrap
          items-center
          gap-4
          "
        >

          {/* Jobs */}
          <div
            className="
            inline-flex items-center gap-3
            rounded-2xl
            bg-[#eef4ff]
            px-5 py-3
            "
          >

            <span className="text-sm font-medium text-blue-600">
              Total Jobs
            </span>

            <span className="text-xl font-bold text-blue-700">
              {company?.totalJobs || 0}
            </span>

          </div>

          {/* Accepted */}
          <div
            className="
            inline-flex items-center gap-3
            rounded-2xl
            bg-[#ecfdf3]
            px-5 py-3
            "
          >

            <span className="text-sm font-medium text-green-600">
              Accepted
            </span>

            <span className="text-xl font-bold text-green-700">
              {company?.accepted || 0}
            </span>

          </div>

          {/* Pending */}
          <div
            className="
            inline-flex items-center gap-3
            rounded-2xl
            bg-[#fff7ed]
            px-5 py-3
            "
          >

            <span className="text-sm font-medium text-orange-600">
              Pending
            </span>

            <span className="text-xl font-bold text-orange-700">
              {company?.pending || 0}
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

  <Footer />

</>
  )
}

export default CompanyDetialPage
