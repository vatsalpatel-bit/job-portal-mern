import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const SecurityPage = () => {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative">

                {/* Background Effects */}
                <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

                <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

                <div className="relative z-10">

                    {/* HERO */}
                    <section className="max-w-6xl mx-auto px-6 pt-28 pb-16">

                        <div className="text-center max-w-4xl mx-auto">

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
                                🛡️ Platform Security
                            </div>

                            {/* Title */}
                            <h1
                                className="
            text-5xl sm:text-6xl
            font-black
            tracking-tight
            text-gray-900
            leading-tight
            "
                            >
                                Security Center
                            </h1>

                            {/* Subtitle */}
                            <p
                                className="
            mt-7
            text-lg
            leading-8
            text-gray-600
            max-w-3xl mx-auto
            "
                            >
                                Your privacy, account safety and data protection are
                                our highest priorities at NextWork.
                            </p>

                        </div>

                    </section>

                    {/* MAIN CONTENT */}
                    <section className="max-w-6xl mx-auto px-6 pb-24">

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

                            {/* LEFT */}
                            <div
                                className="
            rounded-[40px]
            bg-white/80
            backdrop-blur-xl
            border border-white/60
            shadow-[0_10px_40px_rgba(0,0,0,0.05)]
            p-8 sm:p-12
            space-y-14
            "
                            >

                                {/* Overview */}
                                <div>

                                    <h2 className="text-3xl font-bold text-gray-900">
                                        Security Overview
                                    </h2>

                                    <p className="mt-6 text-gray-600 leading-8">
                                        NextWork uses modern technologies and security
                                        practices to keep your personal information,
                                        applications and recruiter data protected.
                                    </p>

                                </div>

                                {/* Features */}
                                <div>

                                    <h2 className="text-3xl font-bold text-gray-900">
                                        Security Features
                                    </h2>

                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                                        {/* Card */}
                                        <div
                                            className="
                  rounded-[28px]
                  bg-[#f9fbff]
                  border border-[#edf2ff]
                  p-7
                  "
                                        >

                                            <div className="text-4xl mb-5">
                                                🔐
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900">
                                                Secure Authentication
                                            </h3>

                                            <p className="mt-4 text-gray-600 leading-7">
                                                Strong authentication systems help keep
                                                user accounts protected.
                                            </p>

                                        </div>

                                        {/* Card */}
                                        <div
                                            className="
                  rounded-[28px]
                  bg-[#f9fbff]
                  border border-[#edf2ff]
                  p-7
                  "
                                        >

                                            <div className="text-4xl mb-5">
                                                🧾
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900">
                                                Data Encryption
                                            </h3>

                                            <p className="mt-4 text-gray-600 leading-7">
                                                Sensitive data is encrypted during transmission
                                                and storage whenever possible.
                                            </p>

                                        </div>

                                        {/* Card */}
                                        <div
                                            className="
                  rounded-[28px]
                  bg-[#f9fbff]
                  border border-[#edf2ff]
                  p-7
                  "
                                        >

                                            <div className="text-4xl mb-5">
                                                ⚡
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900">
                                                Real-Time Monitoring
                                            </h3>

                                            <p className="mt-4 text-gray-600 leading-7">
                                                We monitor unusual activity to prevent
                                                unauthorized access attempts.
                                            </p>

                                        </div>

                                        {/* Card */}
                                        <div
                                            className="
                  rounded-[28px]
                  bg-[#f9fbff]
                  border border-[#edf2ff]
                  p-7
                  "
                                        >

                                            <div className="text-4xl mb-5">
                                                ☁️
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900">
                                                Secure Infrastructure
                                            </h3>

                                            <p className="mt-4 text-gray-600 leading-7">
                                                Our platform uses secure hosting and
                                                protected cloud infrastructure.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                {/* Best Practices */}
                                <div>

                                    <h2 className="text-3xl font-bold text-gray-900">
                                        Account Safety Tips
                                    </h2>

                                    <div className="mt-7 space-y-5">

                                        {/* Item */}
                                        <div className="flex items-start gap-4">

                                            <div
                                                className="
                    h-10 w-10
                    rounded-full
                    bg-[#eef4ff]
                    flex items-center justify-center
                    shrink-0
                    "
                                            >
                                                ✅
                                            </div>

                                            <p className="text-gray-600 leading-7">
                                                Use strong passwords with letters, numbers and symbols.
                                            </p>

                                        </div>

                                        {/* Item */}
                                        <div className="flex items-start gap-4">

                                            <div
                                                className="
                    h-10 w-10
                    rounded-full
                    bg-[#eef4ff]
                    flex items-center justify-center
                    shrink-0
                    "
                                            >
                                                ✅
                                            </div>

                                            <p className="text-gray-600 leading-7">
                                                Never share your account credentials with others.
                                            </p>

                                        </div>

                                        {/* Item */}
                                        <div className="flex items-start gap-4">

                                            <div
                                                className="
                    h-10 w-10
                    rounded-full
                    bg-[#eef4ff]
                    flex items-center justify-center
                    shrink-0
                    "
                                            >
                                                ✅
                                            </div>

                                            <p className="text-gray-600 leading-7">
                                                Keep your profile and contact information updated.
                                            </p>

                                        </div>

                                        {/* Item */}
                                        <div className="flex items-start gap-4">

                                            <div
                                                className="
                    h-10 w-10
                    rounded-full
                    bg-[#eef4ff]
                    flex items-center justify-center
                    shrink-0
                    "
                                            >
                                                ✅
                                            </div>

                                            <p className="text-gray-600 leading-7">
                                                Report suspicious recruiter or applicant activity immediately.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* RIGHT SIDEBAR */}
                            <div className="space-y-7">

                                {/* Status */}
                                <div
                                    className="
              rounded-[32px]
              bg-gradient-to-br
              from-[#eef4ff]
              to-[#fff7ed]
              p-8
              "
                                >

                                    <div
                                        className="
                h-16 w-16
                rounded-2xl
                bg-white
                flex items-center justify-center
                text-3xl
                shadow-sm
                mb-6
                "
                                    >
                                        🛡️
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900">
                                        System Status
                                    </h3>

                                    <p className="mt-4 text-gray-600 leading-7">
                                        All systems are operational and protected.
                                    </p>

                                    <div
                                        className="
                mt-6
                inline-flex items-center
                rounded-full
                bg-[#ecfdf3]
                px-4 py-2
                text-sm font-medium text-green-700
                "
                                    >
                                        ● Secure
                                    </div>

                                </div>

                                {/* Contact */}
                                <div
                                    className="
              rounded-[32px]
              bg-white/80
              backdrop-blur-xl
              border border-white/60
              shadow-sm
              p-8
              "
                                >

                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Security Support
                                    </h3>

                                    <p className="mt-4 text-gray-600 leading-7">
                                        Report suspicious activity or contact our support team.
                                    </p>

                                    <button
                                        className="
                mt-7
                w-full h-12
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-violet-600
                text-white
                font-medium
                hover:from-blue-700
                hover:to-violet-700
                transition-all duration-300
                "
                                    >
                                        Contact Security Team
                                    </button>

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </div>

            <Footer />
        </>
    )
}

export default SecurityPage
