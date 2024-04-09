import ErrorGraphic from "@/components/error-graphic";
import { Route, Routes } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";

const children = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
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

function Home() {
  return (
    <>
      <div className=" p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Home</h1>
        <a href="/about">About</a>
      </div>
    </>
  );
}

function About() {
  return (
    <>
      <div className=" p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">About</h1>
        <a href="/">Home</a>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <header className="p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">DamStudy</h1>
        <ModeToggle />
      </header>
      <div className="flex items-center justify-center min-h-screen">
        {children}
      </div>
    </>
  );
}

export default App;
