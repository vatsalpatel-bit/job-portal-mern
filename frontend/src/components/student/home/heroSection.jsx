import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CategoryCarousel from "@/components/student/home/createCarsousel";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";

const HeroSection = () => {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setQuery(e.target.value)
    };

    const handlSearch = () => {
        if (!query.trim()) {
            toast.error("Please enter a keyword");
            return;
        }
        navigate(`/browse?keyword=${query}`);
    }

    return (
        <section className="relative w-full overflow-hidden bg-[#f8fbff]">

            {/* Background Blur Shapes */}
            <div className="absolute top-[-120px] left-[-80px] h-[320px] w-[320px] rounded-full bg-[#eef4ff] blur-3xl opacity-70" />

            <div className="absolute right-[-100px] top-[40px] h-[280px] w-[280px] rounded-full bg-[#fff4db] blur-3xl opacity-70" />

            <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 text-center relative z-10">

                {/* Badge */}
                <div className="mb-7 flex justify-center">

                    <span
                        className="rounded-full border border-white/50 bg-white/80
                        backdrop-blur-md px-5 py-2 text-sm font-medium
                        text-gray-700 shadow-sm"
                    >
                        🚀 No. 1 Job Hunt Website
                    </span>

                </div>

                {/* Heading */}
                <h1
                    className="mx-auto max-w-4xl text-5xl sm:text-6xl lg:text-7xl
                    font-extrabold tracking-tight text-gray-900 leading-[1.1]"
                >
                    Search, Apply &
                    <br />

                    Get Your{" "}

                    <span
                        className="bg-gradient-to-r from-blue-600 to-violet-500
                        bg-clip-text text-transparent"
                    >
                        Dream Jobs
                    </span>

                </h1>

                {/* Subtitle */}
                <p
                    className="mx-auto mt-7 max-w-2xl text-base sm:text-lg
                    leading-8 text-gray-600"
                >
                    Find verified jobs, apply in minutes,
                    and track your applications —
                    all in one modern platform.
                </p>

                {/* Search Bar */}
                <div className="mx-auto mt-12 max-w-3xl">

                    <div
                        className="flex items-center overflow-hidden rounded-[28px]
                        bg-white border border-white/60
                        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                        backdrop-blur-xl p-2"
                    >

                        <Input
                            placeholder="Find your dream jobs"
                            className="h-14 flex-1 border-none bg-transparent px-6 text-base text-gray-800 placeholder:text-gray-400 focus-visible:ring-0 shadow-none"
                            value={query}
                            onChange={handleSearch}
                            onKeyDown={(e) => e.key === "Enter" && handlSearch()}
                        />

                        <Button
                            onClick={handlSearch}
                            className="
  relative overflow-hidden
  h-[70px] w-[70px]
  rounded-[24px]
  bg-gradient-to-br from-blue-600 to-violet-600
  hover:from-blue-700 hover:to-violet-700
  shadow-[0_12px_35px_rgba(59,130,246,0.28)]
  transition-all duration-300
  hover:-translate-y-1
  flex items-center justify-center
  group
  "
                        >

                            {/* Glow */}
                            <div
                                className="
    absolute inset-0
    bg-white/10
    opacity-0 group-hover:opacity-100
    transition duration-300
    "
                            />

                            <Search
                                className="
    h-6 w-6 text-white
    transition-transform duration-300
    group-hover:scale-110
    "
                            />

                        </Button>

                    </div>

                </div>

                {/* Carousel */}
                <div className="mt-10">
                    <CategoryCarousel />
                </div>

            </div>

        </section>
    );
};

export default HeroSection;