import React from 'react'

const JobViewPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6 mt-16">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Job Details</h1>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border rounded-md">Edit</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md">
                            Delete
                        </button>
                    </div>
                </div>

                {/* Top Card */}
                <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Frontend Developer</h2>
                        <p className="text-gray-500 mt-1">TCS • Bangalore, India</p>
                        <p className="text-sm text-gray-400 mt-1">Posted on 20 May</p>
                    </div>

                    <div className="bg-green-100 px-6 py-4 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Salary</p>
                        <p className="text-xl font-semibold text-green-600">₹ 8,00,000</p>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-2 gap-6">

                    {/* Description */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold mb-2">Job Description</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            We are looking for a skilled developer to build scalable apps...
                        </p>
                    </div>

                    {/* Overview */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold mb-3">Job Overview</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Job Type:</strong> Full-Time</p>
                            <p><strong>Position:</strong> 2</p>
                            <p><strong>Experience:</strong> 2 Years</p>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold mb-3">Requirements</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                            <li>React.js</li>
                            <li>Node.js</li>
                            <li>MongoDB</li>
                        </ul>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold mb-3">Additional Info</h3>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p><strong>Posted By:</strong> TCS</p>
                            <p><strong>Date:</strong> 20 May 2024</p>
                        </div>
                    </div>

                </div>

                {/* Location */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="text-gray-600">Bangalore, India</p>
                </div>

            </div>
        </div>
    )
}

export default JobViewPage
