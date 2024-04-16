export function AboutPage() {
  return (
    <>
      <section className="container prose prose-neutral dark:prose-invert max-w-2xl place-self-start my-24">
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          about damstudy
        </h1>
        <div className="prose prose-neutral dark:prose-invert">
          <p>
            damstudy is being developed by the Google Developer Student Club at
            Oregon State University. The goal of this project is to provide a
            platform for students to find study rooms on campus.
          </p>
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
          <h2 className="font-medium text-xl mb-1 tracking-tighter">
            features
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
            roadmap of features to be implemented:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>view stored study rooms</li>
            <li>leave reviews for study rooms</li>
            <li>search for study rooms</li>
          </ul>
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />

          <h2 className="font-medium text-xl mb-1 tracking-tighter">
            contact us
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
            if you have any questions or concerns, feel free to reach out to us
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
        </div>
      </section>
    </>
  );
}
