import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/authslice";

// ✅ CORRECT API IMPORT
import { loginUser, getProfileApi } from "@/services/authApi";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const changeEventeHandeler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    dispatch(setLoading(true));

    try {

      const res = await loginUser(input);

      if (res.data.success) {

        const profileRes = await getProfileApi();


        dispatch(setUser(profileRes.data.user));

        toast.success(res.data.message);

        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

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
