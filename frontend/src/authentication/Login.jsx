import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/authslice";
import { loginUser, getProfileApi, googleAuthenticationApi } from "@/services/authApi";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  provider
} from "@/utils/firebase"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});

  const changeEventeHandeler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newError = { ...prev };
      delete newError[name];
      return newError;
    })
  };

  const handleGoogleLogin = async () => {

    try {

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user = result.user;
      const data = await googleAuthenticationApi(user);
      localStorage.setItem("token", data.token)
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

      const res = await loginUser(input);

      localStorage.setItem("token", res.data.token);
      if (res.data.success) {

        const profileRes = await getProfileApi();
        dispatch(setUser(profileRes.data.user));

        toast.success(res.data.message);

        navigate("/");
      }
    } catch (error) {
      const data = error.response?.data;
      if (data?.error) {
        const allErrors = {};

        data.error.forEach((err, index) => {
          allErrors[err.path[0]] = err.message;
          setTimeout(() => {
            toast(err.message)
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
      <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center px-6 overflow-hidden relative pt-48">

        {/* Background Blur */}
        <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        <div className="absolute right-[-100px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

        {/* Main Card */}
        <div
          className="
    relative z-10
    w-full max-w-3xl
    rounded-[36px]
    border border-white/60
    bg-white/80
    backdrop-blur-xl
    shadow-[0_10px_40px_rgba(0,0,0,0.05)]
    p-8 sm:p-12
    "
        >

          {/* Header */}
          <div className="mb-10 text-center">

            {/* Badge */}
            <div
              className="
        inline-flex items-center
        rounded-full
        bg-[#eef4ff]
        px-4 py-2
        text-sm font-medium text-blue-700
        mb-5
        "
            >
              🔐 Secure Login
            </div>

            <h1
              className="
        text-4xl sm:text-5xl
        font-extrabold
        tracking-tight
        text-gray-900
        "
            >
              Welcome Back
            </h1>

            <p className="mt-4 text-gray-600 text-base leading-7">
              Login to continue to your dashboard
            </p>

          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-7">

            {/* Email */}
            <div className="space-y-3">

              <Label className="text-sm font-semibold text-gray-700">
                Email
              </Label>

              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventeHandeler}
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
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password */}
            <div className="space-y-3">

              <Label className="text-sm font-semibold text-gray-700">
                Password
              </Label>

              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventeHandeler}
                placeholder="••••••••"
                autocomplete="current-password"
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
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>
              )}

            </div>
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
            <div className="space-y-4">

              <Label className="text-sm font-semibold text-gray-700">
                Login as
              </Label>

              <RadioGroup
                value={input.role}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, role: value }))
                }
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >

                {/* Student */}
                <label
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
                      Apply for jobs
                    </p>
                  </div>

                </label>

                {/* Recruiter */}
                <label
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

                </label>

              </RadioGroup>

            </div>
            {/* Divider */}
            <div className="relative py-2">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>

              <div className="relative flex justify-center">
                <span
                  className="
      bg-white
      px-4
      text-sm text-gray-400
      "
                >
                  OR
                </span>
              </div>

            </div>

            {/* Google Auth */}
            <div className="space-y-4">

              {/* Info Message */}
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
                  ℹ️
                </div>

                <div>

                  <p className="text-sm font-semibold text-blue-900">
                    Student Authentication Only
                  </p>

                  <p className="text-sm text-blue-700 mt-1 leading-6">
                    Google login is currently available only for students.
                    Recruiters must login using email and password.
                  </p>

                </div>

              </div>

              {/* Google Button */}
              <Button
                type="button"
                onClick={handleGoogleLogin}
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

                  {/* Google Logo */}
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
        "
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Footer */}
            <p className="text-sm text-center text-gray-500">

              Don&apos;t have an account?{" "}

              <Link
                to="/signup"
                className="
          font-semibold
          bg-gradient-to-r from-blue-600 to-violet-600
          bg-clip-text text-transparent
          hover:opacity-80
          "
              >
                Signup
              </Link>

            </p>

          </form>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default Login;
