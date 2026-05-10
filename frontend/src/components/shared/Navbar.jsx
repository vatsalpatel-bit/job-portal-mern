import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut, Link2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/services/authApi";
import { setUser } from "@/redux/slices/authslice";
import brandLogo from "@/svg/brand-logo.png"


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // REAL AUTH STATE
  const user = useSelector((state) => state.auth.user);  // const user=true;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //  LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      await logoutUser(); // backend cookie clear
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(setUser(null)); // clear redux
      setOpen(false);
      navigate("/login");
    }
  };

  return (
   <header
  className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300`}
>
  <div
    className={`mx-auto max-w-7xl h-[72px] px-7 flex items-center justify-between
    rounded-3xl border border-white/40
    backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]
    ${scrolled
        ? "bg-white/80"
        : "bg-[#eef4ff]/80"
      }`}
  >

    {/* LEFT SIDE */}
    <div className="flex items-center gap-10">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">

        {/* <div
          className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#dbeafe] to-[#fff4db]
          flex items-center justify-center shadow-sm"
        >
          <div className="h-4 w-4 rounded-full bg-black" />
        </div> */}

        <img
          src={brandLogo}
          className="h-5 tracking-wide transition duration-300 group-hover:opacity-80"
        />
      </Link>

      {/* Separator */}
      <div className="hidden md:block h-8 w-px bg-gray-200" />

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-2 text-s font-medium">

        {
          user?.role === 'recruiter' ? (
            <>
              <Link
                to="/admin/companies"
                className="px-5 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                Companies
              </Link>

              <Link
                to="/admin/jobs"
                className="px-5 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="px-5 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                Home
              </Link>

              <Link
                to="/jobs"
                className="px-5 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                Jobs
              </Link>

              {/* <Link
                to="/browse"
                className="px-5 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                Browse
              </Link> */}
            </>
          )
        }

      </nav>

    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-4">

      {!user ? (
        <div className="flex items-center gap-3">

          <Link to="/login">
            <Button
              variant="outline"
              className="rounded-full px-6 border-0 bg-white hover:bg-gray-100 shadow-sm"
            >
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button
              className="rounded-full px-6 bg-black hover:bg-gray-900 text-white shadow-md"
            >
              Get Started
            </Button>
          </Link>

        </div>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>

          <PopoverTrigger asChild>
            <button className="outline-none">

              <Avatar className="h-11 w-11 ring-4 ring-white shadow-sm">
                <AvatarImage
                  key={user?.profile?.profilePhoto}
                  src={
                    user?.profile?.profilePhoto
                      ? `${user.profile.profilePhoto}?t=${Date.now()}`
                      : ""
                  }
                  className="object-cover"
                />

                <AvatarFallback
                  className="bg-[#eef4ff] text-gray-700 font-bold"
                >
                  {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={12}
            className="w-64 rounded-3xl border-0 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white"
          >

            {/* User Info */}
            <div className="flex items-center gap-3 px-3 py-4">

              <Avatar className="h-11 w-11">
                <AvatarImage
                  key={user?.profile?.profilePhoto}
                  src={
                    user?.profile?.profilePhoto
                      ? `${user.profile.profilePhoto}?t=${Date.now()}`
                      : ""
                  }
                  className="object-cover"
                />

                <AvatarFallback
                  className="bg-[#eef4ff] text-gray-700 font-bold"
                >
                  {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {user.fullname}
                </span>

                <span className="text-xs text-gray-500 mt-1">
                  {user.role}
                </span>
              </div>

            </div>

            {/* Separator */}
            <div className="my-2 h-px bg-gray-100" />

            {/* Actions */}
            <div className="flex flex-col p-1">

              {user?.role === 'student' ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm hover:bg-[#f5f9ff] transition"
                    onClick={() => setOpen(false)}
                  >
                    <User2 className="h-4 w-4 text-gray-500" />
                    View Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/admin/profile"
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm hover:bg-[#f5f9ff] transition"
                    onClick={() => setOpen(false)}
                  >
                    <User2 className="h-4 w-4 text-gray-500" />
                    View Profile
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-red-500 hover:bg-red-50 transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>

            </div>

          </PopoverContent>

        </Popover>
      )}

    </div>

  </div>
</header>
  );
};

export default Navbar;
