"use client"; // For client-side interactions like placeholder filter changes, pagination

import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, ArrowUpDown, AlertCircle, CheckCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs"; // To ensure user is loaded

// Define types for log data
interface LogEntry {
  id: string;
  jobTitle: string;
  companyName?: string;
  platform: string;
  appliedAt: Date;
  status: "Applied" | "Failed" | "Pending" | "Viewed" | "Skipped";
  details?: string;
  sourceListingUrl: string;
}

// Placeholder data
const allLogEntries: LogEntry[] = [
  {
    id: "log1",
    jobTitle: "Senior React Developer",
    companyName: "Tech Solutions Inc.",
    platform: "LinkedIn",
    appliedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "Applied",
    details: "Successfully submitted application.",
    sourceListingUrl: "#",
  },
  {
    id: "log2",
    jobTitle: "UX Designer",
    companyName: "Creative Minds LLC",
    platform: "Upwork",
    appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: "Failed",
    details: "Error: Missing portfolio link in profile.",
    sourceListingUrl: "#",
  },
  {
    id: "log3",
    jobTitle: "Node.js Backend Engineer",
    platform: "Remote OK",
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "Viewed",
    details: "Application viewed by client.",
    sourceListingUrl: "#",
  },
  {
    id: "log4",
    jobTitle: "Project Manager",
    companyName: "Global Corp",
    platform: "LinkedIn",
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: "Pending",
    details: "Application sent, awaiting confirmation.",
    sourceListingUrl: "#",
  },
  {
    id: "log5",
    jobTitle: "Freelance Writer",
    platform: "Fiverr",
    appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    status: "Skipped",
    details: "Skipped: Job did not meet budget criteria.",
    sourceListingUrl: "#",
  },
  // Add more entries for pagination testing if needed
];

const ITEMS_PER_PAGE = 5; // Or make this configurable

export default function AutomationLogPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  // TODO: Add date filter state

  const filteredEntries = useMemo(() => {
    return allLogEntries
      .filter(entry => platformFilter === "all" || entry.platform === platformFilter)
      .filter(entry => statusFilter === "all" || entry.status === statusFilter);
    // TODO: Add date filtering logic
  }, [platformFilter, statusFilter]);

  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE);
  const currentEntries = filteredEntries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusBadgeVariant = (status: LogEntry["status"]): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Applied": return "default"; // Blue (default primary)
      case "Viewed": return "secondary"; // Green (using secondary for now)
      case "Failed": return "destructive"; // Red
      case "Pending": return "outline"; // Yellow/Orange (using outline)
      case "Skipped": return "outline"; // Gray (outline)
      default: return "outline";
    }
  };

  if (!isLoaded) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading user data...</div>;
  }
  if (!isSignedIn) {
    // Should be handled by middleware
    return <div className="container mx-auto px-4 py-12 text-center">Please sign in to view the automation log.</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          Automation Log
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Track all your automated job application activities and their statuses.
        </p>
      </header>

      {/* Filters Section */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg items-end">
        <div>
          <Label htmlFor="platformFilter" className="text-sm">Platform</Label>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger id="platformFilter"><SelectValue placeholder="Filter by platform" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Upwork">Upwork</SelectItem>
              <SelectItem value="Fiverr">Fiverr</SelectItem>
              <SelectItem value="Remote OK">Remote OK</SelectItem>
              <SelectItem value="Toptal">Toptal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="statusFilter" className="text-sm">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="statusFilter"><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Viewed">Viewed</SelectItem>
              <SelectItem value="Skipped">Skipped</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
            <Label htmlFor="startDate" className="text-sm">Start Date</Label>
            <Input type="date" id="startDate" placeholder="Start Date" disabled /> {/* Placeholder */}
        </div>
        <div>
            <Label htmlFor="endDate" className="text-sm">End Date</Label>
            <Input type="date" id="endDate" placeholder="End Date" disabled /> {/* Placeholder */}
        </div>
      </div>

      {/* Log Display Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-lg shadow">
        <Table>
          <TableCaption className="py-4">
            {filteredEntries.length === 0
                ? "No log entries found matching your criteria."
                : `Showing ${currentEntries.length} of ${filteredEntries.length} log entries.`
            }
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Job Title <Button variant="ghost" size="sm"><ArrowUpDown className="h-3 w-3"/></Button></TableHead>
              <TableHead>Platform <Button variant="ghost" size="sm"><ArrowUpDown className="h-3 w-3"/></Button></TableHead>
              <TableHead>Applied At <Button variant="ghost" size="sm"><ArrowUpDown className="h-3 w-3"/></Button></TableHead>
              <TableHead>Status <Button variant="ghost" size="sm"><ArrowUpDown className="h-3 w-3"/></Button></TableHead>
              <TableHead>Details/Error</TableHead>
              <TableHead className="text-right">Source Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEntries.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">
                  {log.jobTitle}
                  {log.companyName && <span className="block text-xs text-slate-500 dark:text-slate-400">{log.companyName}</span>}
                </TableCell>
                <TableCell>{log.platform}</TableCell>
                <TableCell>{log.appliedAt.toLocaleDateString()} {log.appliedAt.toLocaleTimeString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(log.status)}>{log.status}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate text-sm">
                  {log.details ? (
                    <span title={log.details} className="flex items-center">
                      {log.status === "Failed" && <AlertCircle className="h-4 w-4 mr-1 text-red-500 flex-shrink-0" />}
                      {log.status === "Applied" && <CheckCircle className="h-4 w-4 mr-1 text-green-500 flex-shrink-0" />}
                      {log.details}
                    </span>
                  ) : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild // To make the button act like a link
                  >
                    <a href={log.sourceListingUrl} target="_blank" rel="noopener noreferrer">
                      View <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
             {currentEntries.length === 0 && filteredEntries.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                        No automation logs yet. Once AutoApply starts working, your application history will appear here.
                    </TableCell>
                </TableRow>
            )}
            {currentEntries.length === 0 && filteredEntries.length > 0 && (
                 <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                        No entries for the current page or filters.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-700 dark:text-slate-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
