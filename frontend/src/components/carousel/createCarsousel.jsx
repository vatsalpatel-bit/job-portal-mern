import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const roles = [
  "Mobile App Developer",
  "Data Analyst",
  "DevOps Engineer",
  "Graphic Designer",
  "UI/UX Designer",
  "Frontend Developer",
  "Backend Developer",
];

const CategoryCarousel = () => {
  return (
    <div className="mx-auto max-w-3xl">

      <Carousel opts={{ align: "start" }} className="relative">
        <CarouselContent className="-ml-3">

          {roles.map((role, index) => (
            <CarouselItem key={index} className="basis-auto pl-3">
              <button
                className="whitespace-nowrap rounded-full border px-5 py-2
                text-sm font-medium transition hover:bg-muted"
              >
                {role}
              </button>
            </CarouselItem>
          ))}

        </CarouselContent>

        {/* Clean arrows */}
        <CarouselPrevious className="-left-12 h-9 w-9" />
        <CarouselNext className="-right-12 h-9 w-9" />
      </Carousel>

    </div>
  );
};

export default CategoryCarousel;
