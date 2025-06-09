import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link"; // For CTAs

// Import dashboard section components (will be created next)
import { GreetingHeader } from "@/components/dashboard/GreetingHeader";
import { ConnectionStatusSection } from "@/components/dashboard/ConnectionStatusSection";
import { JobMatchPreviewSection } from "@/components/dashboard/JobMatchPreviewSection";
import { ApplicationTimelineSection } from "@/components/dashboard/ApplicationTimelineSection";
import { UpgradeBanner } from "@/components/dashboard/UpgradeBanner";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard | Autoapply",
  description: "Manage your job applications, connections, and preferences.",
};

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    // This case should ideally be handled by middleware, but as a fallback:
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>You must be logged in to view this page.</p>
        <Link href="/sign-in" className="text-primary hover:underline mt-4 inline-block">
          Sign In
        </Link>
      </div>
    );
  }

  // Placeholder user subscription status (assuming FREE for now)
  const subscriptionStatus = "FREE"; // Will be fetched from User model later

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <GreetingHeader name={user.firstName || user.emailAddresses[0]?.emailAddress || "User"} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12 mt-8">
        {/* Main Content Area (Left/Top on Mobile) */}
        <div className="lg:col-span-2 space-y-8">
          <JobMatchPreviewSection />
          <ApplicationTimelineSection />
        </div>

        {/* Sidebar Area (Right/Bottom on Mobile) */}
        <div className="space-y-8">
          <ConnectionStatusSection />
          {subscriptionStatus === "FREE" && <UpgradeBanner />}
        </div>
      </div>
    </div>
  );
}
