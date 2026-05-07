import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminProfileEditPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 mt-16 py-10 px-6">

            <div className="max-w-4xl mx-auto bg-white border rounded-3xl shadow-sm overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b from-slate-50 to-gray-100 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Profile
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Update your recruiter information
                        </p>
                    </div>


                </div>

                {/* Form */}
                <div className="p-8">

                    {/* Avatar */}
                    <div className="flex items-center gap-5 mb-10">

                        <div className="w-24 h-24 rounded-2xl bg-black text-white flex items-center justify-center text-3xl font-bold shadow-md">
                            MK
                        </div>

                        <div>

                            <label className="inline-flex items-center justify-center h-11 px-5 rounded-xl border bg-white text-sm font-medium cursor-pointer hover:bg-gray-50 transition">
                                Upload Photo

                                <input
                                    type="file"
                                    className="hidden"
                                />
                            </label>

                            <p className="text-xs text-gray-400 mt-2">
                                JPG, PNG up to 2MB
                            </p>

                        </div>

                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Full Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter full name"
                                className="w-full h-12 rounded-xl border bg-gray-50 px-4 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full h-12 rounded-xl border bg-gray-50 px-4 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                placeholder="Enter phone number"
                                className="w-full h-12 rounded-xl border bg-gray-50 px-4 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Role
                            </label>

                            <select
                                className="w-full h-12 rounded-xl border bg-gray-50 px-4 outline-none focus:ring-2 focus:ring-black"
                            >
                                <option>Recruiter</option>
                                <option>Admin</option>
                                <option>HR Manager</option>
                            </select>
                        </div>

                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-end gap-4 mt-10">

                        <button
                            onClick={() => navigate(-1)}
                            className="h-11 px-5 rounded-xl border text-sm font-medium hover:bg-gray-50 transition">
                            Cancel
                        </button>

                        <button className="h-11 px-5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                            Update Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminProfileEditPage
