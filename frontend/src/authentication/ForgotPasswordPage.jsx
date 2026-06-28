import React, { useState } from 'react'
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { forgotPasswordApi } from '@/services/authApi';
import { toast } from 'sonner';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await forgotPasswordApi(email);
            toast.success(
                data?.message ||
                "Reset link sent successfully"
            );
            setLoading(true);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center px-6 overflow-hidden relative pt-24">

                {/* Background Blur */}
                <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

                <div className="absolute right-[-100px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

                {/* Main Card */}
                <div
                    className="
      relative z-10
      w-full max-w-xl
      rounded-[36px]
      border border-white/60
      bg-white/80
      backdrop-blur-xl
      shadow-[0_10px_40px_rgba(0,0,0,0.05)]
      p-8 sm:p-12
      "
                >

                    {/* Header */}
                    <div className="text-center mb-10">

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
                            🔒 Password Recovery
                        </div>

                        {/* Title */}
                        <h1
                            className="
          text-4xl sm:text-5xl
          font-extrabold
          tracking-tight
          text-gray-900
          "
                        >
                            Forgot Password?
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-5 text-gray-600 leading-7 max-w-md mx-auto">
                            Enter your registered email address and we’ll send
                            you a password reset link.
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6">


                        {/* Email */}
                        <div className="space-y-3">

                            <label className="text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="patel@gmail.com"
                                className="
            h-14
            rounded-2xl
            border-0
            bg-[#f8fbff]
            px-5
            shadow-none
            focus-visible:ring-2 focus-visible:ring-blue-200
            "
                            />

                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="
    w-full h-14
    rounded-2xl
    bg-gradient-to-r from-blue-600 to-violet-600
    hover:from-blue-700 hover:to-violet-700
    text-white
    text-base font-semibold
    shadow-[0_10px_30px_rgba(59,130,246,0.25)]
    transition-all duration-300
    hover:-translate-y-0.5
    disabled:opacity-70
    disabled:cursor-not-allowed
    disabled:hover:translate-y-0
  "
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Sending...
                                </div>
                            ) : (
                                "Send Reset Link"
                            )}
                        </Button>
                        {/* Back */}
                        <div className="text-center pt-2">

                            <Link
                                to="/login"
                                className="
            text-sm font-medium
            text-gray-500
            hover:text-blue-600
            transition-all duration-300
            "
                            >
                                ← Back to Login
                            </Link>

                        </div>

                    </form>

                    {/* Bottom Info */}
                    <div
                        className="
        mt-10
        rounded-2xl
        bg-[#eef4ff]
        border border-blue-100
        px-5 py-4
        "
                    >

                        <div className="flex items-start gap-3">

                            <div className="text-lg">
                                ℹ️
                            </div>

                            <div>

                                <p className="text-sm font-semibold text-blue-900">
                                    Didn’t receive the email?
                                </p>

                                <p className="text-sm text-blue-700 mt-1 leading-6">
                                    Check your spam folder or try again after a few minutes.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    )
}

export default ForgotPasswordPage
