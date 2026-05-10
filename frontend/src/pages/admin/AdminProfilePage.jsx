import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAdminProfileApi } from '@/services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '@/redux/slices/authslice';
import Footer from '@/components/shared/Footer';

const AdminProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.auth.admin)
    console.log(user)
    useEffect(() => {
        const fetchAdminProfileApi = async () => {
            try {
                setLoading(true);
                const data = await getAdminProfileApi();
                // console.log(data);
                dispatch(setAdmin(data.profile))
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminProfileApi();
    }, [dispatch])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">

                <div className="flex flex-col items-center gap-4">

                    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />

                    <p className="text-sm text-gray-500">
                        Loading profile...
                    </p>

                </div>

            </div>
        );
    }
    return (
        <>
            <div className="min-h-screen bg-[#f7faff] overflow-hidden relative pt-16">

                {/* Background Effects */}
                <div className="absolute top-[-140px] left-[-100px] h-[340px] w-[340px] rounded-full bg-[#e9f2ff] blur-3xl opacity-80" />

                <div className="absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-[#fff3d9] blur-3xl opacity-70" />

                <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">

                    {/* Top Navigation */}
                    <div className="mb-8">

                        <button
                            onClick={() => navigate(-1)}
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

                    </div>

                    {/* HERO CARD */}
                    <div
                        className="
        relative overflow-hidden
        rounded-[40px]
        bg-white/80
        backdrop-blur-2xl
        border border-white/70
        shadow-[0_20px_60px_rgba(15,23,42,0.06)]
        "
                    >

                        {/* Gradient Top */}
                        <div
                            className="
          h-40
          bg-gradient-to-r
          from-[#dfeeff]
          via-[#eef5ff]
          to-[#fff5df]
          "
                        />

                        {/* Main Content */}
                        <div className="relative px-8 sm:px-10 pb-10">

                            {/* Avatar */}
                            <div
                                className="
            -mt-16
            flex flex-col xl:flex-row
            xl:items-end xl:justify-between
            gap-8
            "
                            >

                                {/* Left */}
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6">

                                    {/* Image */}
                                    <div className="relative">

                                        <img
                                            src={user?.profile?.profilePhoto}
                                            alt="profile"
                                            className="
                  w-32 h-32
                  rounded-full
                  object-cover
                  border-[6px] border-white
                  shadow-xl
                  "
                                        />

                                        {/* Online Dot */}
                                        <div
                                            className="
                  absolute bottom-3 right-3
                  h-5 w-5
                  rounded-full
                  bg-green-500
                  border-4 border-white
                  "
                                        />

                                    </div>

                                    {/* Info */}
                                    <div className="pb-2">

                                        {/* Name */}
                                        <div className="flex items-center gap-3 flex-wrap">

                                            <h1
                                                className="
                    text-4xl sm:text-5xl
                    font-black
                    tracking-tight
                    text-gray-900
                    "
                                            >
                                                {user?.fullname}
                                            </h1>

                                            <span
                                                className="
                    inline-flex items-center
                    rounded-full
                    bg-[#ecfdf3]
                    px-4 py-2
                    text-sm font-semibold text-green-700
                    "
                                            >
                                                Verified
                                            </span>

                                        </div>

                                        {/* Role */}
                                        <p className="text-gray-500 text-lg mt-4">
                                            Senior Recruiter
                                        </p>

                                        {/* Joined */}
                                        <p className="text-sm text-gray-400 mt-2">

                                            Joined{" "}

                                            {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                                                month: "short",
                                                year: "numeric",
                                            })}

                                        </p>

                                    </div>

                                </div>

                                {/* Right Action */}
                                <button
                                    onClick={() => navigate("/admin/profile/edit")}
                                    className="
              h-12 px-6
              rounded-2xl
              bg-gradient-to-r from-blue-600 to-violet-600
              hover:from-blue-700 hover:to-violet-700
              text-white
              text-sm font-medium
              shadow-[0_10px_25px_rgba(59,130,246,0.25)]
              transition-all duration-300
              hover:-translate-y-0.5
              "
                                >
                                    Edit Profile
                                </button>

                            </div>

                            {/* Divider */}
                            <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                            {/* STATS */}
                            <div
                                className="
            grid grid-cols-1 sm:grid-cols-3
            gap-5
            "
                            >

                                {/* Companies */}
                                <div
                                    className="
              rounded-[28px]
              bg-[#eef4ff]
              p-6
              "
                                >

                                    <p className="text-sm font-medium text-blue-600 mb-3">
                                        Total Companies
                                    </p>

                                    <h2 className="text-4xl font-extrabold text-blue-700">
                                        {user?.totalCompanies}
                                    </h2>

                                </div>

                                {/* Jobs */}
                                <div
                                    className="
              rounded-[28px]
              bg-[#fff7ed]
              p-6
              "
                                >

                                    <p className="text-sm font-medium text-orange-600 mb-3">
                                        Active Jobs
                                    </p>

                                    <h2 className="text-4xl font-extrabold text-orange-700">
                                        {user?.totalJobs}
                                    </h2>

                                </div>

                                {/* Placements */}
                                <div
                                    className="
              rounded-[28px]
              bg-[#ecfdf3]
              p-6
              "
                                >

                                    <p className="text-sm font-medium text-green-600 mb-3">
                                        Placements
                                    </p>

                                    <h2 className="text-4xl font-extrabold text-green-700">
                                        {user?.accepted}
                                    </h2>

                                </div>

                            </div>

                            {/* Contact Section */}
                            <div className="mt-12">

                                {/* Heading */}
                                <div className="mb-8">

                                    <h2 className="text-3xl font-bold text-gray-900">
                                        Contact Information
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Manage your recruiter account details.
                                    </p>

                                </div>

                                {/* Grid */}
                                <div
                                    className="
              grid grid-cols-1 md:grid-cols-2
              gap-6
              "
                                >

                                    {/* Email */}
                                    <div
                                        className="
                rounded-[28px]
                bg-[#f9fbff]
                border border-[#edf2ff]
                p-6
                "
                                    >

                                        <p className="text-sm font-medium text-gray-500 mb-3">
                                            Email Address
                                        </p>

                                        <h3
                                            className="
                  text-xl
                  font-bold
                  text-gray-900
                  break-all
                  "
                                        >
                                            {user?.email}
                                        </h3>

                                    </div>

                                    {/* Phone */}
                                    <div
                                        className="
                rounded-[28px]
                bg-[#f9fbff]
                border border-[#edf2ff]
                p-6
                "
                                    >

                                        <p className="text-sm font-medium text-gray-500 mb-3">
                                            Phone Number
                                        </p>

                                        <h3 className="text-xl font-bold text-gray-900">
                                            +91 {user?.phoneNumber}
                                        </h3>

                                    </div>

                                    {/* Role */}
                                    <div
                                        className="
                rounded-[28px]
                bg-[#f9fbff]
                border border-[#edf2ff]
                p-6
                "
                                    >

                                        <p className="text-sm font-medium text-gray-500 mb-3">
                                            Account Type
                                        </p>

                                        <h3 className="text-xl font-bold text-gray-900">
                                            Recruiter
                                        </h3>

                                    </div>

                                    {/* Status */}
                                    <div
                                        className="
                rounded-[28px]
                bg-[#f9fbff]
                border border-[#edf2ff]
                p-6
                "
                                    >

                                        <p className="text-sm font-medium text-gray-500 mb-3">
                                            Account Status
                                        </p>

                                        <div
                                            className="
                  inline-flex items-center
                  rounded-full
                  bg-[#ecfdf3]
                  px-4 py-2
                  text-sm font-semibold text-green-700
                  "
                                        >
                                            Active
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    )
}

export default AdminProfilePage
