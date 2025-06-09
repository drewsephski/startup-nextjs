"use client";

// Placeholder for actual logos - using text names for now
const platforms = [
  { name: "Upwork" },
  { name: "Fiverr" },
  { name: "Toptal" },
  { name: "LinkedIn" },
  { name: "Remote OK" },
  // Add more as needed
];

export const SupportedPlatformsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-sm font-semibold uppercase text-primary tracking-wider">
          Works with Your Favorite Platforms
        </h2>
        <p className="mb-12 text-center text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Connect seamlessly with leading job boards and freelance marketplaces to broaden your reach and automate applications.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 lg:gap-x-16">
          {platforms.map((platform) => (
            <div key={platform.name} className="text-center">
              {/* Replace with <Image /> when logos are available */}
              <span className="text-2xl font-medium text-slate-700 dark:text-slate-300 hover:opacity-75 transition-opacity">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
