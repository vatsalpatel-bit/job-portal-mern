import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const PrivacyPolicyPage = () => {
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
                                🔒 Legal & Privacy
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
                                Privacy Policy
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
                                Your privacy and data security are important to us.
                                This policy explains how NextWork collects, uses,
                                and protects your information.
                            </p>

                            {/* Last Updated */}
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

                            {/* Intro */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Introduction
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    NextWork is committed to protecting your privacy.
                                    This Privacy Policy explains how we collect,
                                    use and safeguard your information when you
                                    use our platform.
                                </p>

                            </div>

                            {/* Information We Collect */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Information We Collect
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
                                            Personal Information
                                        </h3>

                                        <p className="mt-3 text-gray-600 leading-7">
                                            We may collect your name, email address,
                                            phone number, resume and profile details.
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
                                            Usage Data
                                        </h3>

                                        <p className="mt-3 text-gray-600 leading-7">
                                            We collect information about how users interact
                                            with the platform to improve our services.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* How We Use Data */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    How We Use Your Information
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
                                            ✅
                                        </div>

                                        <p className="text-gray-600 leading-7">
                                            To provide and manage job applications and recruiter services.
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
                                            ✅
                                        </div>

                                        <p className="text-gray-600 leading-7">
                                            To improve user experience and platform performance.
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
                                            ✅
                                        </div>

                                        <p className="text-gray-600 leading-7">
                                            To communicate updates, notifications and support responses.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Data Security */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Data Security
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    We implement modern security practices to protect
                                    your information from unauthorized access,
                                    disclosure or misuse.
                                </p>

                            </div>

                            {/* Cookies */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Cookies & Tracking
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    NextWork may use cookies and similar technologies
                                    to improve functionality, remember preferences,
                                    and analyze platform usage.
                                </p>

                            </div>

                            {/* User Rights */}
                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Your Rights
                                </h2>

                                <p className="mt-6 text-gray-600 leading-8">
                                    You may access, update or delete your account
                                    information at any time through your profile settings.
                                </p>

                            </div>

                            {/* Contact */}
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
                                    Questions About Privacy?
                                </h2>

                                <p className="mt-5 text-blue-100 text-lg leading-8">
                                    If you have questions regarding this Privacy Policy,
                                    feel free to contact our support team.
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

export default PrivacyPolicyPage
