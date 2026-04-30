import { setSingleJob } from '@/redux/slices/companiesSlice';
import { getJobByIdApi } from '@/services/companyApi';
import React, { useEffect } from 'react'
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


const JobViewPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: jobId } = useParams();
    const job = useSelector((state) => state?.company?.singleJob);
    console.log(job)
    useEffect(() => {
        const fetchJobApi = async () => {
            const data = await getJobByIdApi(jobId);
            // console.log(data.job);
            dispatch(setSingleJob(data.job))
        }
        fetchJobApi();
    }, [dispatch, jobId]);
    return (
        <div className="min-h-screen bg-gray-50 p-6 mt-16">

            <div className="max-w-6xl mx-auto space-y-6">

                <div className="flex items-center justify-between">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-black"
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>

                        <h1 className="text-xl font-semibold text-gray-800">
                            Job Details
                        </h1>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2">

                        {/* Applicants */}
                        <button
                            onClick={() => navigate(`/admin/job/${job._id}/applicant`)}
                            className="px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100"
                        >
                            Applicants
                        </button>

                        {/* Popover */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="p-2 rounded-md hover:bg-gray-100 transition">
                                    <MoreVertical className="text-gray-500 w-4 h-4" />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent
                                align="end"
                                className="w-40 p-1 rounded-lg shadow-lg border bg-white"
                            >

                                {/* Edit */}
                                <button
                                    onClick={() => navigate(`/admin/job/${job._id}/edit`)}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition"
                                >
                                    <Pencil className="w-4 h-4 text-gray-500" />
                                    Edit
                                </button>

                                {/* Divider */}
                                <div className="my-1 border-t" />

                                {/* Delete */}
                                <button
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 transition"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                    Delete
                                </button>

                            </PopoverContent>
                        </Popover>

                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">

                    {/* LEFT: Logo + Info */}
                    <div className="flex items-center gap-4">

                        {/* Logo */}
                        <img
                            src={
                                job?.company.logo && job?.company.logo.startsWith("http")
                                    ? job?.company.logo
                                    : "https://via.placeholder.com/40"
                            }
                            alt="logo"
                            className="w-12 h-12 rounded-lg object-cover border bg-gray-50"
                        />

                        {/* Info */}
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-800 leading-tight">
                                {job?.title}
                            </h2>

                            <p className="text-sm text-gray-500 leading-tight">
                                {job?.location}
                            </p>

                            <p className="text-xs text-gray-400 leading-tight">
                                Posted on{" "}
                                {new Date(job?.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                })}
                            </p>
                        </div>

                    </div>

                    {/* RIGHT: Stats + Salary */}
                    <div className="flex items-center gap-5">

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm">

                            <div className="text-center">
                                <p className="text-[10px] text-gray-400">Total</p>
                                <p className="font-semibold text-gray-800">12</p>
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] text-gray-400">Accepted</p>
                                <p className="font-semibold text-green-600">5</p>
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] text-gray-400">Pending</p>
                                <p className="font-semibold text-yellow-600">7</p>
                            </div>

                        </div>

                        {/* Divider (optional but pro) */}
                        <div className="h-6 w-px bg-gray-200"></div>

                        {/* Salary */}
                        <div className="bg-green-100 px-4 py-2 rounded-lg text-center">
                            <p className="text-[10px] text-gray-600">Salary</p>
                            <p className="text-sm font-semibold text-green-700">
                                ₹ {job?.salary}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-2 gap-6">

                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold mb-2">Job Description</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {job?.description}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold mb-3">Job Overview</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Job Type:</strong> {job?.jobType}</p>
                            <p><strong>Position:</strong> {job?.position}</p>
                            <p><strong>Experience:</strong> {job?.experienceLevel}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold mb-3">Requirements</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                            {job?.requirements?.map((r) => (<li><div key={job._id}>{r}</div></li>)
                            )}

                        </ul>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold mb-3">Additional Info</h3>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p><strong>Posted By:</strong> {job?.company?.name}</p>
                            <p><strong>Date:</strong> {new Date(job?.createdAt).toLocaleDateString("en-In", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            })}</p>
                        </div>
                    </div>

                </div>

                {/* Location */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="text-gray-600">{job?.location}</p>
                </div>

            </div>
        </div>
    )
}

export default JobViewPage
