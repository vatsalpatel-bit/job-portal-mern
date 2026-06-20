import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAdminProfileApi, getAdminProfileApi } from '@/services/authApi';
import { setAdmin } from '@/redux/slices/authslice';
import { toast } from 'sonner';
import Footer from '@/components/shared/Footer';
import { ArrowLeft } from 'lucide-react';

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
            if (data?.success) {
                toast.success(data?.message)
                navigate("/admin/profile")
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message 
            );
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
      <>
  <div className="min-h-screen bg-[#f7faff] overflow-hidden relative pt-24">

    {/* Background Effects */}
    <div className="absolute top-[-140px] left-[-100px] h-[340px] w-[340px] rounded-full bg-[#e9f2ff] blur-3xl opacity-80" />

    <div className="absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-[#fff3d9] blur-3xl opacity-70" />

    <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">

      {/* Main Card */}
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

        {/* Top Gradient */}
        <div
          className="
          h-40
          bg-gradient-to-r
          from-[#dfeeff]
          via-[#eef5ff]
          to-[#fff5df]
          "
        />

        {/* Content */}
        <div className="relative px-8 sm:px-10 pb-10">

          {/* Header */}
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

              {/* Avatar */}
              <div className="relative">

                <img
                  src={preview || user?.profile?.profilePhoto}
                  alt="profile"
                  className="
                  w-32 h-32
                  rounded-full
                  object-cover
                  border-[6px] border-white
                  shadow-xl
                  "
                />

                {/* Status Dot */}
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

                {/* Badge */}
                <div
                  className="
                  inline-flex items-center
                  rounded-full
                  bg-[#eef4ff]
                  px-4 py-2
                  text-sm font-medium text-blue-700
                  mb-4
                  "
                >
                  ✨ Edit Recruiter Profile
                </div>

                {/* Title */}
                <h1
                  className="
                  text-4xl sm:text-5xl
                  font-black
                  tracking-tight
                  text-gray-900
                  "
                >
                  Edit Profile
                </h1>

                <p className="text-gray-500 text-base mt-4 leading-7">
                  Update your recruiter information and personal details.
                </p>

              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Upload Section */}
          <div
            className="
            rounded-[30px]
            bg-[#f9fbff]
            border border-[#edf2ff]
            p-6
            mb-10
            "
          >

            <div
              className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-5
              "
            >

              {/* Left */}
              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Profile Picture
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Upload a professional profile image.
                </p>

              </div>

              {/* Upload */}
              <div>

                <label
                  htmlFor="logoUpload"
                  className="
                  inline-flex items-center justify-center
                  h-12 px-6
                  rounded-2xl
                  bg-white
                  hover:bg-gray-100
                  border border-[#edf2ff]
                  text-sm font-medium text-gray-700
                  shadow-sm
                  cursor-pointer
                  transition-all duration-300
                  "
                >
                  Change Photo
                </label>

                <input
                  type="file"
                  name="logo"
                  id="logoUpload"
                  className="hidden"
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          {/* FORM GRID */}
          <div
            className="
            grid grid-cols-1 md:grid-cols-2
            gap-7
            "
          >

            {/* Full Name */}
            <div>

              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Full Name
              </label>

              <input
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                type="text"
                placeholder="Enter full name"
                className="
                w-full h-14
                rounded-2xl
                border border-[#edf2ff]
                bg-[#f9fbff]
                px-5
                text-gray-900
                outline-none
                transition-all duration-300
                focus:ring-4 focus:ring-blue-100
                "
              />

            </div>

            {/* Email */}
            <div>

              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Email Address
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
                className="
                w-full h-14
                rounded-2xl
                border border-[#edf2ff]
                bg-[#f9fbff]
                px-5
                text-gray-900
                outline-none
                transition-all duration-300
                focus:ring-4 focus:ring-blue-100
                "
              />

            </div>

            {/* Phone */}
            <div>

              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Phone Number
              </label>

              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                type="text"
                placeholder="Enter phone number"
                className="
                w-full h-14
                rounded-2xl
                border border-[#edf2ff]
                bg-[#f9fbff]
                px-5
                text-gray-900
                outline-none
                transition-all duration-300
                focus:ring-4 focus:ring-blue-100
                "
              />

            </div>

            {/* Role */}
            <div>

              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Role
              </label>

              <input
                type="text"
                value={user?.role}
                disabled
                className="
                w-full h-14
                rounded-2xl
                border border-[#edf2ff]
                bg-gray-100
                px-5
                text-gray-500
                cursor-not-allowed
                "
              />

            </div>

          </div>

          {/* Footer Buttons */}
          <div
            className="
            flex flex-col sm:flex-row
            items-center justify-end
            gap-4
            mt-12
            "
          >

            {/* Cancel */}
            <button
              onClick={() => navigate(-1)}
              className="
              h-12 px-6
              rounded-2xl
              bg-white
              hover:bg-gray-100
              border border-[#edf2ff]
              text-sm font-medium text-gray-700
              shadow-sm
              transition-all duration-300
              "
            >
              Cancel
            </button>

            {/* Save */}
            <button
              onClick={handleSubmit}
              className="
              h-12 px-7
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
              Update Profile
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

  <Footer />
</>
    )
}

export default AdminProfileEditPage
