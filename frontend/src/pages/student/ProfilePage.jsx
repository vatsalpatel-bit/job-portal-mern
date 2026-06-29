import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Mail, Phone, Pencil, X } from "lucide-react";
import { toast } from "sonner";

import AppliedJobTable from "@/components/student/profile/AppliedJobTable";

import {
  getProfileApi,
  saveProfile,
  uploadResumeApi,
} from "@/services/authApi";

import { setUser } from "@/redux/slices/authslice";
import { uploadProfilePhotoApi } from "@/services/authApi";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/shared/Footer";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const photoInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.auth.user);


  // ---------------- STATE ----------------
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
  });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [resume, setResume] = useState("");

  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState("");


  // ---------------- FETCH PROFILE ----------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getProfileApi();
        const user = res.data.user;

        dispatch(setUser(user)); // keep redux in sync

        setProfile({
          fullname: user?.fullname || "",
          email: user?.email || "",
          phoneNumber: user?.phoneNumber || "",
          bio: user?.profile?.bio || "",
        });

        setSkills(user?.profile?.skills || []);
        setResume(user?.profile?.resume || "");
      } catch (error) {
        console.error("Fetch profile error:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (!user && loading) {
    return (
      <>
        <Navbar />
        <div className="pt-32 text-center">Loading profile...</div>
      </>
    );
  }

  const handleProfile = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => {
      const newError = { ...prev };
      delete newError[name];
      return newError
    })
  }
  // ---------------- SKILLS ----------------
  const addSkill = () => {
    if (!newSkill.trim() || skills.includes(newSkill)) return;
    setSkills([...skills, newSkill]);
    setErrors((prev) => {
      const newError = { ...prev };
      delete newError.skills;
      return newError;
    })
    setNewSkill("");

  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // ---------------- UPDATE PROFILE ----------------
  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const payload = {
        fullname: profile.fullname,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        bio: profile.bio,
        skills,
      };

      const res = await saveProfile(payload);
      const user = res.data.user;

      dispatch(setUser(user));

      setProfile({
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        bio: user.profile?.bio || "",
      });

      setSkills(user.profile?.skills || []);
      setOpen(false);
      toast.success("Profile updated successfully ✅");
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

      }
      else if (data?.message) {
        toast.error(data?.message);
      }
      else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false)
    }
  };
  // profile pic
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoUploading(true);
    setPhotoError("");
    const previewUrl = URL.createObjectURL(file);

    dispatch(
      setUser({
        ...user,
        profile: {
          ...user.profile,
          profilePhoto: previewUrl,
        },
      })
    );
    try {
      const res = await uploadProfilePhotoApi(file);
      dispatch(setUser(res.data.user));
      toast.success("Profile photo updated ✅");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Photo upload failed ❌";

      setPhotoError(message);
      toast.error(message);
    } finally {
      setPhotoUploading(false);
      e.target.value = "";
    }
  };

  // ---------------- RESUME UPLOAD ----------------
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadResumeApi(file);
      const user = res.data.user;

      dispatch(setUser(user));
      setResume(user.profile.resume);

      toast.success("Resume uploaded successfully 📄");
    } catch (error) {
      console.error("Resume upload error:", error);
      toast.error(
        error?.response?.data?.message || "Resume upload failed ❌"
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-32 text-center">Loading profile...</div>
      </>
    );
  }

  // ---------------- CONTACT INFO ----------------
  const contacts = [
    { icon: Mail, value: profile.email },
    { icon: Phone, value: profile.phoneNumber },
  ];

  // ---------------- UI ----------------
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8fbff] pt-28 pb-16 overflow-hidden relative">

        {/* Background Blur */}
        <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

        <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

        <div className="mx-auto max-w-5xl px-6 relative z-10">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="
        mb-6
        inline-flex items-center gap-2
        rounded-full
        bg-white/80
        backdrop-blur-md
        border border-white/60
        px-5 py-2
        text-sm font-medium text-gray-700
        shadow-sm
        hover:bg-white
        transition-all duration-300
        "
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* MAIN PROFILE CARD */}
          <div
            className="
        rounded-[36px]
        border border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        p-8 sm:p-10
        "
          >

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* LEFT */}
              <div className="flex items-center gap-6">

                {/* PROFILE PHOTO */}
                <div
                  className="relative group cursor-pointer shrink-0"
                  onClick={() => {
                    if (!photoUploading) photoInputRef.current.click();
                  }}
                >

                  <Avatar
                    className="
                h-24 w-24
                ring-4 ring-white
                shadow-lg
                "
                  >

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
                      className="
                  bg-[#eef4ff]
                  text-blue-700
                  font-bold text-2xl
                  "
                    >
                      {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>

                  </Avatar>

                  {/* Hover Overlay */}
                  <div
                    className="
                absolute inset-0 rounded-full
                bg-black/50
                flex items-center justify-center
                text-white text-xs font-medium
                opacity-0 group-hover:opacity-100
                transition
                "
                  >
                    {photoUploading ? "Uploading..." : "Change"}
                  </div>

                </div>

                {/* NAME + BIO */}
                <div>

                  <div
                    className="
                inline-flex items-center
                rounded-full
                bg-[#eef4ff]
                px-4 py-1.5
                text-xs font-medium text-blue-700
                mb-4
                "
                  >
                    Student Profile
                  </div>

                  <h2
                    className="
                text-3xl sm:text-4xl
                font-extrabold
                tracking-tight
                text-gray-900
                "
                  >
                    {profile.fullname}
                  </h2>

                  <p
                    className="
                mt-3
                max-w-xl
                text-gray-600
                leading-7
                "
                  >
                    {profile.bio || "No bio added"}
                  </p>

                </div>

              </div>

              {/* EDIT BUTTON */}
              <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>

                  <Button
                    variant="outline"
                    className="
                h-12 w-12
                rounded-2xl
                border-0
                bg-[#f8fbff]
                hover:bg-black
                hover:text-white
                shadow-sm
                "
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                </DialogTrigger>

                {/* DIALOG */}
                <DialogContent
                  className="
              sm:max-w-md
              rounded-[32px]
              border-0
              bg-white
              shadow-[0_20px_60px_rgba(0,0,0,0.12)]
              p-8
              "
                >

                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      Edit Profile
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 mt-6">

                    <Input
                      name="fullname"
                      value={profile.fullname}
                      onChange={handleProfile}
                      placeholder="Full Name"
                      className="h-12 rounded-2xl border-0 bg-[#f8fbff]"
                    />
                    {errors.fullname && (
                      <p className="text-red-500 text-sm">
                        {errors.fullname}
                      </p>
                    )}

                    <Input
                      name="bio"
                      value={profile.bio}
                      onChange={handleProfile}
                      placeholder="Bio / Headline"
                      className="h-12 rounded-2xl border-0 bg-[#f8fbff]"
                    />
                    {errors.bio && (
                      <p className="text-red-500 text-sm">
                        {errors.bio}
                      </p>
                    )}

                    <Input
                      name="email"
                      value={profile.email}
                      onChange={handleProfile}
                      placeholder="Email"
                      className="h-12 rounded-2xl border-0 bg-[#f8fbff]"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email}
                      </p>
                    )}

                    <Input
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleProfile}
                      placeholder="Phone"
                      className="h-12 rounded-2xl border-0 bg-[#f8fbff]"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}

                    <Button
                      onClick={handleUpdateProfile}
                      disabled={loading}
                      className="
    w-full h-12
    rounded-2xl
    bg-black hover:bg-gray-900
    text-white
    font-medium
    shadow-md
    disabled:opacity-50
    disabled:pointer-events-none
  "
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving...
                        </span>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>

                  </div>

                </DialogContent>

              </Dialog>

            </div>

            {/* Error */}
            {photoError && (
              <p className="mt-5 text-sm text-red-500">
                {photoError}
              </p>
            )}

            {/* Divider */}
            <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* CONTACT + SKILLS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* CONTACT INFO */}
              <div>

                <h4 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h4>

                <div className="space-y-4">

                  {contacts?.map((item, index) => {

                    const Icon = item.icon;

                    return (
                      <div
                        key={index}
                        className="
                    flex items-center gap-4
                    rounded-2xl
                    bg-[#f8fbff]
                    p-4
                    "
                      >

                        <div
                          className="
                      h-10 w-10
                      rounded-xl
                      bg-white
                      flex items-center justify-center
                      shadow-sm
                      "
                        >
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>

                        <span className="text-sm text-gray-700">
                          {item.value}
                        </span>

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* SKILLS */}
              <div>

                <h4 className="text-xl font-bold text-gray-900 mb-6">
                  Skills
                </h4>

                <div className="flex flex-wrap gap-3">

                  {skills?.length === 0 && (
                    <span className="text-sm text-gray-500">
                      No skills added
                    </span>
                  )}

                  {skills?.map((skill) => (

                    <Badge
                      key={skill}
                      className="
                  rounded-full
                  border-0
                  bg-[#eef4ff]
                  text-blue-700
                  px-4 py-2
                  shadow-sm
                  "
                    >
                      {skill}

                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>

                    </Badge>

                  ))}

                </div>

                {/* Add Skill */}
                <div className="mt-5 flex gap-3 max-w-md">

                  <Input

                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                    className="h-12 rounded-2xl border-0 bg-[#f8fbff]"
                  />

                  <Button
                    onClick={addSkill}
                    className="
  h-12 px-6
  rounded-2xl
  bg-gradient-to-r from-blue-600 to-violet-600
  hover:from-blue-700 hover:to-violet-700
  text-white font-medium
  shadow-[0_10px_25px_rgba(59,130,246,0.25)]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:shadow-[0_14px_35px_rgba(59,130,246,0.35)]
  "
                  >
                    Add Skill
                  </Button>

                </div>
                {errors.skills && (
                  <p className="text-red-500 text-sm">
                    {errors.skills}
                  </p>)}

              </div>

            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* RESUME */}
            <div>

              <h4 className="text-xl font-bold text-gray-900 mb-5">
                Resume
              </h4>

              <div
                className="
            flex flex-col sm:flex-row
            items-start sm:items-center
            justify-between
            gap-5
            rounded-3xl
            bg-[#f8fbff]
            p-6
            "
              >

                {/* Left */}
                <div>

                  {resume ? (
                    <a
                      href={`https://docs.google.com/viewer?url=${resume}&embedded=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                  text-blue-600
                  font-medium
                  hover:underline
                  "
                    >
                      View Resume
                    </a>

                  ) : (
                    <span className="text-sm text-gray-500">
                      No resume uploaded
                    </span>
                  )}

                </div>

                {/* Upload */}
                <div>

                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    hidden
                    onChange={handleResumeUpload}
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("resume-upload").click()
                    }
                    className="
                h-11 px-5
                rounded-2xl
                border-0
                bg-white
                hover:bg-black
                hover:text-white
                shadow-sm
                "
                  >
                    Upload Resume
                  </Button>

                </div>

              </div>

            </div>

            {/* Hidden Upload */}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={photoInputRef}
              onChange={handlePhotoUpload}
            />

          </div>

          {/* Applied Jobs */}
          <div className="mt-10">

            <div
              className="
          rounded-[36px]
          border border-white/60
          bg-white/80
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.05)]
          p-8
          "
            >

              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Applied Jobs
              </h3>

              <AppliedJobTable />

            </div>

          </div>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default Profile;
