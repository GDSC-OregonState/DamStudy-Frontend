import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import Hero from "./hero";

export function AboutPage() {
  return (
    <>
      <section className="container prose prose-neutral dark:prose-invert max-w-2xl place-self-start my-24">
        <h1 className="font-medium text-5xl mb-8 tracking-tighter text-center font-bold">
          About <span className="dark:text-orange-600">DamStudy</span>
        </h1>
        <Card className="my-6 w-full">
          <CardHeader>
            <CardTitle className="text-2xl">About Damstudy</CardTitle>
            <CardDescription>Developed by the Google Developer Student Club at Oregon State University</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              What is this app?
              <br /><br />
              <span className="text-3xl">The perfect place to find your next <span className="dark:text-orange-600">STUDY SPOT</span></span>
            </p>
            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <CardTitle className="text-3xl my-6">Features</CardTitle>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 text-lg">
              Checkout our features!
            </p>
            <ul className=" my-6 list-disc list-inside ml-4">
             
              <li>View all the  different study rooms on campus. Check out reviews, locations, and more to decide where you need to grind out that homework due tonight at 11:59pm</li>
              <br></br>
              <li>Enjoy a study spot? Leave a review to let other's know what you think!</li>
              <br></br>
              <li>Search through all the study rooms on campus by name, activity level, or rating!</li>
            </ul>
            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <CardTitle className="text-3xl my-6">Contact Us</CardTitle>
            <p className="text-neutral-600 dark:text-neutral-400 text-m mb-3">
              If you have any questions or concerns, feel free to reach out to us
              through our portal:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>
                <a
                  href="https://gdsc.community.dev/oregon-state-university/"
                  className="text-orange-600 dark:text-orange-600 hover:underline"
                >
                  Google Developer Student Club
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
