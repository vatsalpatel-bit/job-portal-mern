import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const HelpCenterPage = () => {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative">

                {/* Background Effects */}
                <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

                <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

                <div className="relative z-10">

                    {/* HERO */}
                    <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">

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
                                💬 Support Center
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
                                Help Center
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
                                Find answers, manage your account, and get support
                                for candidates and recruiters.
                            </p>

                            {/* Search */}
                            <div
                                className="
            mt-10
            max-w-2xl mx-auto
            flex items-center
            rounded-[28px]
            bg-white
            shadow-[0_10px_40px_rgba(0,0,0,0.05)]
            p-2
            "
                            >

                                <input
                                    type="text"
                                    placeholder="Search help articles..."
                                    className="
              flex-1
              h-14
              bg-transparent
              px-5
              outline-none
              text-gray-700
              "
                                />

                                <button
                                    className="
              h-14 px-7
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
                                    Search
                                </button>

                            </div>

                        </div>

                    </section>

                    {/* HELP CATEGORIES */}
                    <section className="max-w-7xl mx-auto px-6 pb-10">

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

                            {/* Card */}
                            <div
                                className="
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            border border-white/60
            shadow-sm
            p-8
            hover:-translate-y-1
            transition-all duration-300
            "
                            >

                                <div className="text-5xl mb-6">
                                    👤
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900">
                                    Account
                                </h3>

                                <p className="mt-4 text-gray-600 leading-7">
                                    Manage profile settings, passwords and security.
                                </p>

                            </div>

                            {/* Card */}
                            <div
                                className="
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            border border-white/60
            shadow-sm
            p-8
            hover:-translate-y-1
            transition-all duration-300
            "
                            >

                                <div className="text-5xl mb-6">
                                    💼
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900">
                                    Jobs
                                </h3>

                                <p className="mt-4 text-gray-600 leading-7">
                                    Learn how to apply, manage and track jobs.
                                </p>

                            </div>

                            {/* Card */}
                            <div
                                className="
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            border border-white/60
            shadow-sm
            p-8
            hover:-translate-y-1
            transition-all duration-300
            "
                            >

                                <div className="text-5xl mb-6">
                                    🏢
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900">
                                    Recruiters
                                </h3>

                                <p className="mt-4 text-gray-600 leading-7">
                                    Help for posting jobs and managing applicants.
                                </p>

                            </div>

                            {/* Card */}
                            <div
                                className="
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            border border-white/60
            shadow-sm
            p-8
            hover:-translate-y-1
            transition-all duration-300
            "
                            >

                                <div className="text-5xl mb-6">
                                    ⚙️
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900">
                                    Settings
                                </h3>

                                <p className="mt-4 text-gray-600 leading-7">
                                    Configure notifications and preferences.
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* FAQ */}
                    <section className="max-w-5xl mx-auto px-6 py-20">

                        <div className="text-center mb-14">

                            <h2 className="text-4xl font-bold text-gray-900">
                                Frequently Asked Questions
                            </h2>

                            <p className="mt-4 text-gray-600">
                                Common questions from users and recruiters.
                            </p>

                        </div>

                        <div className="space-y-5">

                            {/* FAQ */}
                            <div
                                className="
            rounded-[28px]
            bg-white/80
            backdrop-blur-xl
            border border-white/60
            shadow-sm
            p-7
            "
                            >

                                <h3 className="text-xl font-bold text-gray-900">
                                    How do I apply for jobs?
                                </h3>

                                <p className="mt-4 text-gray-600 leading-7">
                                    Browse jobs from the Explore page and click
                                    on Apply Now to submit your application.
                                </p>

                            </div>

                            {/* FAQ */}
                            <div
                                className="
            rounded-[28px]
            bg-white/80
            backdrop-blur-xl
            border border-white/60
            shadow-sm
            p-7
            "
                            >

                                <h3 className="text-xl font-bold text-gray-900">
                                    How can recruiters post jobs?
                                </h3>

                                <p className="mt-4 text-gray-600 leading-7">
                                    Recruiters can create companies and publish jobs
                                    directly from their dashboard.
                                </p>

                            </div>

                            {/* FAQ */}
                            <div
                                className="
            rounded-[28px]
            bg-white/80
            backdrop-blur-xl
            border border-white/60
            shadow-sm
            p-7
            "
                            >

                                <h3 className="text-xl font-bold text-gray-900">
                                    Can I update my profile later?
                                </h3>

                                <p className="mt-4 text-gray-600 leading-7">
                                    Yes. You can edit your profile, skills and resume anytime.
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* CONTACT */}
                    <section className="max-w-6xl mx-auto px-6 pb-24">

                        <div
                            className="
          rounded-[40px]
          bg-gradient-to-r
          from-blue-600
          to-violet-600
          p-12
          text-center
          text-white
          "
                        >

                            <h2 className="text-4xl font-black">
                                Still Need Help?
                            </h2>

                            <p className="mt-5 text-blue-100 text-lg">
                                Contact our support team for quick assistance.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">

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

                    </section>

                </div>

            </div>

            <Footer />
        </>
    )
}

export default HelpCenterPage
