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

  // Extract unique job titles
  const categories = [...new Set(allJobs.map((job) => job.title))];

  return (
    <div className="mx-auto max-w-4xl">

      <Carousel
        opts={{ align: "start" }}
        className="relative"
      >

        <CarouselContent className="-ml-3 py-2">

          {categories.map((role, index) => (

            <CarouselItem
              key={index}
              className="basis-auto pl-3"
            >

              <button
                className="
                whitespace-nowrap
                rounded-2xl
                bg-white/90
                backdrop-blur-md
                border border-white/60
                px-5 py-3
                text-sm font-medium text-gray-700
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-black
                hover:text-white
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]
                "
                onClick={() => navigate(`/browse?keyword=${role}`)}
              >
                {role}
              </button>

            </CarouselItem>

          ))}

        </CarouselContent>

        {/* Previous */}
        <CarouselPrevious
          className="
          -left-14
          h-11 w-11
          rounded-2xl
          border-0
          bg-white/90
          backdrop-blur-md
          shadow-md
          hover:bg-black
          hover:text-white
          transition-all duration-300
          "
        />

        {/* Next */}
        <CarouselNext
          className="
          -right-14
          h-11 w-11
          rounded-2xl
          border-0
          bg-white/90
          backdrop-blur-md
          shadow-md
          hover:bg-black
          hover:text-white
          transition-all duration-300
          "
        />

      </Carousel>

    </div>
  );
};

export default CategoryCarousel;