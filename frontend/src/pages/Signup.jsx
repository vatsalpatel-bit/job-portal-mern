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

      /* 2️⃣ LOGIN (SET COOKIE) */
      const loginRes = await loginUser({
        email: input.email.trim().toLowerCase(),
        password: input.password,
        role: input.role.toLowerCase(),
      });

      /* 3️⃣ SET USER IN REDUX (🔥 CRITICAL) */
      dispatch(setUser(loginRes.data.user));

      toast.success("Welcome 🎉 Account created successfully!");

      /* 4️⃣ NAVIGATE AFTER REDUX UPDATE */
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
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-6">
      <div className="grid grid-cols-2 max-w-5xl w-full rounded-2xl overflow-hidden shadow-lg bg-background">

        {/* LEFT PANEL */}
        <div className="bg-primary text-primary-foreground p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">Execoore</h1>
            <p className="mt-4 text-lg opacity-90">
              Build your career or hire top talent with a modern job platform.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-12">
          <form onSubmit={submitHandler} className="space-y-5">

            <Input
              name="fullname"
              placeholder="Full Name"
              value={input.fullname}
              onChange={changeHandler}
              required
            />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={input.email}
              onChange={changeHandler}
              required
            />

            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              value={input.phoneNumber}
              onChange={changeHandler}
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={input.password}
              onChange={changeHandler}
              autoComplete="new-password"
              required
            />

            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setInput((prev) => ({ ...prev, role: value }))
              }
              className="flex gap-4"
            >
              <Label className="flex items-center gap-2">
                <RadioGroupItem value="student" /> Student
              </Label>
              <Label className="flex items-center gap-2">
                <RadioGroupItem value="recruiter" /> Recruiter
              </Label>
            </RadioGroup>

            <Input
              type="file"
              accept="image/*"
              onChange={fileHandler}
            />


            <Button disabled={loading} className="w-full rounded-full">
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary underline">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
