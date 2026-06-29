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
import { Loader2 } from "lucide-react";

const CompanySetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: companyId } = useParams();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  const singleCompany = useSelector(
    (state) => state.company?.singleCompany
  );

  useEffect(() => {
    const fetchComapanyApi = async () => {
      const data = await getCompanyById(companyId)
      dispatch(setSingleCompany(data.company))
    }
    fetchComapanyApi();
  }, [dispatch, companyId])


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setForm({ ...form, logo: files[0] });
    }
    else {
      if (form.name.trim().length == 0) {
        setForm((prev) => ({
          ...prev,
          name: singleCompany?.name || "",
        }))
      }
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => {
        const newError = { ...prev }
        delete newError[name];
        return newError;
      })
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setForm((prev) => ({
        ...prev,
        name: singleCompany?.name || "",
      }))
    }
  }, [singleCompany])

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (form.name) {
        formData.append("name", form.name);
      }

      formData.append("description", form.description);
      formData.append("website", form.website);
      formData.append("location", form.location);

      if (form.logo) {
        formData.append("logo", form.logo);
      }

      const data = await editCompanyApi(companyId, formData)
      dispatch(setSingleCompany(data.company))
      if (data?.success) {
        toast.success(data?.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      const data = error.response?.data;
      if (data?.error) {
        const allErrors = {};

        data.error.forEach((err, index) => {
          allErrors[err.path[0]] = err.message;
          setTimeout(() => {
            toast.error(err.message);
          }, index * 1000);
        });

        setErrors(allErrors);

      } else if (data?.message) {
        toast.error(data?.message);
      }
      else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative pt-24">

        {/* Background Blur */}
        <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">

          {/* Top Header */}
          <div
            className="
        flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-5
        mb-10
        "
          >

            {/* Left */}
            <div>

              {/* Back */}
              <button
                onClick={() => navigate("/admin/companies")}
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

              {/* Heading */}
              <h1
                className="
            text-4xl sm:text-5xl
            font-extrabold
            tracking-tight
            text-gray-900
            "
              >
                Company Setup
              </h1>

              <p className="mt-4 text-gray-600 text-base leading-7 max-w-2xl">
                Configure your company details, branding and public information.
              </p>

            </div>

          </div>

          {/* Main Form Card */}
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

            {/* FORM GRID */}
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
                  placeholder="Enter the company name"
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
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {errors.name}
                  </p>
                )}

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
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description}
                  </p>
                )}

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
                {errors.website && (
                  <p className="text-red-500 text-sm">
                    {errors.website}
                  </p>
                )}
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
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Logo Upload */}
              <div className="md:col-span-2">

                <div
                  className="
              rounded-[28px]
              bg-[#f8fbff]
              border border-[#edf2ff]
              p-6
              "
                >

                  <Label className="text-sm font-semibold text-gray-700">
                    Company Logo
                  </Label>

                  <p className="text-sm text-gray-500 mt-2 mb-5">
                    Upload your company logo to personalize your brand.
                  </p>

                  <Input
                    type="file"
                    name="logo"
                    onChange={handleChange}
                    className="
                border-0
                bg-white
                rounded-2xl
                h-14
                px-4
                shadow-sm
                "
                  />

                </div>

              </div>

              {/* Action Buttons */}
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
                  onClick={() => navigate("/admin/companies")}
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
                  disabled={loading}
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
    disabled:opacity-50
    disabled:pointer-events-none
  "
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
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

export default CompanySetup;