import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { editCompanyApi, getCompanyById } from "@/services/companyApi";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/redux/slices/companiesSlice";

const CompanyEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: companyId } = useParams();
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
            const data = await getCompanyById(companyId);
            dispatch(setSingleCompany(data.company))
        }
        fetchCompanyApi();
    }, [])

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
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const data = await editCompanyApi(companyId, formData);
            if (data?.success) {
                navigate("/admin/companies");
            }
        } catch (error) {

        }
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-gray-600 hover:text-black"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                </div>

                {/* Form */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Company Name */}
                    <div>
                        <Label>Company Name</Label>
                        <Input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder={singleCompany?.name}
                            className="mt-2 placeholder-gray-900"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label>Description</Label>
                        <Input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="mt-2"
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <Label>Website</Label>
                        <Input
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            placeholder="Enter website"
                            className="mt-2"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <Label>Location</Label>
                        <Input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Enter location"
                            className="mt-2"
                        />
                    </div>

                    {/* Logo (Full width) */}
                    <div className="space-y-2">

                        {/* Current Logo */}
                        <div className="flex items-center gap-4">

                            {/* Image Preview */}
                            <img
                                src={preview || singleCompany?.logo}
                                alt="logo"
                                className="w-16 h-16 rounded-lg object-cover border"
                            />

                            {/* Hidden file input */}
                            <input
                                type="file"
                                name="logo"
                                id="logoUpload"
                                className="hidden"
                                onChange={handleChange}
                            />

                            {/* Custom button */}
                            <label
                                htmlFor="logoUpload"
                                className="px-4 py-2  hover: rounded-md cursor-pointer text-sm font-medium"
                            >
                                Change Logo
                            </label>


                        </div>


                    </div>
                    {/* Button */}
                    <div className="md:col-span-2 flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            disabled={!handleSubmit}
                            className="w-full md:w-auto px-8"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyEdit;