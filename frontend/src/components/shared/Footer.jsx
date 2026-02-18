import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-muted/40 mt-20">
      <div className="mx-auto max-w-7xl px-6 py-14">

        {/* Top */}
        <div className="grid grid-cols-4 gap-10 pb-10">

          {/* Brand */}
          <div className="col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Execoore
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Helping you find your dream job or hire top talent with a
              modern and powerful hiring platform.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4 pt-2">
              <a className="rounded-full p-2 bg-background hover:bg-primary/10 transition" href="#">
                <Facebook className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
              <a className="rounded-full p-2 bg-background hover:bg-primary/10 transition" href="#">
                <Twitter className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
              <a className="rounded-full p-2 bg-background hover:bg-primary/10 transition" href="#">
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
              <a className="rounded-full p-2 bg-background hover:bg-primary/10 transition" href="#">
                <Github className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">About Us</li>
              <li className="hover:text-primary cursor-pointer">Careers</li>
              <li className="hover:text-primary cursor-pointer">Blog</li>
              <li className="hover:text-primary cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Candidates
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">Browse Jobs</li>
              <li className="hover:text-primary cursor-pointer">Saved Jobs</li>
              <li className="hover:text-primary cursor-pointer">Job Alerts</li>
              <li className="hover:text-primary cursor-pointer">Profile</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Recruiters
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">Post a Job</li>
              <li className="hover:text-primary cursor-pointer">Browse Candidates</li>
              <li className="hover:text-primary cursor-pointer">Pricing</li>
              <li className="hover:text-primary cursor-pointer">Dashboard</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between border-t border-border/40 pt-6 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Execoore. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer">Privacy</span>
            <span className="hover:text-primary cursor-pointer">Terms</span>
            <span className="hover:text-primary cursor-pointer">Security</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
 