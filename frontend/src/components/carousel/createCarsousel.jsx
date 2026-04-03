import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const { allJobs } = useSelector((state) => state.job);

  // ✅ Extract unique job titles
  const categories = [...new Set(allJobs.map((job) => job.title))];

  return (
    <div className="mx-auto max-w-3xl">
      <Carousel opts={{ align: "start" }} className="relative">
        <CarouselContent className="-ml-3">

          {categories.map((role, index) => (
            <CarouselItem key={index} className="basis-auto pl-3">
              <button
                className="whitespace-nowrap rounded-full border px-5 py-2
                text-sm font-medium transition hover:bg-muted"
                onClick={() => navigate(`/browse?keyword=${role}`)}
              >
                {role}
              </button>
            </CarouselItem>
          ))}

        </CarouselContent>

        <CarouselPrevious className="-left-12 h-9 w-9" />
        <CarouselNext className="-right-12 h-9 w-9" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;