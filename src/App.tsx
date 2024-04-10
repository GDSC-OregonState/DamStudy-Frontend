import ErrorGraphic from "@/components/error-graphic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AboutPage } from "./components/about";
import { ExplorePage } from "./components/explore";
import Hero from "./components/hero";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";

const children = (
  <Routes>
    {/* Landing/Index */}
    <Route path="/" element={<Home />} />
    {/* About */}
    <Route path="/about" element={<About />} />
    {/* Main */}
    <Route path="/explore" element={<Explore />} />
    <Route path="/study-room/:id" element={<Explore />} />
    {/* 404 */}
    <Route
      path="*"
      element={<ErrorFallback error={new Error("404 Not Found")} />}
    />
  </Routes>
);

function ErrorFallback({ error }: { error: Error }) {
  return (
    <>
      {/* Graphic from https://www.opendoodles.com/ - I also like https://undraw.co */}
      <div className="grid place-content-center px-4">
        <div className="text-center">
          <ErrorGraphic />

          <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-4xl">
            Uh-oh!
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Looks like you navigated to a page that doesn't exist. <br /> Please
            check the URL in the address bar and try again.
            <br /> Error: {error.message}
          </p>

          <div className="mt-8">
            <a href="/" className="text-base font-medium">
              Go back home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function Explore() {
  return (
    <div className="w-full h-screen">
      <ExplorePage />
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

function About() {
  return (
    <>
      <AboutPage />
    </>
  );
}

function App() {
  const navigate = useNavigate();
  return (
    <>
      <header className="p-4 flex justify-around md:-space-x-96 items-center">
        <h1 className="text-2xl font-bold">DamStudy</h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-4 self-center">
            <Button variant="link" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="link" onClick={() => navigate("/about")}>
              About
            </Button>
            <Button variant="link" onClick={() => navigate("/explore")}>
              Explore
            </Button>
            <ModeToggle />
          </ul>
        </nav>

        <nav className="md:hidden flex space-x-12">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HamburgerMenuIcon className="text-orange-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button variant="link" onClick={() => navigate("/")}>
                  Home
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="link" onClick={() => navigate("/about")}>
                  About
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="link" onClick={() => navigate("/explore")}>
                  Explore
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </nav>
      </header>
      <div className="flex items-center justify-center min-h-[90dvh]">
        {children}
      </div>
      <footer id="footer" className="mt-12 p-4 text-center text-sm">
        <p>
          DamStudy is being developed by the{" "}
          <a
            href="https://gdsc.community.dev/oregon-state-university/"
            className="text-orange-600 dark:text-orange-600 hover:underline"
          >
            Google Developer Student Club
          </a>{" "}
          at Oregon State University
        </p>
      </footer>
    </>
  );
}

export default App;
