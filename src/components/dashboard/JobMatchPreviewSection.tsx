"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Briefcase, DollarSign, ExternalLink } from "lucide-react";

// Placeholder data
const jobMatches = [
  {
    id: "1",
    title: "Senior Frontend Developer (React)",
    platform: "Upwork",
    description: "Looking for an experienced React developer to build a modern web application...",
    rate: "$60 - $80 /hr",
  },
  {
    id: "2",
    title: "UX/UI Designer for Mobile App",
    platform: "LinkedIn",
    description: "Seeking a creative UX/UI designer to craft an intuitive mobile experience.",
    rate: "$5,000 project budget",
  },
  {
    id: "3",
    title: "Backend Engineer (Node.js, PostgreSQL)",
    platform: "Remote OK",
    description: "Join our team to develop and maintain scalable backend services.",
    rate: "$90,000 - $120,000 /year",
  },
];

export const JobMatchPreviewSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Job Matches</CardTitle>
        <CardDescription>Based on your current preferences. Refine using filters below.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <Input
            type="text"
            placeholder="Keywords (e.g., React, Node.js)"
            className="bg-white dark:bg-slate-700"
            // icon={<Search className="h-4 w-4 text-slate-400" />} // Input doesn't take icon prop directly
          />
          <Select>
            <SelectTrigger className="bg-white dark:bg-slate-700">
              <SelectValue placeholder="Job Type (e.g., Full-time)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Job Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract/Freelance</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Rate / Budget (e.g., $50/hr, $5k project)"
            className="bg-white dark:bg-slate-700"
            // icon={<DollarSign className="h-4 w-4 text-slate-400" />}
          />
          {/* TODO: Add a "Apply Filters" button or make filters apply on change */}
        </div>

        {/* Job List Section */}
        <div className="space-y-4">
          {jobMatches.map((job) => (
            <Card key={job.id} className="bg-slate-50 dark:bg-slate-800/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-medium text-slate-900 dark:text-slate-100">{job.title}</CardTitle>
                    <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
                      via {job.platform}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => alert(`Viewing details for ${job.title}`)}>
                    View <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              {job.description && (
                <CardContent>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <DollarSign className="h-3 w-3 mr-1" />
                    <span>{job.rate}</span>
                  </div>
                </CardContent>
              )}
              {/* Optional: CardFooter for Apply button or quick actions */}
              {/* <CardFooter className="flex justify-end">
                <Button size="sm" onClick={() => alert(`Applying to ${job.title}`)}>Apply Now</Button>
              </CardFooter> */}
            </Card>
          ))}
          {jobMatches.length === 0 && (
            <p className="text-center text-slate-500 dark:text-slate-400 py-6">
              No job matches found based on your current preferences. Try adjusting your filters or connecting more platforms.
            </p>
          )}
        </div>
         <div className="mt-6 text-center">
            <Button variant="ghost" onClick={() => alert("Navigating to Job Search page...")}>
                View All Matches & Manage Preferences <Search className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};
