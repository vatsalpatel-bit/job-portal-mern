import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { createCompanyApi } from "@/services/companyApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/slices/companiesSlice";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setName] = useState("");

  const handleCreateCompany = async () => {
    if (!companyName.trim()) return;
    try {
      const { success, company, message } = await createCompanyApi(companyName);
      if (!success) {
        return toast.error(message || "Failed to create Company");
      }

      dispatch(setSingleCompany(company));

      toast.success(message || "Company create successfully")

      navigate(`/admin/companies/${company?._id}`)

    } catch (error) {
      console.error(error);
      const errorMessage = error?.res?.data?.message;
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">
            Your Company Name
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">

          {/* Input */}
          <div className="mb-6">
            <Label className="text-sm font-medium">
              Company Name
            </Label>
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setName(e.target.value)}
              placeholder="JobHunt, Microsoft etc."
              className="mt-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}   // TRy
            >
              Cancel
            </Button>

            <Button
              disabled={!companyName}     // check 
              onClick={handleCreateCompany}
            >
              Continue
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateCompany;