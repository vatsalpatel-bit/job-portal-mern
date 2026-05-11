import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const AboutUsPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <>
                <Navbar />

                <div className="min-h-screen bg-[#f8fbff] overflow-hidden relative">

                    {/* Background Blur */}
                    <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

                    <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

                    <div className="relative z-10">

                        {/* HERO */}
                        <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">

                            <div className="text-center max-w-4xl mx-auto">

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
                                    ✨ About NextWork
                                </div>

                                <h1
                                    className="
            text-5xl sm:text-6xl
            font-black
            tracking-tight
            text-gray-900
            leading-tight
            "
                                >
                                    Building Careers <br />
                                    With Modern Hiring
                                </h1>

                                <p
                                    className="
            mt-7
            text-lg
            leading-8
            text-gray-600
            max-w-3xl mx-auto
            "
                                >
                                    NextWork helps students, professionals, and recruiters
                                    connect faster with a modern hiring experience.
                                </p>

                            </div>

                        </section>

                        {/* STORY */}
                        <section className="max-w-7xl mx-auto px-6 py-10">

                            <div
                                className="
          rounded-[40px]
          bg-white/80
          backdrop-blur-xl
          border border-white/60
          shadow-[0_10px_40px_rgba(0,0,0,0.05)]
          p-10 lg:p-14
          "
                            >

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                                    {/* Left */}
                                    <div>

                                        <h2 className="text-4xl font-bold text-gray-900">
                                            Our Mission
                                        </h2>

                                        <p className="mt-6 text-gray-600 leading-8">
                                            We believe finding jobs should feel simple,
                                            modern, and transparent.
                                        </p>

                                        <p className="mt-4 text-gray-600 leading-8">
                                            NextWork was built to help candidates discover
                                            opportunities and help recruiters hire quality talent
                                            faster with better workflows.
                                        </p>

                                    </div>

                                    {/* Right */}
                                    <div
                                        className="
              rounded-[32px]
              bg-gradient-to-br
              from-[#eef4ff]
              to-[#fff7ed]
              p-10
              "
                                    >

                                        <div className="grid grid-cols-2 gap-6">

                                            <div>
                                                <h3 className="text-4xl font-black text-gray-900">
                                                    10K+
                                                </h3>

                                                <p className="mt-2 text-gray-600">
                                                    Active Users
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-4xl font-black text-gray-900">
                                                    500+
                                                </h3>

                                                <p className="mt-2 text-gray-600">
                                                    Companies
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-4xl font-black text-gray-900">
                                                    20K+
                                                </h3>

                                                <p className="mt-2 text-gray-600">
                                                    Applications
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-4xl font-black text-gray-900">
                                                    95%
                                                </h3>

                                                <p className="mt-2 text-gray-600">
                                                    Satisfaction
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* FEATURES */}
                        <section className="max-w-7xl mx-auto px-6 py-20">

                            <div className="text-center mb-14">

                                <h2 className="text-4xl font-bold text-gray-900">
                                    Why Choose NextWork
                                </h2>

                                <p className="mt-4 text-gray-600">
                                    Everything you need in one platform.
                                </p>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">

                                {/* Card */}
                                <div className="rounded-[32px] bg-white p-8 shadow-sm">
                                    <div className="text-4xl mb-5">⚡</div>

                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Fast Hiring
                                    </h3>

                                    <p className="mt-4 text-gray-600 leading-7">
                                        Recruiters can manage applications quickly and efficiently.
                                    </p>
                                </div>

                                <div className="rounded-[32px] bg-white p-8 shadow-sm">
                                    <div className="text-4xl mb-5">🎯</div>

                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Smart Matching
                                    </h3>

                                    <p className="mt-4 text-gray-600 leading-7">
                                        Find jobs that match your skills and interests.
                                    </p>
                                </div>

                                <div className="rounded-[32px] bg-white p-8 shadow-sm">
                                    <div className="text-4xl mb-5">🚀</div>

                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Modern Experience
                                    </h3>

                                    <p className="mt-4 text-gray-600 leading-7">
                                        Premium UI with smooth and responsive workflows.
                                    </p>
                                </div>

                            </div>

                        </section>

                        {/* CTA */}
                        <section className="max-w-7xl mx-auto px-6 pb-24">

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
                                    Start Your Career Journey Today
                                </h2>

                                <p className="mt-5 text-blue-100 text-lg">
                                    Join thousands of candidates and recruiters using NextWork.
                                </p>

                                <button
                                onClick={()=>navigate("/")}
                                    className="
            mt-8
            h-12 px-7
            rounded-2xl
            bg-white
            text-gray-900
            font-medium
            hover:bg-gray-100
            transition
            "
                                >
                                    Explore Jobs
                                </button>

                            </div>

                        </section>

                    </div>

                </div>

                <Footer />
            </>
        </div>
    )
}

export default AboutUsPage
