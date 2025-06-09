"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

// Placeholder data - this would come from the database / user's connected accounts
const platforms = [
  { name: "Upwork", status: "Connected", lastSynced: "2 min ago", id: "upwork" },
  { name: "LinkedIn", status: "Disconnected", lastSynced: "1 day ago", id: "linkedin" },
  { name: "Fiverr", status: "Needs Attention", lastSynced: "5 hours ago", id: "fiverr" },
  { name: "Toptal", status: "Not Connected", lastSynced: null, id: "toptal" },
  { name: "Remote OK", status: "Connected", lastSynced: "15 min ago", id: "remoteok" },
];

const statusIcons = {
  Connected: <CheckCircle className="h-5 w-5 text-green-500" />,
  Disconnected: <XCircle className="h-5 w-5 text-slate-500" />,
  "Needs Attention": <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  "Not Connected": <XCircle className="h-5 w-5 text-slate-500" />,
};

export const ConnectionStatusSection = () => {
  // TODO: Replace with actual link to account/billing or connection management page
  const manageConnectionUrl = "/dashboard/settings/accounts"; // Placeholder

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Platform Connections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <div className="flex items-center space-x-3">
              {statusIcons[platform.status as keyof typeof statusIcons] || statusIcons["Disconnected"]}
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">{platform.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {platform.status === "Connected" && platform.lastSynced
                    ? `Synced: ${platform.lastSynced}`
                    : platform.status === "Not Connected" ? "Not connected" : "Status: " + platform.status.toLowerCase()}
                </p>
              </div>
            </div>
            <Link href={manageConnectionUrl + `?platform=${platform.id}`}>
              <Button variant="outline" size="sm">
                {platform.status === "Connected" || platform.status === "Needs Attention" ? "Manage" : "Connect"}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ))}
         <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
          Connect your accounts to enable automated job applications.
        </p>
      </CardContent>
    </Card>
  );
};
