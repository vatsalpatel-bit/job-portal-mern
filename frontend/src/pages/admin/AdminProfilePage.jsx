import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminProfilePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 mt-16 py-10 px-6">

            <div className="max-w-5xl mx-auto">
                <div className="flex items-center text-2xl mb-7 gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-gray-500 hover:text-black"
                    >
                        <ArrowLeft size={23} />
                        Back
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">

                    {/* Top */}
                    <div className="relative px-8 py-8 border-b bg-gradient-to-r from-slate-50 to-gray-100">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                            {/* Left */}
                            <div className="flex items-center gap-5">

                                {/* Avatar */}
                                <div className="w-24 h-24 rounded-2xl bg-black text-white flex items-center justify-center text-3xl font-bold shadow-md">
                                    MK
                                </div>

                                {/* Info */}
                                <div>

                                    <div className="flex items-center gap-3 flex-wrap">

                                        <h1 className="text-3xl font-bold text-gray-900">
                                            Mad Kind
                                        </h1>

                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                            Verified
                                        </span>

                                    </div>

                                    <p className="text-gray-500 mt-2">
                                        Senior Recruiter
                                    </p>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Joined Jan 2026
                                    </p>

                                </div>

                            </div>

                            {/* Action */}
                            <button className="h-11 px-5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                                Edit Profile
                            </button>

                        </div>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-8 border-b">

                        <div className="rounded-2xl border bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Total Companies
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900 mt-2">
                                24
                            </h2>
                        </div>

                        <div className="rounded-2xl border bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Active Jobs
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900 mt-2">
                                138
                            </h2>
                        </div>

                        <div className="rounded-2xl border bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Placements
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900 mt-2">
                                91
                            </h2>
                        </div>

                    </div>

                    {/* Details */}
                    <div className="p-8">

                        <h2 className="text-lg font-semibold text-gray-900 mb-6">
                            Contact Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Email */}
                            <div className="border rounded-2xl p-5 bg-gray-50">

                                <p className="text-sm text-gray-500 mb-2">
                                    Email Address
                                </p>

                                <h3 className="text-lg font-semibold text-gray-900 break-all">
                                    madkind@gmail.com
                                </h3>

                            </div>

                            {/* Phone */}
                            <div className="border rounded-2xl p-5 bg-gray-50">

                                <p className="text-sm text-gray-500 mb-2">
                                    Phone Number
                                </p>

                                <h3 className="text-lg font-semibold text-gray-900">
                                    +91 9876543210
                                </h3>

                            </div>

                            {/* Role */}
                            <div className="border rounded-2xl p-5 bg-gray-50">

                                <p className="text-sm text-gray-500 mb-2">
                                    Account Type
                                </p>

                                <h3 className="text-lg font-semibold text-gray-900">
                                    Recruiter
                                </h3>

                            </div>

                            {/* Status */}
                            <div className="border rounded-2xl p-5 bg-gray-50">

                                <p className="text-sm text-gray-500 mb-2">
                                    Account Status
                                </p>

                                <h3 className="text-lg font-semibold text-green-600">
                                    Active
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminProfilePage
