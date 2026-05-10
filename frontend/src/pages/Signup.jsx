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
import { uploadProfilePhotoApi } from "@/services/authApi";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import brandLogo from "@/svg/brand-logo.png"

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null,
  });



  /* -------------------------
     INPUT HANDLERS
  -------------------------- */
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  /* -------------------------
     SUBMIT HANDLER (FINAL)
  -------------------------- */
  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    dispatch(setLoading(true));

    try {
      /* 1️⃣ SIGNUP */
      const formData = new FormData();
      formData.append("fullname", input.fullname.trim());
      formData.append("email", input.email.trim().toLowerCase());
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role.toLowerCase());
      if (input.file) formData.append("file", input.file);

      await signupUser(formData);

      /* SET COOKE */
      const loginRes = await loginUser({
        email: input.email.trim().toLowerCase(),
        password: input.password,
        role: input.role.toLowerCase(),
      });


      dispatch(setUser(loginRes.data.user));

      toast.success("Welcome 🎉 Account created successfully!");

      /* 4️ NAVIGATE AFTER REDUX UPDATE */
      navigate("/");

    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error?.response?.data?.message || "Signup failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
  <>
  <Navbar />

  <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center px-6 py-28 overflow-hidden relative">

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

          {/* Phone */}
          <Input
            name="phoneNumber"
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
