import { setSingleCompany } from '@/redux/slices/companiesSlice';
import { getCompanyById } from '@/services/companyApi';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CompanyDetialPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: companyId } = useParams();
    const company = useSelector((state) => state.company.singleCompany)
    useEffect(() => {
        const fetchCompanyApi = async () => {
            const data = await getCompanyById(companyId);
            console.log(data);
            dispatch(setSingleCompany(data.company))
        }
        fetchCompanyApi();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
            <div className="max-w-4xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-black"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={() => navigate(`/admin/company/${company._id}/edit`)}
                        className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
                    >
                        Edit
                    </button>
                </div>

                {/* Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">

                    {/* Top section */}
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src={company?.logo}
                            alt="logo"
                            className="w-16 h-16 rounded-lg object-cover border"
                        />

                        <div>
                            <h1 className="text-2xl font-semibold">
                                {company?.name}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                {company?.description}
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="mb-6" />

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Website */}
                        <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <p className="font-medium">{company?.website}</p>
                        </div>

                        {/* Location */}
                        <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{company?.location}</p>
                        </div>

                        {/* Created Date */}
                        <div>
                            <p className="text-sm text-gray-500">Created</p>
                            <p className="font-medium">
                                {new Date(company?.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDetialPage
