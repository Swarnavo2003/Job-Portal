import useJobStore from "@/store/useJobStore";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useNavigate } from "react-router";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Devops Engineer",
];

const CategoryCarousel = () => {
  const { setSearchQuery } = useJobStore();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    setSearchQuery(query);
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 md:basis-1/3 lg-basis-1/4"
            >
              <Button
                onClick={() => searchJobHandler(item)}
                variant={"outline"}
                className="rounded-full"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
