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
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-background border rounded-2xl shadow-sm p-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Login to continue to your dashboard
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventeHandeler}
              placeholder="patel@gmail.com"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventeHandeler}
              placeholder="••••••••"
              autocomplete="current-password"
              className="h-11"
            />
          </div>

          <div className="space-y-3">
            <Label>Login as</Label>
            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setInput((prev) => ({ ...prev, role: value }))
              }
              className="flex gap-6"
            >
              <label className="flex items-center gap-3 border rounded-lg px-5 py-3 cursor-pointer">
                <RadioGroupItem value="student" />
                Student
              </label>

              <label className="flex items-center gap-3 border rounded-lg px-5 py-3 cursor-pointer">
                <RadioGroupItem value="recruiter" />
                Recruiter
              </label>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full text-base mt-4"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
