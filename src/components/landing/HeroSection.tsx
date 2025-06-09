"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl lg:text-6xl">
          Automate Your Job Search, Land Your Next Gig Faster
        </h1>
        <p className="mb-10 text-lg text-slate-700 dark:text-slate-300 md:text-xl lg:text-2xl max-w-3xl mx-auto">
          Stop wasting time on manual applications. AutoApply connects to your favorite job platforms, finds relevant postings, and applies for you using your tailored preferences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/sign-up">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto bg-white dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Learn More <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
        {/* Optional: Placeholder for a product image or illustration below CTAs */}
        {/* <div className="mt-12 md:mt-16">
          <img src="/placeholder-hero.svg" alt="AutoApply in action" className="mx-auto rounded-lg shadow-xl w-full max-w-2xl" />
        </div> */}
      </div>
    </section>
  );
};
