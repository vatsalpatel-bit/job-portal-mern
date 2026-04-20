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
      className={`fixed top-0 z-50 w-full transition-all duration-300
        ${scrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-background"
        }`}
    >
      <div className="mx-auto max-w-7xl h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary rounded-sm" />
          <span className="text-xl font-bold tracking-wide">
            Execoore
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-10">
          {/* Navigation */}
          <nav className="flex items-center gap-10 text-sm font-medium">
            {
              user?.role === 'recruiter' ? (
                <> <Link to="/admin/companies" className="hover:text-primary transition">
                  Companies
                </Link>
                  <Link to="/admin/jobs" className="hover:text-primary transition">
                    Jobs
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="hover:text-primary transition">
                    Home
                  </Link>
                  <Link to="/jobs" className="hover:text-primary transition">
                    Jobs
                  </Link>
                  <Link to="/browse" className="hover:text-primary transition">
                    Browse
                  </Link>
                </>
              )
            }

          </nav>

          {/* Auth Section */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="rounded-full px-6">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="outline-none">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      key={user?.profile?.profilePhoto}
                      src={
                        user?.profile?.profilePhoto
                          ? `${user.profile.profilePhoto}?t=${Date.now()}`
                          : ""
                      }
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {user?.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                </button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={8}
                className="z-[100] w-64 rounded-xl p-2 shadow-lg"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 px-3 py-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      key={user?.profile?.profilePhoto}
                      src={
                        user?.profile?.profilePhoto
                          ? `${user.profile.profilePhoto}?t=${Date.now()}`
                          : ""
                      }
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {user?.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>


                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-none">
                      {user.fullname}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="my-1 h-px bg-muted" />

                {/* Actions */}
                <div className="flex flex-col p-1">
                  {user?.role === 'student' && (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm
                               hover:bg-muted transition"
                        onClick={() => setOpen(false)}
                      >
                        <User2 className="h-4 w-4 text-muted-foreground" />
                        View Profile
                      </Link></>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm
                               text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
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
