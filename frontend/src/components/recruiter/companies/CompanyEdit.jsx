import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { editCompanyApi, getCompanyById } from "@/services/companyApi";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/redux/slices/companiesSlice";
import { toast } from "sonner";
import Footer from "@/components/shared/Footer";

const CompanyEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: companyId } = useParams();
    const [loading, setLoading] = useState(true);
    const singleCompany = useSelector(
        (state) => state.company.singleCompany
    );

    const [form, setForm] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        logo: null,
    });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (singleCompany) {
            setForm({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                logo: singleCompany.logo || null,
            })

        }
    }, [singleCompany])

    useEffect(() => {
        const fetchCompanyApi = async () => {
            try {
                setLoading(true);
                const data = await getCompanyById(companyId);
                dispatch(setSingleCompany(data.company))
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }

        }
        fetchCompanyApi();
    }, [companyId, dispatch])

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "logo") {
            const file = files[0];
            setForm({ ...form, logo: files[0] });
            setPreview(URL.createObjectURL(file));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("website", form.website);
            formData.append("location", form.location);

            if (form.logo) {
                formData.append("logo", form.logo);
            }

            const data = await editCompanyApi(companyId, formData);
            if (data?.success) {
                toast.success(data?.message)
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false)
        }
    };
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
  <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative pt-18">

    {/* Background Blur */}
    <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

    <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

    <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">

      {/* Header */}
      <div className="mb-10">

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
          mb-6
          "
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Heading */}
        <h1
          className="
          text-4xl sm:text-5xl
          font-extrabold
          tracking-tight
          text-gray-900
          "
        >
          Edit Company
        </h1>

        <p className="mt-4 text-gray-600 text-base leading-7 max-w-2xl">
          Update your company information, branding and business details.
        </p>

      </div>

      {/* Main Card */}
      <div
        className="
        relative overflow-hidden
        rounded-[40px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        p-8 sm:p-10
        "
      >

        {/* Glow */}
        <div className="absolute top-[-100px] right-[-80px] h-[240px] w-[240px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        {/* Badge */}
        <div
          className="
          relative z-10
          inline-flex items-center
          rounded-full
          bg-[#eef4ff]
          px-4 py-2
          text-sm font-medium text-blue-700
          mb-8
          "
        >
          🏢 Company Information
        </div>

        {/* Form Grid */}
        <div
          className="
          relative z-10
          grid grid-cols-1 md:grid-cols-2
          gap-6
          "
        >

          {/* Company Name */}
          <div>

            <Label className="text-sm font-semibold text-gray-700">
              Company Name
            </Label>

            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={singleCompany?.name}
              className="
              mt-3 h-14
              rounded-2xl
              border-0
              bg-[#f8fbff]
              px-5
              placeholder:text-gray-400
              shadow-none
              focus-visible:ring-2 focus-visible:ring-blue-200
              "
            />

          </div>

          {/* Description */}
          <div>

            <Label className="text-sm font-semibold text-gray-700">
              Description
            </Label>

            <Input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="
              mt-3 h-14
              rounded-2xl
              border-0
              bg-[#f8fbff]
              px-5
              shadow-none
              focus-visible:ring-2 focus-visible:ring-blue-200
              "
            />

          </div>

          {/* Website */}
          <div>

            <Label className="text-sm font-semibold text-gray-700">
              Website
            </Label>

            <Input
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://company.com"
              className="
              mt-3 h-14
              rounded-2xl
              border-0
              bg-[#f8fbff]
              px-5
              shadow-none
              focus-visible:ring-2 focus-visible:ring-blue-200
              "
            />

          </div>

          {/* Location */}
          <div>

            <Label className="text-sm font-semibold text-gray-700">
              Location
            </Label>

            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="
              mt-3 h-14
              rounded-2xl
              border-0
              bg-[#f8fbff]
              px-5
              shadow-none
              focus-visible:ring-2 focus-visible:ring-blue-200
              "
            />

          </div>

          {/* Logo Upload */}
          <div className="md:col-span-2">

            <div
              className="
              rounded-[30px]
              bg-[#f8fbff]
              border border-[#edf2ff]
              p-6
              "
            >

              <div
                className="
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-6
                "
              >

                {/* Left */}
                <div className="flex items-center gap-5">

                  {/* Preview */}
                  <div
                    className="
                    h-20 w-20
                    rounded-3xl
                    bg-white
                    border border-[#edf2ff]
                    overflow-hidden
                    shadow-sm
                    "
                  >

                    <img
                      src={preview || singleCompany?.logo}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* Text */}
                  <div>

                    <h3 className="font-semibold text-gray-900">
                      Company Logo
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 leading-6">
                      Upload a clean square logo for better branding.
                    </p>

                  </div>

                </div>

                {/* Upload */}
                <div>

                  {/* Hidden Input */}
                  <input
                    type="file"
                    name="logo"
                    id="logoUpload"
                    className="hidden"
                    onChange={handleChange}
                  />

                  {/* Custom Button */}
                  <label
                    htmlFor="logoUpload"
                    className="
                    inline-flex items-center justify-center
                    h-12 px-6
                    rounded-2xl
                    bg-white
                    hover:bg-black
                    hover:text-white
                    text-sm font-medium text-gray-700
                    shadow-sm
                    cursor-pointer
                    transition-all duration-300
                    "
                  >
                    Change Logo
                  </label>

                </div>

              </div>

            </div>

          </div>

          {/* Buttons */}
          <div
            className="
            md:col-span-2
            flex flex-col sm:flex-row
            justify-end gap-4
            pt-4
            "
          >

            {/* Cancel */}
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="
              h-12 px-6
              rounded-2xl
              border-0
              bg-white
              hover:bg-gray-100
              text-gray-700
              shadow-sm
              "
            >
              Cancel
            </Button>

            {/* Save */}
            <Button
              onClick={handleSubmit}
              className="
              h-12 px-8
              rounded-2xl
              bg-gradient-to-r from-blue-600 to-violet-600
              hover:from-blue-700 hover:to-violet-700
              text-white
              font-medium
              shadow-[0_10px_25px_rgba(59,130,246,0.25)]
              transition-all duration-300
              hover:-translate-y-0.5
              "
            >
              Save Changes
            </Button>

          </div>

        </div>

      </div>

    </div>

  </div>

  <Footer />

</>
    );
};

export default CompanyEdit;