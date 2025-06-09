import { HeroSection } from "@/components/landing/HeroSection";
import { SupportedPlatformsSection } from "@/components/landing/SupportedPlatformsSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoApply | Automate Your Job Search",
  description: "AutoApply helps you automate your job search across multiple platforms, find relevant gigs, and apply faster.",
  // TODO: Add more specific open graph tags, keywords, etc.
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SupportedPlatformsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      {/* The main Footer is already part of src/app/layout.tsx, so it doesn't need to be added here explicitly */}
    </>
  );
}
