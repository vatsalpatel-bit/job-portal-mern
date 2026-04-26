import React from 'react'

const JobApplicantPage = () => {
  return (
   <div className="min-h-screen bg-gray-50 p-6 mt-16">
  <div className="max-w-6xl mx-auto space-y-6">

    {/* Header */}
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800">
        Applicants
      </h2>

      <div className="flex items-center gap-3">
        <input
          placeholder="Search..."
          className="px-3 py-1.5 text-sm border rounded-md focus:outline-none"
        />

        <span className="text-xs bg-white border px-3 py-1 rounded-full text-gray-600">
          12 Applicants
        </span>
      </div>
    </div>

    {/* Cards */}
    <div className="space-y-4">

      {/* Applicant Card */}
      <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">

        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              VP
            </div>

            {/* Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Vatsal Patel
              </h3>
              <p className="text-xs text-gray-400">
                Frontend Developer
              </p>

              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>📧 vatsal@gmail.com</span>
                <span>📞 +91 9999999999</span>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* Status */}
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
              Pending
            </span>

            {/* Actions */}
            <div className="flex items-center gap-2">

              <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                View
              </button>

              <button className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-md hover:bg-green-100">
                Accept
              </button>

              <button className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                Reject
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Card 2 */}
      <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
              RS
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Rahul Sharma
              </h3>
              <p className="text-xs text-gray-400">
                Backend Developer
              </p>

              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>📧 rahul@gmail.com</span>
                <span>📞 +91 8888888888</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">

            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              Accepted
            </span>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                View
              </button>

              <button className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                Reject
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</div>
  )
}

export default JobApplicantPage;
