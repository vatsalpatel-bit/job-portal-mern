import React from 'react'

const JobApplicantPage = () => {
  return (
 <div className="min-h-screen bg-gray-50 p-6 mt-16">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-800">Applicants</h2>
      <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow">
        12 Applicants
      </span>
    </div>

    {/* Card */}
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      {/* Table Header */}
      <div className="grid grid-cols-5 px-6 py-3 text-sm text-gray-500 font-medium border-b bg-gray-50">
        <p>Candidate</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Status</p>
        <p className="text-right">Action</p>
      </div>

      {/* Row */}
      <div className="grid grid-cols-5 items-center px-6 py-4 hover:bg-gray-50 transition">
        
        {/* Candidate */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            VP
          </div>
          <div>
            <p className="font-medium text-gray-800">Vatsal Patel</p>
            <p className="text-xs text-gray-400">Frontend Developer</p>
          </div>
        </div>

        {/* Email */}
        <p className="text-gray-600">vatsal@gmail.com</p>

        {/* Phone */}
        <p className="text-gray-600">+91 9999999999</p>

        {/* Status */}
        <span className="w-fit px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
          Pending
        </span>

        {/* Actions */}
        <div className="flex justify-end gap-3 text-sm font-medium">
          <button className="text-blue-600 hover:underline">View</button>
          <button className="text-green-600 hover:underline">Accept</button>
          <button className="text-red-500 hover:underline">Reject</button>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-5 items-center px-6 py-4 hover:bg-gray-50 transition border-t">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
            RS
          </div>
          <div>
            <p className="font-medium text-gray-800">Rahul Sharma</p>
            <p className="text-xs text-gray-400">Backend Developer</p>
          </div>
        </div>

        <p className="text-gray-600">rahul@gmail.com</p>
        <p className="text-gray-600">+91 8888888888</p>

        <span className="w-fit px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
          Accepted
        </span>

        <div className="flex justify-end gap-3 text-sm font-medium">
          <button className="text-blue-600 hover:underline">View</button>
          <button className="text-red-500 hover:underline">Reject</button>
        </div>
      </div>

    </div>
  </div>
</div>
  )
}

export default JobApplicantPage;
