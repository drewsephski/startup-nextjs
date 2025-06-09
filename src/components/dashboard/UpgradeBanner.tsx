"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react"; // Icon for "Upgrade" or "Premium"
import Link from "next/link";

export const UpgradeBanner = () => {
  // TODO: Replace with actual link to account/billing page
  const upgradeUrl = "/dashboard/settings/billing"; // Placeholder

  return (
    <div className="p-6 bg-gradient-to-r from-primary to-yellow-400 dark:from-primary dark:to-yellow-600 rounded-lg shadow-lg text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <h3 className="text-xl font-semibold">
            <Zap className="inline-block h-5 w-5 mr-2" />
            Unlock More Power with Premium!
          </h3>
          <p className="text-sm opacity-90 mt-1">
            Get unlimited applications, advanced AI matching, priority support, and more.
          </p>
        </div>
        <Link href={upgradeUrl}>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-primary hover:bg-slate-100 dark:bg-slate-50 dark:hover:bg-slate-200 w-full sm:w-auto"
          >
            Upgrade Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
