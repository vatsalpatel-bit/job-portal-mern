import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const TermAndConditionPage = () => {
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
                                📜 Legal Agreement
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
                                Terms & Conditions
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
                                Please read these terms carefully before using NextWork.
                                By accessing the platform, you agree to follow these
                                terms and conditions.
                            </p>

                            {/* Updated */}
                            <p className="mt-5 text-sm text-gray-400">
                                Last updated: {new Date().toLocaleDateString("en-IN")}
                            </p>

                        </div>

                    </section>

                    {/* CONTENT */}
                    <section className="max-w-5xl mx-auto px-6 pb-24">

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

                            {/* Introduction */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Introduction
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    These Terms & Conditions govern your use of the NextWork
                                    platform. By creating an account or using our services,
                                    you agree to comply with these terms.
                                </p>

                            </div>

                            {/* User Accounts */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    User Accounts
                                </h2>

                                <div className="mt-7 space-y-5">

                                    <div
                                        className="
                rounded-[28px]
                bg-[#f9fbff]
                border border-[#edf2ff]
                p-6
                "
                                    >

                                        <h3 className="text-xl font-bold text-gray-900">
                                            Account Responsibility
                                        </h3>

                                        <p className="mt-3 text-gray-600 leading-7">
                                            Users are responsible for maintaining the confidentiality
                                            of their account credentials and activities.
                                        </p>

                                    </div>

                                    <div
                                        className="
                rounded-[28px]
                bg-[#f9fbff]
                border border-[#edf2ff]
                p-6
                "
                                    >

                                        <h3 className="text-xl font-bold text-gray-900">
                                            Accurate Information
                                        </h3>

                                        <p className="mt-3 text-gray-600 leading-7">
                                            All users must provide accurate and up-to-date information
                                            while using the platform.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Platform Usage */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Acceptable Use
                                </h2>

                                <div className="mt-6 space-y-4">

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
                                            ✔️
                                        </div>

                                        <p className="text-gray-600 leading-7">
                                            Users must not post false, misleading or illegal content.
                                        </p>

                                    </div>

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
                                            ✔️
                                        </div>

                                        <p className="text-gray-600 leading-7">
                                            Recruiters must provide legitimate job opportunities.
                                        </p>

                                    </div>

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
                                            ✔️
                                        </div>

                                        <p className="text-gray-600 leading-7">
                                            Users may not misuse or attempt to disrupt platform services.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Recruiters */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Recruiter Responsibilities
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    Recruiters are responsible for ensuring that job listings,
                                    hiring processes and communication with applicants remain
                                    professional and lawful.
                                </p>

                            </div>

                            {/* Intellectual Property */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Intellectual Property
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    All branding, design elements and platform content
                                    are the intellectual property of NextWork and may
                                    not be copied or reused without permission.
                                </p>

                            </div>

                            {/* Limitation */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Limitation of Liability
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    NextWork is not responsible for employment decisions,
                                    hiring outcomes or third-party actions occurring through
                                    the platform.
                                </p>

                            </div>

                            {/* Account Suspension */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Account Suspension
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    We reserve the right to suspend or terminate accounts
                                    that violate these Terms & Conditions or misuse the platform.
                                </p>

                            </div>

                            {/* Updates */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Changes to Terms
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    NextWork may update these terms periodically.
                                    Continued use of the platform indicates acceptance
                                    of any updated terms.
                                </p>

                            </div>

                            {/* CTA */}
                            <div
                                className="
            rounded-[32px]
            bg-gradient-to-r
            from-blue-600
            to-violet-600
            p-10
            text-white
            "
                            >

                                <h2 className="text-3xl font-black">
                                    Need More Information?
                                </h2>

                                <p className="mt-5 text-blue-100 text-lg leading-8">
                                    Contact our support team if you have questions
                                    about these Terms & Conditions.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 mt-8">

                                    <button
                                        className="
                h-12 px-7
                rounded-2xl
                bg-white
                text-gray-900
                font-medium
                hover:bg-gray-100
                transition
                "
                                    >
                                        Contact Support
                                    </button>

                                    <button
                                        className="
                h-12 px-7
                rounded-2xl
                border border-white/30
                bg-white/10
                backdrop-blur-xl
                text-white
                font-medium
                hover:bg-white/20
                transition
                "
                                    >
                                        Email Us
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

export default TermAndConditionPage
