import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { createCompanyApi } from "@/services/companyApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/slices/companiesSlice";
import Footer from "@/components/shared/Footer";
import { Loader2 } from "lucide-react";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    companyName: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => {
      const newError = { ...prev }
      delete newError[name];
      return newError;
    })
  }
  const handleCreateCompany = async () => {
    if (!input.companyName.trim()) return;
    try {
      setLoading(true);
      const { success, company, message } = await createCompanyApi(input.companyName);
      if (!success) {
        return toast.error(message || "Failed to create Company");
      }

      dispatch(setSingleCompany(company));

      toast.success(message || "Company create successfully")

      navigate(`/admin/companies/${company?._id}`)

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
  }

  return (
    <>
      <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative pt-18">

        {/* Background Blur */}
        <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

        <div className="max-w-2xl mx-auto px-6 py-24 relative z-10">

          {/* Hero Card */}
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

            {/* Header */}
            <div className="relative z-10 mb-10">

              {/* Badge */}
              <div
                className="
            inline-flex items-center
            rounded-full
            bg-[#eef4ff]
            px-4 py-2
            text-sm font-medium text-blue-700
            mb-6
            "
              >
                🏢 Company Setup
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
                Your Company Name
              </h1>

              {/* Subtitle */}
              <p className="text-gray-600 mt-5 text-base leading-8 max-w-lg">
                What would you like to call your company?
                You can always change this later.
              </p>

            </div>

            {/* Form Card */}
            <div
              className="
          relative z-10
          rounded-[32px]
          bg-[#f8fbff]
          border border-[#edf2ff]
          p-6 sm:p-7
          "
            >

              {/* Input */}
              <div className="mb-8">

                <Label className="text-sm font-semibold text-gray-700">
                  Company Name
                </Label>

                <Input
                  type="text"
                  name="companyName"
                  value={input.companyName}
                  onChange={changeHandler}
                  placeholder="JobHunt, Microsoft etc."
                  className="
              mt-3 h-14
              rounded-2xl
              border-0
              bg-white
              px-5
              shadow-sm
              focus-visible:ring-2 focus-visible:ring-blue-200
              "
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">
                    {errors.companyName}
                  </p>
                )}


              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4">

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

                {/* Continue */}

                <Button
                  disabled={!input.companyName || loading}
                  onClick={handleCreateCompany}
                  className="
    h-12 px-7
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
                      Creating...
                    </span>
                  ) : (
                    "Continue"
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

export default CreateCompany;