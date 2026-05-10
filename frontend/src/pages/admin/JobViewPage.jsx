import { setSingleJob } from '@/redux/slices/companiesSlice';
import { getJobByIdApi } from '@/services/companyApi';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteJobApi } from '@/services/jobApi';
import Footer from '@/components/shared/Footer';


const JobViewPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: jobId } = useParams();
    const [loading, setLoading] = useState(true)
    const job = useSelector((state) => state?.company?.singleJob);
    console.log(job?.application)
    useEffect(() => {
        const fetchJobApi = async () => {
            try {
                setLoading(true);
                const data = await getJobByIdApi(jobId);
                // console.log(data.job);
                dispatch(setSingleJob(data.job))
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }

        }
        fetchJobApi();
    }, [dispatch, jobId]);

    const status = useMemo(() => {
        const result = { length: 0, accepted: 0, rejected: 0, pending: 0 }
        job?.application?.forEach((r) => {
            if (r.status === 'pending') result.pending++;
            else if (r.status === 'rejected') result.rejected++;
            else if (r.status === 'accepted') result.accepted++;
        });
        return result;
    }, [job?.application]);

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
            <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative pt-24">

                {/* Background Blur */}
                <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

                <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

                <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 space-y-8">

                    {/* HEADER */}
                    <div
                        className="
        flex flex-col lg:flex-row
        lg:items-center lg:justify-between
        gap-5
        "
                    >

                        {/* Left */}
                        <div>

                            {/* Back */}
                            <button
                                onClick={() => navigate("/admin/jobs")}
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

                            {/* Badge */}
                            <div
                                className="

            rounded-full
            bg-[#eef4ff]
            px-4 py-2
            text-sm font-medium text-blue-700
            mb-5
            "
                            >
                                💼 Job Overview
                            </div>

                            {/* Title */}
                            <h1
                                className="
            text-4xl sm:text-5xl
            font-extrabold
            tracking-tight
            text-gray-900
            leading-tight
            "
                            >
                                Job Details
                            </h1>

                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3">

                            {/* Applicants */}
                            <button
                                onClick={() => navigate(`/admin/job/${job._id}/applicant`)}
                                className="
            h-11 px-5
            rounded-2xl
            bg-[#f3e8ff]
            hover:bg-purple-100
            text-sm font-medium text-purple-700
            transition-all duration-300
            "
                            >
                                Applicants
                            </button>

                            {/* Popover */}
                            <Popover>

                                <PopoverTrigger asChild>

                                    <button
                                        className="
                h-11 w-11
                rounded-2xl
                bg-white
                hover:bg-gray-100
                shadow-sm
                flex items-center justify-center
                transition-all duration-300
                "
                                    >
                                        <MoreVertical className="text-gray-500 w-4 h-4" />
                                    </button>

                                </PopoverTrigger>

                                <PopoverContent
                                    align="end"
                                    className="
              w-44 p-2
              rounded-2xl
              border-0
              bg-white
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              "
                                >

                                    {/* Edit */}
                                    <button
                                        onClick={() => navigate(`/admin/job/${job._id}/edit`)}
                                        className="
                flex items-center gap-3
                w-full px-3 py-3
                text-sm font-medium
                rounded-xl
                text-gray-700
                hover:bg-[#f8fbff]
                transition
                "
                                    >
                                        <Pencil className="w-4 h-4 text-gray-500" />
                                        Edit Job
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => {
                                            const confirmDelete = window.confirm("Delete job and related applications");

                                            if (confirmDelete) {
                                                deleteJobApi(jobId);
                                                navigate(-1);
                                            }
                                        }}
                                        className="
                flex items-center gap-3
                w-full px-3 py-3
                text-sm font-medium
                rounded-xl
                text-red-600
                hover:bg-red-50
                transition
                "
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                        Delete
                                    </button>

                                </PopoverContent>

                            </Popover>

                        </div>

                    </div>

                    {/* HERO CARD */}
                    <div
                        className="
        rounded-[36px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        p-8 sm:p-10
        "
                    >

                        <div
                            className="
          flex flex-col xl:flex-row
          xl:items-start xl:justify-between
          gap-10
          "
                        >

                            {/* Left */}
                            <div className="flex items-start gap-6 flex-1 min-w-0">

                                {/* Logo */}
                                <img
                                    src={
                                        job?.company.logo &&
                                            job?.company.logo.startsWith("http")
                                            ? job?.company.logo
                                            : "https://via.placeholder.com/40"
                                    }
                                    alt="logo"
                                    className="
              w-24 h-24
              rounded-[28px]
              object-cover
              border border-[#edf2ff]
              bg-white
              shadow-sm
              shrink-0
              "
                                />

                                {/* Info */}
                                <div className="flex-1 min-w-0">

                                    <h2
                                        className="
                text-4xl
                font-extrabold
                tracking-tight
                text-gray-900
                leading-tight
                "
                                    >
                                        {job?.title}
                                    </h2>

                                    <p className="text-gray-500 text-lg mt-3">
                                        {job?.company?.name}
                                    </p>

                                    {/* Meta */}
                                    <div
                                        className="
                flex flex-wrap items-center
                gap-5
                mt-6
                text-sm text-gray-500
                "
                                    >

                                        <span className="flex items-center gap-2">
                                            📍 {job?.location}
                                        </span>

                                        <span className="flex items-center gap-2">
                                            📅 Posted{" "}
                                            {new Date(job?.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                            })}
                                        </span>

                                        <span className="flex items-center gap-2">
                                            💼 {job?.jobType}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* Salary */}
                            <div
                                className="
            rounded-[28px]
            bg-[#ecfdf3]
            px-8 py-6
            min-w-[220px]
            "
                            >

                                <p className="text-sm font-medium text-green-600 mb-3">
                                    Salary
                                </p>

                                <h3 className="text-4xl font-extrabold text-green-700">
                                    ₹ {job?.salary}
                                </h3>

                            </div>

                        </div>

                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                        {/* Total */}
                        <div className="rounded-[28px] bg-white/80 backdrop-blur-xl p-6 shadow-sm">

                            <p className="text-sm text-gray-500 mb-3">
                                Total Applicants
                            </p>

                            <h2 className="text-4xl font-extrabold text-gray-900">
                                {job?.application?.length}
                            </h2>

                        </div>

                        {/* Accepted */}
                        <div className="rounded-[28px] bg-[#ecfdf3] p-6">

                            <p className="text-sm text-green-600 mb-3">
                                Accepted
                            </p>

                            <h2 className="text-4xl font-extrabold text-green-700">
                                {status.accepted}
                            </h2>

                        </div>

                        {/* Pending */}
                        <div className="rounded-[28px] bg-[#fff7ed] p-6">

                            <p className="text-sm text-orange-600 mb-3">
                                Pending
                            </p>

                            <h2 className="text-4xl font-extrabold text-orange-700">
                                {status.pending}
                            </h2>

                        </div>

                        {/* Rejected */}
                        <div className="rounded-[28px] bg-[#fef2f2] p-6">

                            <p className="text-sm text-red-600 mb-3">
                                Rejected
                            </p>

                            <h2 className="text-4xl font-extrabold text-red-700">
                                {status.rejected}
                            </h2>

                        </div>

                    </div>

                    {/* CONTENT */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

                        {/* LEFT */}
                        <div className="space-y-8">

                            {/* Description */}
                            <div
                                className="
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            shadow-sm
            p-8
            "
                            >

                                <h3 className="text-2xl font-bold text-gray-900 mb-5">
                                    Job Description
                                </h3>

                                <p className="text-gray-600 leading-8">
                                    {job?.description}
                                </p>

                            </div>

                            {/* Requirements */}
                            <div
                                className="
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            shadow-sm
            p-8
            "
                            >

                                <h3 className="text-2xl font-bold text-gray-900 mb-5">
                                    Requirements
                                </h3>

                                <div className="flex flex-wrap gap-3">

                                    {job?.requirements?.map((r, i) => (
                                        <span
                                            key={`${r}-${i}`}
                                            className="
                  rounded-full
                  bg-[#eef4ff]
                  px-4 py-2
                  text-sm font-medium text-blue-700
                  "
                                        >
                                            {r}
                                        </span>
                                    ))}

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div
                            className="
          rounded-[32px]
          bg-white/80
          backdrop-blur-xl
          shadow-sm
          p-8
          h-fit
          "
                        >

                            <h3 className="text-2xl font-bold text-gray-900 mb-7">
                                Overview
                            </h3>

                            <div className="space-y-6">

                                <div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Job Type
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {job?.jobType}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Position
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {job?.position}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Experience
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {job?.experienceLevel} Years
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Company
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {job?.company?.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Location
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {job?.location}
                                    </p>
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

export default JobViewPage
