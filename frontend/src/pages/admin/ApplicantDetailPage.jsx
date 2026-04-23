import React from 'react'

const ApplicantDetailPage = () => {
  return (
   <div className="min-h-screen bg-gray-50 p-6 mt-16">
  <div className="max-w-5xl mx-auto space-y-6">

    {/* Header */}
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">
        Applicant Details
      </h1>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Accept
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Reject
        </button>
      </div>
    </div>

    {/* Profile Card */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center gap-5">

      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-semibold">
        VP
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          Vatsal Patel
        </h2>
        <p className="text-gray-500 text-sm">Frontend Developer</p>

        <div className="flex gap-6 mt-2 text-sm text-gray-600">
          <span>📧 vatsal@gmail.com</span>
          <span>📞 +91 9999999999</span>
          <span>📍 Vadodara, India</span>
        </div>
      </div>

      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
        Pending
      </span>
    </div>

    {/* Grid Section */}
    <div className="grid grid-cols-2 gap-6">

      {/* About */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h3 className="font-semibold text-gray-800 mb-2">About</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Passionate frontend developer with experience in building modern web
          applications using React and Tailwind CSS.
        </p>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h3 className="font-semibold text-gray-800 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
            React
          </span>
          <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
            Node.js
          </span>
          <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
            MongoDB
          </span>
        </div>
      </div>

    </div>

    {/* Resume Section */}
    <div className="bg-white rounded-2xl shadow-sm border p-5">

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Resume</h3>

        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          Download
        </button>
      </div>

      {/* Resume Preview */}
      <div className="border rounded-lg h-[400px] flex items-center justify-center bg-gray-100 text-gray-500">
        Resume Preview (PDF / Image)
      </div>

    </div>

  </div>
</div>
  )
}

export default ApplicantDetailPage
