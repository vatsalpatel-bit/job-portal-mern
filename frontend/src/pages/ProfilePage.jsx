import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Mail, Phone, Pencil, X } from "lucide-react";
import { toast } from "sonner";

import AppliedJobTable from "@/components/jobs/AppliedJobTable";

import {
  getProfileApi,
  saveProfile,
  uploadResumeApi,
} from "@/services/authApi";

import { setUser } from "@/redux/slices/authslice";
import { uploadProfilePhotoApi } from "@/services/authApi";


const Profile = () => {
  const dispatch = useDispatch();
  const photoInputRef = useRef(null);

  const user = useSelector((state) => state.auth.user);


  // ---------------- STATE ----------------
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
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
        const res = await getProfileApi();
        const user = res.data.user;

        dispatch(setUser(user)); // keep redux in sync

        setProfile({
          name: user?.fullname || "",
          email: user?.email || "",
          phone: user?.phoneNumber || "",
          bio: user?.profile?.bio || "",
        });

        setSkills(user?.profile?.skills || []);
        setResume(user?.profile?.resume || "");
      } catch (error) {
        console.error("Fetch profile error:", error);
        toast.error("Failed to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile(); // ✅ only once
  }, [dispatch]);

  // ✅ Only block page on INITIAL load
  if (!user && loading) {
    return (
      <>
        <Navbar />
        <div className="pt-32 text-center">Loading profile...</div>
      </>
    );
  }

  // ---------------- SKILLS ----------------
  const addSkill = () => {
    if (!newSkill.trim() || skills.includes(newSkill)) return;
    setSkills([...skills, newSkill]);
    setNewSkill("");

  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // ---------------- UPDATE PROFILE ----------------
  const handleUpdateProfile = async () => {
    try {
      const payload = {
        fullname: profile.name,
        email: profile.email,
        phoneNumber: profile.phone,
        bio: profile.bio,
        skills,
      };

      const res = await saveProfile(payload);
      const user = res.data.user;

      dispatch(setUser(user));

      setProfile({
        name: user.fullname,
        email: user.email,
        phone: user.phoneNumber,
        bio: user.profile?.bio || "",
      });

      setSkills(user.profile?.skills || []);

      toast.success("Profile updated successfully ✅");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Profile update failed ❌");
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
      setResume(user.profile.resume); // 🔥 immediate UI update

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
    { icon: Phone, value: profile.phone },
  ];

  // ---------------- UI ----------------
  return (
    <>
      <Navbar />

      <div className="pt-20 pb-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border bg-background p-8 shadow-sm">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-6">
              {/* LEFT: Avatar + Name */}
              <div className="flex items-center gap-5">
                {/* PROFILE PHOTO */}
                <div
                  className="relative group cursor-pointer shrink-0"
                  onClick={() => {
                    if (!photoUploading) photoInputRef.current.click();
                  }}
                >
                  <Avatar className="h-20 w-20">
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

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 rounded-full bg-black/50 
          flex items-center justify-center text-white text-xs
          opacity-0 group-hover:opacity-100 transition"
                  >
                    {photoUploading ? "Uploading..." : "Change"}
                  </div>
                </div>

                {/* NAME + BIO */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold leading-tight">
                    {profile.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {profile.bio || "No bio added"}
                  </p>
                </div>
              </div>

              {/* RIGHT: Edit button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                {/* dialog content stays same */}
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 mt-4">
                    <Input
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      placeholder="Full Name"
                    />

                    <Input
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      placeholder="Bio / Headline"
                    />

                    <Input
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      placeholder="Email"
                    />

                    <Input
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      placeholder="Phone"
                    />

                    <Button className="w-full" onClick={handleUpdateProfile}>
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>


            <div className="my-6 h-px bg-muted" />

            {/* CONTACT INFO */}
            <div className="space-y-3 text-sm">
              {contacts.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{item.value}</span>
                  </div>
                );
              })}
            </div>

            {/* SKILLS */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Skills</h4>

              <div className="flex flex-wrap gap-2">
                {skills.length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    No skills added
                  </span>
                )}

                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="mt-3 flex gap-2 max-w-sm">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add new skill"
                />
                <Button onClick={addSkill}>Add</Button>

              </div>
            </div>





            {/* RESUME */}

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Resume</h4>

              <div className="flex items-center gap-4">
                {resume ? (
                  <a
                    href={`https://docs.google.com/gview?url=${encodeURIComponent(resume)}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>

                ) : (
                  <span className="text-sm text-muted-foreground">
                    No resume uploaded
                  </span>
                )}

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
                >
                  Upload
                </Button>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              ref={photoInputRef}
              onChange={handlePhotoUpload}
            />

          </div>

          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">Applied Jobs</h3>
            <AppliedJobTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
