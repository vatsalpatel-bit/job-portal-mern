import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CategoryCarousel from "@/components/carousel/createCarsousel";

const HeroSection = () => {
    return (
        <section className="w-full bg-background">
            <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 text-center">

                {/* Badge */}
                <div className="mb-6 flex justify-center">
                    <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        No. 1 Job Hunt Website
                    </span>
                </div>

                {/* ✅ FORCE TEXT COLOR */}
                <h1 className="text-5xl font-extrabold leading-tight text-foreground">
                    Search, Apply & <br />
                    Get Your{" "}
                    <span className="text-primary">Dream Jobs</span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground">
                  Find verified jobs, apply in minutes, and track your applications — all in one place.
                </p>

                {/* Search Bar */}
                <div className="mx-auto mt-10 flex max-w-3xl items-center overflow-hidden rounded-full border shadow-sm">
                    <Input
                        placeholder="Find your dream jobs"
                        className="h-14 flex-1 border-none px-6 text-foreground focus-visible:ring-0"
                    />
                    <Button
                        size="icon"
                        className="h-14 w-16 rounded-none rounded-r-full"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>

                {/* Carousel */}
                <div className="mt-6">
                    <CategoryCarousel />
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
