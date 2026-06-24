import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/authslice";
import { signupUser, loginUser } from "@/services/authApi";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  provider
} from "@/utils/firebase"
import { googleAuthenticationApi } from "@/services/authApi";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => {
      const newError = { ...prev };
      delete newError[name];
      return newError;
    })
  };

  const fileHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleGoogleSignup = async () => {

    try {

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user = result.user;

      const data = await googleAuthenticationApi(user);

      dispatch(setUser(data.user));
      navigate("/")

    } catch (error) {

      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    dispatch(setLoading(true));

    try {
      /* SIGNUP */
      const formData = new FormData();
      formData.append("fullname", input.fullname.trim());
      formData.append("email", input.email.trim().toLowerCase());
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role.toLowerCase());
      if (input.file) formData.append("file", input.file);

      const data = await signupUser(formData);
      console.log(data);
      /* SET COOKE */
      const loginRes = await loginUser({
        email: input.email.trim().toLowerCase(),
        password: input.password,
        role: input.role.toLowerCase(),
      });


      dispatch(setUser(loginRes.data.user));

      toast.success("Welcome 🎉 Account created successfully!");
      navigate("/");

    } catch (error) {
      const data = error.response?.data;
      if (data?.error) {
        const allErrors = {};

        data.error.forEach((err, index) => {
          allErrors[err.path[0]] = err.message;
          setTimeout(() => {
            toast.error(err.message);
          }, index * 1000);
        });

        setErrors(allErrors);

      } else if (data?.message) {
        toast.error(data?.message);
      }
      else {
        toast.error("Something went wrong");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center px-6 py-45 overflow-hidden relative">

        {/* Background Blur */}
        <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        <div className="absolute right-[-100px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

        {/* Main Container */}
        <div
          className="
      relative z-10
      grid grid-cols-1 lg:grid-cols-2
      max-w-6xl w-full
      rounded-[40px]
      overflow-hidden
      border border-white/60
      bg-white/80
      backdrop-blur-xl
      shadow-[0_10px_40px_rgba(0,0,0,0.05)]
      "
        >

          {/* LEFT PANEL */}
          <div
            className="
        relative overflow-hidden
        bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]
        text-white
        p-10 sm:p-14
        flex flex-col justify-between
        "
          >

            {/* Glow */}
            <div className="absolute top-[-80px] right-[-60px] h-[240px] w-[240px] rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute bottom-[-100px] left-[-80px] h-[260px] w-[260px] rounded-full bg-violet-500/20 blur-3xl" />

            {/* Top */}
            <div className="relative z-10">

              {/* Badge */}
              <div
                className="
            inline-flex items-center
            rounded-full
            bg-white/10
            border border-white/10
            px-4 py-2
            text-sm font-medium
            backdrop-blur-md
            mb-8
            "
              >
                🚀 Join NextWork
              </div>

              {/* Logo */}
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                NextWork
              </h1>
              {/* <img
                    src={brandLogo}
                    className="text-4xl sm:text-5xl font-extrabold tracking-tight"
                  /> */}

              {/* Subtitle */}
              <p className="mt-6 text-base sm:text-lg leading-8 text-gray-300 max-w-md">
                Build your career or hire top talent with a modern hiring platform
                designed for the next generation.
              </p>

            </div>

            {/* Bottom Features */}
            <div className="relative z-10 mt-16 space-y-5">

              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center">
                  💼
                </div>

                <div>
                  <h4 className="font-semibold">
                    Verified Jobs
                  </h4>

                  <p className="text-sm text-gray-400">
                    Discover curated opportunities
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center">
                  ⚡
                </div>

                <div>
                  <h4 className="font-semibold">
                    Fast Applications
                  </h4>

                  <p className="text-sm text-gray-400">
                    Apply in just a few clicks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center">
                  🌍
                </div>

                <div>
                  <h4 className="font-semibold">
                    Top Recruiters
                  </h4>

                  <p className="text-sm text-gray-400">
                    Connect with leading companies
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="p-8 sm:p-12 lg:p-14 bg-white/70 backdrop-blur-xl">

            {/* Heading */}
            <div className="mb-10">

              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Create Account
              </h2>

              <p className="mt-3 text-gray-600 leading-7">
                Start your journey with Execoore today.
              </p>

            </div>

            {/* FORM */}
            <form onSubmit={submitHandler} className="space-y-5">

              {/* Full Name */}
              <Input
                name="fullname"
                placeholder="Full Name"
                value={input.fullname}
                onChange={changeHandler}
                required
                className="
            h-14
            rounded-2xl
            border-0
            bg-[#f8fbff]
            px-5
            focus-visible:ring-2 focus-visible:ring-blue-200
            "
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">
                  {errors.fullname}
                </p>
              )}

              {/* Email */}
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={input.email}
                onChange={changeHandler}
                required
                className="
            h-14
            rounded-2xl
            border-0
            bg-[#f8fbff]
            px-5
            focus-visible:ring-2 focus-visible:ring-blue-200
            "
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}

              {/* Phone */}
              <Input
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                value={input.phoneNumber}
                onChange={changeHandler}
                required
                className="
            h-14
            rounded-2xl
            border-0
            bg-[#f8fbff]
            px-5
            focus-visible:ring-2 focus-visible:ring-blue-200
            "
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber}
                </p>
              )}

              {/* Password */}
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={input.password}
                onChange={changeHandler}
                autoComplete="new-password"
                required
                className="
            h-14
            rounded-2xl
            border-0
            bg-[#f8fbff]
            px-5
            focus-visible:ring-2 focus-visible:ring-blue-200
            "
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>
              )}

              {/* Forgot Password */}
              <div className="flex items-center justify-end -mt-1">

                <Link
                  to="/forgot-password"
                  className="
    text-sm font-medium
    text-gray-500
    hover:text-blue-600
    transition-all duration-300
    "
                >
                  Forgot Password?
                </Link>

              </div>

              {/* Role */}
              <RadioGroup
                value={input.role}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, role: value }))
                }
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
              >

                {/* Student */}
                <Label
                  className="
              flex items-center gap-4
              rounded-2xl
              bg-[#eef4ff]
              border border-transparent
              px-5 py-4
              cursor-pointer
              hover:border-blue-200
              transition-all duration-300
              "
                >

                  <RadioGroupItem value="student" />

                  <div>
                    <p className="font-semibold text-gray-900">
                      Student
                    </p>

                    <p className="text-sm text-gray-500">
                      Find dream jobs
                    </p>
                  </div>

                </Label>

                {/* Recruiter */}
                <Label
                  className="
              flex items-center gap-4
              rounded-2xl
              bg-[#fff4db]
              border border-transparent
              px-5 py-4
              cursor-pointer
              hover:border-orange-200
              transition-all duration-300
              "
                >

                  <RadioGroupItem value="recruiter" />

                  <div>
                    <p className="font-semibold text-gray-900">
                      Recruiter
                    </p>

                    <p className="text-sm text-gray-500">
                      Hire top talent
                    </p>
                  </div>

                </Label>

              </RadioGroup>

              {/* Upload */}
              <div
                className="
            rounded-2xl
            bg-[#f8fbff]
            p-4
            "
              >

                <p className="text-sm font-medium text-gray-700 mb-3">
                  Upload Profile Photo
                </p>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={fileHandler}
                  className="
              border-0
              bg-white
              rounded-xl
              "
                />

              </div>

              {/* Divider */}
              <div className="relative py-2">

                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>

                <div className="relative flex justify-center">
                  <span
                    className="
      bg-white/70
      px-4
      text-sm text-gray-400
      "
                  >
                    OR CONTINUE WITH
                  </span>
                </div>

              </div>

              {/* Google Signup */}
              <div className="space-y-4">

                {/* Info */}
                <div
                  className="
    flex items-start gap-3
    rounded-2xl
    bg-[#eef4ff]
    border border-blue-100
    px-5 py-4
    "
                >

                  <div className="text-lg">
                    🎓
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-blue-900">
                      Google Signup For Students Only
                    </p>

                    <p className="text-sm text-blue-700 mt-1 leading-6">
                      Recruiter accounts require manual registration using
                      email and password verification.
                    </p>

                  </div>

                </div>

                {/* Google Button */}
                <Button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="
    group
    relative
    w-full h-14
    rounded-2xl
    bg-white
    hover:bg-gray-50
    border border-gray-200
    text-gray-800
    shadow-sm
    hover:shadow-md
    transition-all duration-300
    "
                >

                  <div
                    className="
      flex items-center justify-center gap-4
      "
                  >

                    {/* Logo */}
                    <div
                      className="
        h-9 w-9
        rounded-full
        bg-[#f8fbff]
        flex items-center justify-center
        border border-gray-100
        "
                    >

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="h-5 w-5"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                        />

                        <path
                          fill="#FF3D00"
                          d="M6.3 14.7l6.6 4.8C14.7 15.3 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
                        />

                        <path
                          fill="#4CAF50"
                          d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.5 39.5 16.2 44 24 44z"
                        />

                        <path
                          fill="#1976D2"
                          d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6 6.8l.1-.1 6.3 5.3C35.3 39.9 44 34 44 24c0-1.3-.1-2.3-.4-3.5z"
                        />
                      </svg>

                    </div>

                    {/* Text */}
                    <span className="text-base font-semibold">
                      Continue with Google
                    </span>

                  </div>

                </Button>

              </div>


              {/* Submit */}
              <Button
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
            "
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              {/* Footer */}
              <p className="text-sm text-center text-gray-500 pt-2">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="
              font-semibold
              bg-gradient-to-r from-blue-600 to-violet-600
              bg-clip-text text-transparent
              hover:opacity-80
              "
                >
                  Login
                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
};

export default Signup;
