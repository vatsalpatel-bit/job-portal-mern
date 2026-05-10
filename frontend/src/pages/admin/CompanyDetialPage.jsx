import { setSingleCompany } from '@/redux/slices/companiesSlice';
import { deleteCompanyApi, getCompanyById, getCompanyStatus } from '@/services/companyApi';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';

const CompanyDetialPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: companyId } = useParams();
  const [loading, setLoading] = useState(true);
  const company = useSelector((state) => state.company.singleCompany)
  // console.log(company);

  useEffect(() => {
    const fetchCompnayStatusApi = async () => {
      try {
        setLoading(true);
        const data = await getCompanyStatus(companyId);
        // console.log(data.companyStatus);
        dispatch(setSingleCompany(data.companyStatus));
      } catch (error) {
        console.log(error);
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
        console.log(error);
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
    <div className="bg-gray-50 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-black text-sm"
          >
            ← Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/admin/company/${company._id}/edit`)}
              className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border">

          {/* Top section */}
          <div className="flex items-start justify-between mb-6">

            {/* LEFT */}
            <div className="flex items-start gap-5">

              {/* Logo */}
              {company?.logo ? (
                <img
                  src={company.logo}
                  alt="logo"
                  className="w-20 h-20 rounded-xl object-cover border"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center text-xl font-semibold">
                  {company?.name?.[0]}
                </div>
              )}

              {/* Info */}
              <div>
                <h1 className="text-2xl font-semibold">
                  {company?.name}
                </h1>

                <p className="text-gray-500 mt-2 max-w-lg">
                  {company?.description || "No description available."}
                </p>
              </div>
            </div>

            {/* RIGHT → Total Applicants */}
            <div className="bg-blue-50 border border-blue-100 px-5 py-3 rounded-xl text-right shadow-sm hover:shadow-md transition">
              <p className="text-xs text-blue-500 tracking-wide">
                👥 TOTAL APPLICANTS
              </p>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {company?.totalApplicants || 0}
              </p>
            </div>

          </div>

          {/* Divider */}
          <hr className="mb-6" />

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            <div>
              <p className="text-sm text-gray-500">🌐 Website</p>
              <p className="font-medium">{company?.website || "—"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">📍 Location</p>
              <p className="font-medium">{company?.location || "—"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">📅 Created</p>
              <p className="font-medium">
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

          {/*  Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

            {/* Total Jobs */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <p className="text-xs text-blue-600 mb-1">Total Jobs</p>
              <p className="text-2xl font-semibold text-blue-700">
                {company?.totalJobs || 0}
              </p>
            </div>

            {/* Accepted */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <p className="text-xs text-green-600 mb-1">Accepted</p>
              <p className="text-2xl font-semibold text-green-700">
                {company?.accepted || 0}
              </p>
            </div>

            {/* Pending */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <p className="text-xs text-yellow-600 mb-1">Pending</p>
              <p className="text-2xl font-semibold text-yellow-700">
                {company?.pending || 0}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default CompanyDetialPage
