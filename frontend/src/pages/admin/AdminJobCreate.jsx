import React, { useEffect, useState } from 'react'
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getAllCompanyApi, postJobApi } from '@/services/companyApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCompanies } from '@/redux/slices/companiesSlice';
import { toast } from 'sonner';
import Footer from '@/components/shared/Footer';


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
        <>
            <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative pt-24">

                {/* Background Blur */}
                <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

                <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

                <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">

                    {/* Header */}
                    <div className="mb-10">

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
                            💼 New Opportunity
                        </div>

                        {/* Title */}
                        <h1
                            className="
          text-4xl sm:text-5xl
          font-extrabold
          tracking-tight
          text-gray-900
          "
                        >
                            Create Job
                        </h1>

                        <p className="mt-4 text-gray-600 leading-7 max-w-2xl">
                            Publish a new opportunity and start hiring top talent.
                        </p>

                    </div>

                    {/* FORM CARD */}
                    <div
                        className="
        rounded-[36px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        p-7 sm:p-10
        "
                    >

                        <div className="space-y-7">

                            {/* Title */}
                            <div>

                                <label className="text-sm font-medium text-gray-700">
                                    Job Title
                                </label>

                                <input
                                    name="title"
                                    value={input.title}
                                    onChange={changeHandler}
                                    type="text"
                                    placeholder="Frontend Developer"
                                    className="
              w-full mt-3
              h-14
              rounded-2xl
              border-0
              bg-[#f8fbff]
              px-5
              text-gray-900
              shadow-none
              focus:outline-none
              focus:ring-2 focus:ring-blue-200
              "
                                />

                            </div>

                            {/* Description */}
                            <div>

                                <label className="text-sm font-medium text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={input.description}
                                    onChange={changeHandler}
                                    placeholder="Write job description..."
                                    className="
              w-full mt-3
              rounded-2xl
              border-0
              bg-[#f8fbff]
              px-5 py-4
              h-36
              resize-none
              text-gray-900
              shadow-none
              focus:outline-none
              focus:ring-2 focus:ring-blue-200
              "
                                />

                            </div>

                            {/* Requirements */}
                            <div>

                                <label className="text-sm font-medium text-gray-700">
                                    Requirements
                                </label>

                                <input
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeHandler}
                                    type="text"
                                    placeholder="React, Node, MongoDB"
                                    className="
              w-full mt-3
              h-14
              rounded-2xl
              border-0
              bg-[#f8fbff]
              px-5
              text-gray-900
              focus:outline-none
              focus:ring-2 focus:ring-blue-200
              "
                                />

                            </div>

                            {/* Salary + Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Salary */}
                                <div>

                                    <label className="text-sm font-medium text-gray-700">
                                        Salary
                                    </label>

                                    <input
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeHandler}
                                        type="number"
                                        placeholder="500000"
                                        className="
                w-full mt-3
                h-14
                rounded-2xl
                border-0
                bg-[#f8fbff]
                px-5
                text-gray-900
                focus:outline-none
                focus:ring-2 focus:ring-blue-200
                "
                                    />

                                </div>

                                {/* Location */}
                                <div>

                                    <label className="text-sm font-medium text-gray-700">
                                        Location
                                    </label>

                                    <input
                                        name="location"
                                        value={input.location}
                                        onChange={changeHandler}
                                        type="text"
                                        placeholder="Bangalore"
                                        className="
                w-full mt-3
                h-14
                rounded-2xl
                border-0
                bg-[#f8fbff]
                px-5
                text-gray-900
                focus:outline-none
                focus:ring-2 focus:ring-blue-200
                "
                                    />

                                </div>

                            </div>

                            {/* Position */}
                            <div>

                                <label className="text-sm font-medium text-gray-700">
                                    Position
                                </label>

                                <input
                                    value={input.position}
                                    onChange={changeHandler}
                                    type="number"
                                    placeholder="2"
                                    name="position"
                                    className="
              w-full mt-3
              h-14
              rounded-2xl
              border-0
              bg-[#f8fbff]
              px-5
              text-gray-900
              focus:outline-none
              focus:ring-2 focus:ring-blue-200
              "
                                />

                            </div>

                            {/* Job Type + Experience */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Job Type */}
                                <div>

                                    <label className="text-sm font-medium text-gray-700">
                                        Job Type
                                    </label>

                                    <select
                                        name="jobType"
                                        value={input.jobType}
                                        onChange={changeHandler}
                                        className="
                w-full mt-3
                h-14
                rounded-2xl
                border-0
                bg-[#f8fbff]
                px-5
                text-gray-900
                focus:outline-none
                focus:ring-2 focus:ring-blue-200
                "
                                    >
                                        <option value="">Select Job Type</option>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Internship">Internship</option>
                                    </select>

                                </div>

                                {/* Experience */}
                                <div>

                                    <label className="text-sm font-medium text-gray-700">
                                        Experience
                                    </label>

                                    <input
                                        name="experience"
                                        value={input.experience}
                                        onChange={changeHandler}
                                        type="number"
                                        placeholder="2 years"
                                        className="
                w-full mt-3
                h-14
                rounded-2xl
                border-0
                bg-[#f8fbff]
                px-5
                text-gray-900
                focus:outline-none
                focus:ring-2 focus:ring-blue-200
                "
                                    />

                                </div>

                            </div>

                            {/* Company */}
                            <div>

                                <label className="text-sm font-medium text-gray-700">
                                    Company
                                </label>

                                <select
                                    name="companyId"
                                    value={input.companyId}
                                    onChange={changeHandler}
                                    className="
              w-full mt-3
              h-14
              rounded-2xl
              border-0
              bg-[#f8fbff]
              px-5
              text-gray-900
              focus:outline-none
              focus:ring-2 focus:ring-blue-200
              "
                                >

                                    <option value="">Select Company</option>

                                    {allCompanies?.map((company) => (
                                        <option key={company?._id} value={company?._id}>
                                            {company?.name}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            {/* Buttons */}
                            <div
                                className="
            flex flex-col sm:flex-row
            justify-end gap-4
            pt-4
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
              text-sm font-medium text-gray-700
              shadow-sm
              transition-all duration-300
              "
                                >
                                    Cancel
                                </button>

                                {/* Create */}
                                <button
                                    onClick={submitHandler}
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
                                    Create Job
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

export default AdminJobCreate
