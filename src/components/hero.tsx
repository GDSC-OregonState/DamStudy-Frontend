import { cn } from "@/lib/utils";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button, buttonVariants } from "./ui/button";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="hero">
      <div className="container flex flex-col lg:flex-row mx-auto lg:overflow-x-clip">
        <div className="space-y-6 lg:w-1/2 my-12">
          <a
            href="https://discord.gg/pvfa69B4gb"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex items-center justify-start w-min self-center place-self-center mx-auto"
            )}
            target="_blank"
          >
            This project is a work in progress. Join the GDSC@OSU Discord to
            contribute!
            <DiscordLogoIcon className="ml-2 size-4" />
          </a>
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl font-sans text-center lg:text-left">
            The Ultimate
            <span className="text-orange-600"> Study Room </span>
            Finder For <span className="text-orange-600">OSU</span> Students
          </h1>
          <p className="text-lg max-w-xl lg:max-w-md mx-auto lg:mx-2 lg:text-left text-center text-neutral-600 dark:text-neutral-400 lg:w-5/6">
            Discover the best study rooms on campus. Leave reviews, explore what
            each room has to offer, and find the perfect spot to study.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <Button variant="default" onClick={() => navigate("/gallery")}>
              Get started
            </Button>
            <Button variant="secondary" onClick={() => navigate("/about")}>
              Learn more
            </Button>
          </div>
        </div>
        <div className=" lg:w-1/2 lg:mt-20">
          <AspectRatio ratio={16 / 9}>
            <img
              src="/preview.png"
              alt="App preview"
              className="object-cover rounded-lg ring-1 ring-neutral-200 dark:ring-neutral-700 p-1 lg:scale-150 lg:translate-x-32"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};
export default Hero;
