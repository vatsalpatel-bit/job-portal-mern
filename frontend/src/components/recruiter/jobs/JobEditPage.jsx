import React, { useEffect, useState } from 'react'
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { getJobByIdApi, updateJobApi } from '@/services/companyApi';
import { toast } from 'sonner';
import Footer from '@/components/shared/Footer';

const JobEditPage = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    position: "",
    jobType: "",
    experienceLevel: "",
  });
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobApi = async () => {
      try {
        setLoading(true);
        const data = await getJobByIdApi(jobId);
        const job = data.job;
        setInput({
          title: job.title || "",
          description: job.description || "",
          requirements: job.requirements.join(", ") || "",
          salary: job.salary || "",
          location: job.location || "",
          position: job.position || "",
          jobType: job.jobType || "",
          experienceLevel: job.experienceLevel || "",
        })
        setCompanyName(job.company.name);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchJobApi();
  }, [jobId])

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
        input.experienceLevel === "" ||
        input.position === ""
      ) {
        alert("Please fill all fields");
        return;
      }
      setLoading(true);
      const jobData = {
        ...input,
        requirements: Array.isArray(input.requirements)
          ? input.requirements
          : input.requirements
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean)
        ,
        salary: Number(input.salary),
        position: Number(input.position),
        experienceLevel: Number(input.experienceLevel),
      };
      const data = await updateJobApi(jobId, jobData);
      if (data?.success) {
        toast.success(data?.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
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
      <div className="min-h-screen bg-[#f6f9ff] relative overflow-hidden pt-24">

        {/* Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-[420px] bg-gradient-to-br from-[#edf4ff] via-[#f8fbff] to-[#fff7e8]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

          {/* Top Section */}
          <div
            className="
        flex flex-col lg:flex-row
        lg:items-end lg:justify-between
        gap-6
        mb-12
        "
          >

            {/* Left */}
            <div>

              {/* Back */}
              <button
                onClick={() => navigate(-1)}
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
            bg-white/90
            border border-[#e8eefc]
            px-4 py-2
            shadow-sm
            text-sm font-medium text-blue-700
            mb-5
            "
              >
                ✨ Editing Opportunity
              </div>

              {/* Title */}
              <h1
                className="
            text-5xl
            font-black
            tracking-tight
            text-gray-900
            leading-tight
            "
              >
                Edit Job
              </h1>

              <p className="mt-5 text-gray-600 text-base leading-8 max-w-2xl">
                Update hiring details, requirements and company information
                for this opportunity.
              </p>

            </div>

          </div>

          {/* Main Layout */}
          <div
            className="
        grid grid-cols-1 xl:grid-cols-[1fr_320px]
        gap-8
        "
          >

            {/* LEFT FORM */}
            <div
              className="
          bg-white/90
          backdrop-blur-xl
          rounded-[38px]
          border border-white
          shadow-[0_12px_40px_rgba(15,23,42,0.05)]
          p-8 sm:p-10
          "
            >

              <div className="space-y-8">

                {/* Title */}
                <div>

                  <label className="text-sm font-semibold text-gray-700">
                    Job Title
                  </label>

                  <input
                    name="title"
                    value={input.title}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Senior MERN Stack Developer"
                    className="
                w-full mt-3
                h-14
                rounded-2xl
                border border-[#edf2ff]
                bg-[#f9fbff]
                px-5
                text-gray-900
                focus:outline-none
                focus:ring-4 focus:ring-blue-100
                "
                  />

                </div>

                {/* Description */}
                <div>

                  <label className="text-sm font-semibold text-gray-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={input.description}
                    onChange={changeHandler}
                    placeholder="Write a clear overview about responsibilities, skills and expectations..."

                    className="
                w-full mt-3
                h-40
                rounded-2xl
                border border-[#edf2ff]
                bg-[#f9fbff]
                px-5 py-4
                resize-none
                text-gray-900
                focus:outline-none
                focus:ring-4 focus:ring-blue-100
                "
                  />

                </div>

                {/* Requirements */}
                <div>

                  <label className="text-sm font-semibold text-gray-700">
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
                border border-[#edf2ff]
                bg-[#f9fbff]
                px-5
                text-gray-900
                focus:outline-none
                focus:ring-4 focus:ring-blue-100
                "
                  />

                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Salary */}
                  <div>

                    <label className="text-sm font-semibold text-gray-700">
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
                  border border-[#edf2ff]
                  bg-[#f9fbff]
                  px-5
                  focus:outline-none
                  focus:ring-4 focus:ring-blue-100
                  "
                    />

                  </div>

                  {/* Location */}
                  <div>

                    <label className="text-sm font-semibold text-gray-700">
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
                  border border-[#edf2ff]
                  bg-[#f9fbff]
                  px-5
                  focus:outline-none
                  focus:ring-4 focus:ring-blue-100
                  "
                    />

                  </div>

                </div>

                {/* Grid 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Position */}
                  <div>

                    <label className="text-sm font-semibold text-gray-700">
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
                  border border-[#edf2ff]
                  bg-[#f9fbff]
                  px-5
                  focus:outline-none
                  focus:ring-4 focus:ring-blue-100
                  "
                    />

                  </div>

                  {/* Experience */}
                  <div>

                    <label className="text-sm font-semibold text-gray-700">
                      Experience
                    </label>

                    <input
                      name="experienceLevel"
                      value={input.experienceLevel}
                      onChange={changeHandler}
                      type="number"
                      placeholder="2 years"
                      className="
                  w-full mt-3
                  h-14
                  rounded-2xl
                  border border-[#edf2ff]
                  bg-[#f9fbff]
                  px-5
                  focus:outline-none
                  focus:ring-4 focus:ring-blue-100
                  "
                    />

                  </div>

                </div>

                {/* Job Type */}
                <div>

                  <label className="text-sm font-semibold text-gray-700">
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
                border border-[#edf2ff]
                bg-[#f9fbff]
                px-5
                focus:outline-none
                focus:ring-4 focus:ring-blue-100
                "
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                  </select>

                </div>

              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">

              {/* Company Card */}
              <div
                className="
            rounded-[32px]
            bg-white/90
            backdrop-blur-xl
            border border-white
            shadow-[0_12px_40px_rgba(15,23,42,0.05)]
            p-7
            "
              >

                <p className="text-sm font-medium text-gray-500 mb-4">
                  Company
                </p>

                <div
                  className="
              h-14
              rounded-2xl
              bg-[#f4f7ff]
              border border-[#edf2ff]
              px-5
              flex items-center
              text-gray-800 font-medium
              "
                >
                  {companyName}
                </div>

              </div>

              {/* Tips */}
              <div
                className="
            rounded-[32px]
            bg-gradient-to-br from-[#eef4ff] to-[#f8fbff]
            border border-[#dbe7ff]
            p-7
            "
              >

                <h3 className="font-bold text-gray-900 mb-4">
                  Quick Tips
                </h3>

                <ul className="space-y-4 text-sm text-gray-600 leading-7">

                  <li>
                    • Keep the title short and searchable.
                  </li>

                  <li>
                    • Mention exact technologies and tools.
                  </li>

                  <li>
                    • Add clear salary expectations.
                  </li>

                  <li>
                    • Write concise role responsibilities.
                  </li>

                </ul>

              </div>

              {/* Actions */}
              <div className="space-y-3">

                <button
                  onClick={submitHandler}
                  className="
              w-full h-14
              rounded-2xl
              bg-gradient-to-r from-blue-600 to-violet-600
              hover:from-blue-700 hover:to-violet-700
              text-white
              font-medium
              shadow-[0_12px_30px_rgba(59,130,246,0.25)]
              transition-all duration-300
              hover:-translate-y-0.5
              "
                >
                  Save Changes
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="
              w-full h-14
              rounded-2xl
              bg-white
              hover:bg-gray-100
              text-gray-700
              font-medium
              border border-[#edf2ff]
              transition
              "
                >
                  Cancel
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

export default JobEditPage;
