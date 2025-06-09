"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListChecks, ExternalLink } from "lucide-react"; // Changed icon for "View Full Log"

// Placeholder data
const recentApplications = [
  {
    id: "app1",
    jobTitle: "Senior Backend Developer",
    companyName: "Innovatech Ltd.",
    platform: "LinkedIn",
    status: "Applied",
    appliedAt: "3 hours ago",
    sourceUrl: "#"
  },
  {
    id: "app2",
    jobTitle: "Cloud Infrastructure Engineer",
    companyName: "SkyNet Solutions",
    platform: "Remote OK",
    status: "Pending",
    appliedAt: "1 day ago",
    sourceUrl: "#"
  },
  {
    id: "app3",
    jobTitle: "Freelance UI/UX Designer",
    companyName: "Creative Co.",
    platform: "Upwork",
    status: "Viewed",
    appliedAt: "2 days ago",
    sourceUrl: "#"
  },
];

const statusColors: { [key: string]: string } = {
  Applied: "text-blue-500 dark:text-blue-400",
  Pending: "text-amber-500 dark:text-amber-400",
  Viewed: "text-green-500 dark:text-green-400",
  Failed: "text-red-500 dark:text-red-400",
};

export const ApplicationTimelineSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Application Timeline</CardTitle>
        <CardDescription>A quick look at your recent application activities.</CardDescription>
      </CardHeader>
      <CardContent>
        {recentApplications.length > 0 ? (
          <ul className="space-y-4">
            {recentApplications.map((app) => (
              <li key={app.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-100">
                      {app.jobTitle} {app.companyName && `at ${app.companyName}`}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      via {app.platform} - <span className={statusColors[app.status] || "text-slate-500"}>{app.status}</span>
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-xs text-slate-400 dark:text-slate-500 text-right">
                     {app.appliedAt}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 text-xs h-auto py-0 px-1"
                      onClick={() => window.open(app.sourceUrl, "_blank")} // Open in new tab
                    >
                       <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400 py-6">
            No recent application activity. Start applying to see your timeline!
          </p>
        )}
        <div className="mt-6 text-center">
          {/* TODO: Link to actual Automation Log page */}
          <Button variant="outline" onClick={() => alert("Navigating to Automation Log page...")}>
            View Full Automation Log <ListChecks className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
