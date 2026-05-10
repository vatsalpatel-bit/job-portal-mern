import React, { useEffect, useState } from 'react'
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getAllCompanyApi, postJobApi } from '@/services/companyApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCompanies } from '@/redux/slices/companiesSlice';
import { toast } from 'sonner';


const AdminJobCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        position: "",
        jobType: "",
        experience: "",
        companyId: "",
    });
    const allCompanies = useSelector((state) => state.company.allCompanies);

    useEffect(() => {
        const fetchCompanyApi = async () => {
            try {
                setLoading(true);
                const data = await getAllCompanyApi();
                dispatch(setAllCompanies(data.companies))
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        }
        fetchCompanyApi();

    }, [dispatch]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const submitHandler = async () => {
        try {
            if (
                !input.title ||
                !input.description ||
                !input.requirements ||
                !input.salary ||
                !input.location ||
                !input.jobType ||
                input.experience === "" ||
                input.position === "" ||
                !input.companyId
            ) {
                alert("Please fill all fields");
                return;
            } setLoading(true);
            const jobData = {
                ...input,
                requirements: input.requirements
                    .split(",")
                    .map((r) => r.trim())
                    .filter(Boolean),
                salary: Number(input.salary),
                position: Number(input.position),
                experience: Number(input.experience),
            };
            const data = await postJobApi(jobData);
            console.log(data)
            if (data.success) {
                toast.success(data?.message || "New job created successfully")
                navigate("/admin/jobs")
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
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
            <div className="max-w-3xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-gray-600 hover:text-black"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>
                    <h1 className="text-2xl font-semibold">Create Job</h1>
                </div>
                <div className="bg-white p-6 rounded-xl shadow space-y-5">

                    {/* Title */}
                    <div>
                        <label className="text-sm text-gray-600">Job Title</label>
                        <input
                            name="title"
                            value={input.title}
                            onChange={changeHandler}
                            type="text"
                            placeholder="Frontend Developer"
                            className="w-full mt-1 border px-4 py-2 rounded"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm text-gray-600">Description</label>
                        <textarea
                            name='description'
                            value={input.description}
                            onChange={changeHandler}
                            placeholder="Write job description..."
                            className="w-full mt-1 border px-4 py-2 rounded h-28"
                        />
                    </div>

                    {/* Requirements */}
                    <div>
                        <label className="text-sm text-gray-600">Requirements</label>
                        <input
                            name='requirements'
                            value={input.requirements}
                            onChange={changeHandler}
                            type="text"
                            placeholder="React, Node, MongoDB"
                            className="w-full mt-1 border px-4 py-2 rounded"
                        />
                    </div>

                    {/* Salary + Location */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600">Salary</label>
                            <input
                                name='salary'
                                value={input.salary}
                                onChange={changeHandler}
                                type="number"
                                placeholder="500000"
                                className="w-full mt-1 border px-4 py-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Location</label>
                            <input
                                name='location'
                                value={input.location}
                                onChange={changeHandler}
                                type="text"
                                placeholder="Bangalore"
                                className="w-full mt-1 border px-4 py-2 rounded"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Position</label>
                        <input
                            value={input.position}
                            onChange={changeHandler}
                            type="number"
                            placeholder="2"
                            name="position"
                            className="w-full mt-1 border px-4 py-2 rounded"
                        />
                    </div>

                    {/* Job Type + Experience */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600">Job Type</label>
                            <select
                                name='jobType'
                                value={input.jobType}
                                onChange={changeHandler}
                                className="w-full mt-1 border px-4 py-2 rounded"
                            >
                                <option value="">Select Job Type</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Experience</label>
                            <input
                                name='experience'
                                value={input.experience}
                                onChange={changeHandler}
                                type="number"
                                placeholder="2 years"
                                className="w-full mt-1 border px-4 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <label className="text-sm text-gray-600">Company</label>
                        <select
                            name='companyId'
                            value={input.companyId}
                            onChange={changeHandler}
                            className="w-full mt-1 border px-4 py-2 rounded">
                            <option value="">Select Company</option>
                            {allCompanies?.map((company) => (
                                <option key={company?._id} value={company?._id}>
                                    {company?.name}
                                </option>
                            ))}

                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-5 py-2 border rounded-md hover:bg-gray-100">
                            Cancel
                        </button>

                        <button
                            onClick={submitHandler}
                            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Create Job
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminJobCreate
