import { setAllAdminJobs } from "@/redux/slices/companiesSlice";
import { getAdminJobsApi } from "@/services/companyApi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Calendar } from "lucide-react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";

const CompanyJobsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const jobs = useSelector((state) => state.company.allAdminJobs);
    useEffect(() => {
        const fetchAdminJobsApi = async () => {
            const data = await getAdminJobsApi();
            console.log(data.jobs);
            dispatch(setAllAdminJobs(data.jobs));
        }
        fetchAdminJobsApi();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
            <div className="max-w-6xl mx-auto px-6 py-10">

                {/*  Top Section */}
                <div className="flex items-center justify-between mb-8">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search jobs, companies..."
                        className="w-80 px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
                    />

                    {/* New Job Button */}
                    <button
                        onClick={() => navigate("/admin/job/create")}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
                    >
                        New Job
                    </button>
                </div>

                {/*  Jobs List */}
                <div className="space-y-4">

                    {jobs?.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition"
                        >

                            {/* Left Section */}
                            <div className="flex items-center gap-4">

                                {/* Job Info */}
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {job.title}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {job.company?.name}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex gap-4 text-sm text-gray-500 mt-1">

                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            {job.location}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <IndianRupee size={14} />
                                            {job.salary}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(job.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                            })}
                                        </span>

                                    </div>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="flex items-center gap-6">

                                {/* Stats */}
                                <div className="flex items-center gap-5 text-sm">

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

                                {/* Divider */}
                                <div className="h-6 w-px bg-gray-200"></div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() => navigate(`/admin/job/${job._id}/view`)}
                                        className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => navigate(`/admin/job/${job._id}/applicant`)}
                                        className="px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100"
                                    >
                                        Applicants
                                    </button>

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
                                            <button
                                                onClick={() => navigate(`/admin/job/${job._id}/edit`)}
                                                className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                                            >
                                                <Pencil className="w-4 h-4 text-gray-500" />
                                                Edit
                                            </button>

                                            <div className="my-1 border-t" />

                                            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                Delete
                                            </button>
                                        </PopoverContent>
                                    </Popover>

                                </div>

                            </div>

                        </div>
                    ))}

                    {/* Empty State */}
                    {jobs?.length === 0 && (
                        <p className="text-center text-gray-500 py-10">
                            No jobs found
                        </p>
                    )}

                </div>

            </div>
        </div>
    );
};

export default CompanyJobsPage;