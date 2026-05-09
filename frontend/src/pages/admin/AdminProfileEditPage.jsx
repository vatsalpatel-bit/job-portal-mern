import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAdminProfileApi, getAdminProfileApi } from '@/services/authApi';
import { setAdmin } from '@/redux/slices/authslice';

const AdminProfileEditPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState(
        {
            fullname: "",
            email: "",
            phoneNumber: "",
            logo: null,
        }
    )
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAdminProfileApi = async () => {
            try {
                setLoading(true);
                const data = await getAdminProfileApi();
                // console.log(data);
                dispatch(setAdmin(data.profile));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        };
        fetchAdminProfileApi();
    }, [dispatch])

    const user = useSelector((state) => state.auth.admin);
    // console.log(user)
    useEffect(() => {
        if (user) {
            setForm({
                fullname: user.fullname || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                logo: user?.profile?.profilePhoto || null
            })
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo") {
            const file = files[0];
            setForm({ ...form, logo: files[0] })
            setPreview(URL.createObjectURL(file))
        }
        else {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("fullname", form.fullname)
            formData.append("email", form.email)
            formData.append("phoneNumber", form.phoneNumber)

            if (form.logo) {
                formData.append("logo", form.logo);
            }

            const data = await editAdminProfileApi(formData);
            console.log(data);
            if (data?.success) {
                navigate("/admin/profile")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">

                <div className="flex flex-col items-center gap-4">

                    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />

                    <p className="text-sm text-gray-500">
                        Loading ...
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="bg-gray-50 mt-16 py-10 px-6">

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

                        {/* Image Preview */}
                        <img
                            src={preview || user?.profile?.profilePhoto}
                            alt="logo"
                            className="w-24 h-24 rounded-2xl object-cover border shadow-md"
                        />

                        <div>

                            {/* Upload Button */}
                            <label
                                htmlFor="logoUpload"
                                className="inline-flex items-center justify-center h-11 px-5 rounded-xl border bg-white text-sm font-medium cursor-pointer hover:bg-gray-50 transition"
                            >
                                Change Logo
                            </label>

                            {/* Hidden Input */}
                            <input
                                type="file"
                                name="logo"
                                id="logoUpload"
                                className="hidden"
                                onChange={handleChange}
                            />

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
                                name='fullname'
                                value={form.fullname}
                                onChange={handleChange}
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
                                name='email'
                                value={form.email}
                                onChange={handleChange}
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
                                name='phoneNumber'
                                value={form.phoneNumber}
                                onChange={handleChange}
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

                            <input
                                type="text"
                                value={user?.role}
                                disabled
                                className="w-full h-12 rounded-xl border bg-gray-100 px-4 text-black-500 cursor-not-allowed"
                            />
                        </div>

                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-end gap-4 mt-10">

                        <button
                            onClick={() => navigate(-1)}
                            className="h-11 px-5 rounded-xl border text-sm font-medium hover:bg-gray-50 transition">
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="h-11 px-5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                            Update Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminProfileEditPage
