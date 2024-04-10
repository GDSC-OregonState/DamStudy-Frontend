import { useNavigate } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="hero">
      <div className="container flex flex-col md:flex-row mx-auto overflow-x-clip">
        <div className="space-y-6 md:w-1/2 my-12">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl font-sans text-center md:text-left">
            The Ultimate
            <span className="text-orange-600"> Study Room </span>
            Finder For <span className="text-orange-600">OSU</span> Students
          </h1>
          <p className="text-lg md:text-left text-center text-neutral-600 dark:text-neutral-400 md:w-5/6">
            Discover the best study rooms on campus. Leave reviews, explore what
            each room has to offer, and find the perfect spot to study.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Button variant="default" onClick={() => navigate("/gallery")}>
              Get started
            </Button>
            <Button variant="secondary" onClick={() => navigate("/about")}>
              Learn more
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <AspectRatio ratio={16 / 9}>
            <img
              src="/preview.png"
              alt="App preview"
              className="object-cover rounded-lg ring-1 ring-neutral-200 dark:ring-neutral-700 p-1 scale-150 translate-x-32"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};
export default Hero;
