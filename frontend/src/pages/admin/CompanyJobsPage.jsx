import { setAllAdminJobs } from "@/redux/slices/companiesSlice";
import { getAdminJobsApi } from "@/services/companyApi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Calendar } from "lucide-react";

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
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
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
                            <div className="flex gap-3">

                                <button
                                    onClick={() => navigate(`/admin/job/${job._id}/edit`)}
                                    className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => navigate(`/admin/job/${job._id}`)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                                >
                                    View
                                </button>

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