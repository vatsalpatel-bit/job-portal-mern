import React, { useState } from 'react'
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';


const AdminJobCreate = () => {
    const navigate = useNavigate();
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

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const submitHandler = () => {
        try {
            if (
                !input.title ||
                !input.description ||
                !input.requirements ||
                !input.salary ||
                !input.location ||
                !input.jobType ||
                !input.experience ||
                !input.position ||
                !input.companyId
            ){
                alert("Please fill all fields");
                return;
            }
            const data={
                ...input,
                requirements:input.requirements
                ?input.requirements.split(",").map((r)=>r.trim())
                :[],
                salary:Number(input.salary),
                position:Number(input.position),
            };
            console(data);
            cons
        } catch (error) {

        }
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
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
                                name='experience'
                                value={input.experience}
                                onChange={changeHandler}
                                className="w-full mt-1 border px-4 py-2 rounded">
                                <option>Full-Time</option>
                                <option>Part-Time</option>
                                <option>Internship</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Experience</label>
                            <input
                                value={input.experience}
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
                            {Companies?.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}

                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button className="px-5 py-2 border rounded-md hover:bg-gray-100">
                            Cancel
                        </button>

                        <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Create Job
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminJobCreate
