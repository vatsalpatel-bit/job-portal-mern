import {
  Facebook,
  Twitter,
  Linkedin,
  Github
} from "lucide-react";
import brandLogo from "@/svg/brand-logo.png"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.auth.user);

  return (

    <footer className="relative w-full overflow-hidden bg-[#0b0f19]">

      {/* Gradient Blur */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-20 relative z-10">

        {/* Main Container */}
        <div
          className="
          rounded-[36px]
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          shadow-[0_10px_50px_rgba(0,0,0,0.35)]
          p-10 lg:p-14
          "
        >
          {/* TOP */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1px_2fr] gap-14 pb-14">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              {/* Logo */}
              <div className="flex items-center gap-3">


                <img
                  src={brandLogo}
                  className="h-5 tracking-wide transition duration-300 group-hover:opacity-80"
                />

              </div>

              {/* Description */}
              <p className="text-sm leading-7 text-gray-400 max-w-sm">
                Helping candidates discover dream jobs and empowering recruiters
                with a modern hiring experience built for the future of hiring.
              </p>



              {/* Social */}
              <div className="flex items-center gap-3 pt-2">

                <a
                  className="
        rounded-2xl p-3
        bg-white/5
        border border-white/10
        text-gray-400
        hover:bg-white
        hover:text-black
        transition-all duration-300
        "
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61589714964366"
                >
                  <Facebook className="h-4 w-4" />
                </a>

                <a
                  className="
        rounded-2xl p-3
        bg-white/5
        border border-white/10
        text-gray-400
        hover:bg-white
        hover:text-black
        transition-all duration-300
        "
                  target="_blank"
                  href="https://x.com/Knightcode013"
                >
                  <Twitter className="h-4 w-4" />
                </a>

                <a
                  className="
        rounded-2xl p-3
        bg-white/5
        border border-white/10
        text-gray-400
        hover:bg-white
        hover:text-black
        transition-all duration-300
        "
                  target="_blank"
                  href="https://www.linkedin.com/in/vatsal-patel-928b49407/"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

                <a
                  className="
        rounded-2xl p-3
        bg-white/5
        border border-white/10
        text-gray-400
        hover:bg-white
        hover:text-black
        transition-all duration-300
        "
                  target="_blank"
                  href="https://github.com/vatsalpatel-bit"
                >
                  <Github className="h-4 w-4" />
                </a>

              </div>

            </div>

            {/* CENTER SEPARATOR */}
            <div className="hidden lg:block w-px bg-white/10 ml-10" />

            {/* RIGHT SIDE */}
            <div className="flex flex-wrap justify-center lg:justify-evenly gap-16">
              {
                user?.role === "student" ? (<><div>

                  <h4
                    className="
        mb-6 text-sm font-semibold
        uppercase tracking-[0.2em]
        text-white
        "
                  >
                    Candidates
                  </h4>

                  <ul className="space-y-4 text-sm text-gray-400">

                    <li>
                      <Link
                        to="/jobs"
                        className="hover:text-white transition cursor-pointer"
                      >
                        Jobs
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/browse"
                        className="hover:text-white transition cursor-pointer"
                      >
                        Browse
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/profile"
                        className="hover:text-white transition cursor-pointer"
                      >
                        Profile
                      </Link>
                    </li>

                  </ul>

                </div>
             
                </>) : user?.role === "recruiter" ? (<>
              
                  <div>

                    <h4
                      className="
        mb-6 text-sm font-semibold
        uppercase tracking-[0.2em]
        text-white
        "
                    >
                      Recruiters
                    </h4>

                    <ul className="space-y-4 text-sm text-gray-400">

                      <li>
                        <Link
                          to="/admin/companies"
                          className="hover:text-white transition cursor-pointer"
                        >
                          Companies
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/admin/jobs"
                          className="hover:text-white transition cursor-pointer"
                        >
                          Jobs
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/admin/profile"
                          className="hover:text-white transition cursor-pointer"
                        >
                          Profile
                        </Link>
                      </li>
                    </ul>

                  </div></>) : (
                  <>
                    <div>

                      <h4
                        className="
        mb-6 text-sm font-semibold
        uppercase tracking-[0.2em]
        text-white
        "
                      >
                        Recruiters
                      </h4>

                      <ul className="space-y-4 text-sm text-gray-400">

                        <li>
                          <Link
                            to="#"
                            className="hover:text-white transition cursor-pointer"
                          >
                            Companies
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="#"
                            className="hover:text-white transition cursor-pointer"
                          >
                            Jobs
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="#"
                            className="hover:text-white transition cursor-pointer"
                          >
                            Profile
                          </Link>
                        </li>
                      </ul>

                    </div>
                  </>
                )
              }

              {/* Resources */}
              <div>

                <h4
                  className="
        mb-6 text-sm font-semibold
        uppercase tracking-[0.2em]
        text-white
        "
                >
                  Resources
                </h4>

                <ul className="space-y-4 text-sm text-gray-400">

                  <li>
                    <Link
                      to="/about us"
                      className="hover:text-white transition cursor-pointer"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/help center"
                      className="hover:text-white transition cursor-pointer"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy policy"
                      className="hover:text-white transition cursor-pointer"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/term & condition"
                      className="hover:text-white transition cursor-pointer"
                    >
                      Terms & Conditions
                    </Link>
                  </li>

                </ul>

              </div>

            </div>

          </div>

          {/* Separator */}
          <div className="h-px bg-white/10" />

          {/* Bottom */}
          <div
            className="
            flex flex-col md:flex-row
            items-center justify-between
            gap-5 pt-7
            "
          >

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} NextWork. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">

              <Link
                to="/privacy policy"
                className="hover:text-white cursor-pointer transition"
              >
                Privacy
              </Link>
              <Link
                to="/term & condition"
                className="hover:text-white cursor-pointer transition"
              >
                Terms
              </Link>
              <Link
                to="/security"
                className="hover:text-white cursor-pointer transition"
              >
                Security
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>

  );
};

export default Footer;