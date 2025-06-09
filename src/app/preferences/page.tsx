"use client"; // This page will have client-side interactivity for the form

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // Client-side hook to get user info

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Save } from "lucide-react";

// Define types for form state
interface PlatformSettings {
  enabled: boolean;
  autoApply: boolean;
}

interface PreferencesFormState {
  keywords: string;
  budgetMin: string; // Store as string to handle empty input for numbers
  budgetMax: string;
  jobTypes: {
    fullTime: boolean;
    partTime: boolean;
    contract: boolean;
    freelance: boolean;
  };
  platforms: {
    upwork: PlatformSettings;
    linkedin: PlatformSettings;
    fiverr: PlatformSettings;
    toptal: PlatformSettings;
    remoteok: PlatformSettings;
  };
  enableSmartMatching: boolean;
}

const platformDisplayNames: Record<keyof PreferencesFormState["platforms"], string> = {
  upwork: "Upwork",
  linkedin: "LinkedIn",
  fiverr: "Fiverr",
  toptal: "Toptal",
  remoteok: "Remote OK",
};

export default function PreferencesPage() {
  const { user, isLoaded } = useUser();
  const [clerkUserId, setClerkUserId] = useState<string | null>(null);

  const [formState, setFormState] = useState<PreferencesFormState>({
    keywords: "",
    budgetMin: "",
    budgetMax: "",
    jobTypes: {
      fullTime: false,
      partTime: false,
      contract: false,
      freelance: false,
    },
    platforms: {
      upwork: { enabled: false, autoApply: false },
      linkedin: { enabled: false, autoApply: false },
      fiverr: { enabled: false, autoApply: false },
      toptal: { enabled: false, autoApply: false },
      remoteok: { enabled: false, autoApply: false },
    },
    enableSmartMatching: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isLoaded && user) {
      setClerkUserId(user.id);
      // TODO: Fetch and pre-fill preferences if they exist for this user
      // For now, initializing with default/empty state
      console.log("Current Clerk User ID:", user.id);
    }
  }, [isLoaded, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
        setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleJobTypeChange = (jobType: keyof PreferencesFormState["jobTypes"]) => {
    setFormState(prev => ({
      ...prev,
      jobTypes: { ...prev.jobTypes, [jobType]: !prev.jobTypes[jobType] },
    }));
  };

  const handlePlatformChange = (
    platform: keyof PreferencesFormState["platforms"],
    field: keyof PlatformSettings
  ) => {
    setFormState(prev => {
      const currentPlatformState = prev.platforms[platform];
      const newState = {
        ...prev.platforms,
        [platform]: { ...currentPlatformState, [field]: !currentPlatformState[field] },
      };
      // If 'enabled' is unchecked, 'autoApply' should also be unchecked
      if (field === 'enabled' && !newState[platform].enabled) {
        newState[platform].autoApply = false;
      }
      return { ...prev, platforms: newState };
    });
  };

  const handlePlatformAutoApplyChange = (platform: keyof PreferencesFormState["platforms"]) => {
    setFormState(prev => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: { ...prev.platforms[platform], autoApply: !prev.platforms[platform].autoApply }
      }
    }));
  };


  const handleSmartMatchingChange = (checked: boolean) => {
    setFormState(prev => ({ ...prev, enableSmartMatching: checked }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formState.keywords.trim()) {
      errors.keywords = "Keywords cannot be empty.";
    }
    if (formState.budgetMin && isNaN(Number(formState.budgetMin))) {
      errors.budgetMin = "Minimum budget must be a number.";
    }
    if (formState.budgetMax && isNaN(Number(formState.budgetMax))) {
      errors.budgetMax = "Maximum budget must be a number.";
    }
    if (formState.budgetMin && formState.budgetMax && Number(formState.budgetMin) > Number(formState.budgetMax)) {
        errors.budgetMax = "Maximum budget cannot be less than minimum budget.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted. Clerk User ID:", clerkUserId, "Preferences:", formState);
      // TODO: Implement actual saving to database
      alert("Preferences (logged to console for now). DB saving not yet implemented.");
    } else {
      console.log("Form validation failed", formErrors);
    }
  };

  if (!isLoaded) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading user data...</div>;
  }
  if (!user) {
    // Should be handled by middleware, but good to have a fallback.
    return <div className="container mx-auto px-4 py-12 text-center">Please sign in to set preferences.</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          Job Preferences
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Tailor your job search criteria to find the perfect opportunities.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Criteria</CardTitle>
            <CardDescription>Define the core aspects of your desired jobs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="keywords" className="text-base">Keywords</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Enter comma-separated keywords or phrases (e.g., "React Developer, Technical Writer, UX Designer").
              </p>
              <Input
                id="keywords"
                name="keywords"
                value={formState.keywords}
                onChange={handleInputChange}
                placeholder="e.g., Next.js, Python, UI/UX Design"
              />
              {formErrors.keywords && <p className="text-sm text-red-500 mt-1">{formErrors.keywords}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="budgetMin" className="text-base">Minimum Rate/Salary</Label>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    (e.g., hourly rate, project budget, annual salary)
                </p>
                <Input
                  id="budgetMin"
                  name="budgetMin"
                  type="number"
                  value={formState.budgetMin}
                  onChange={handleInputChange}
                  placeholder="e.g., 50 (for $/hr) or 50000 (for annual)"
                />
                {formErrors.budgetMin && <p className="text-sm text-red-500 mt-1">{formErrors.budgetMin}</p>}
              </div>
              <div>
                <Label htmlFor="budgetMax" className="text-base">Maximum Rate/Salary (Optional)</Label>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Leave blank if no upper limit.
                </p>
                <Input
                  id="budgetMax"
                  name="budgetMax"
                  type="number"
                  value={formState.budgetMax}
                  onChange={handleInputChange}
                  placeholder="e.g., 80 or 80000"
                />
                {formErrors.budgetMax && <p className="text-sm text-red-500 mt-1">{formErrors.budgetMax}</p>}
              </div>
            </div>

            <div>
              <Label className="text-base mb-2 block">Preferred Job Types</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(Object.keys(formState.jobTypes) as Array<keyof PreferencesFormState["jobTypes"]>).map(jobType => (
                  <div key={jobType} className="flex items-center space-x-2">
                    <Checkbox
                      id={`jobType-${jobType}`}
                      checked={formState.jobTypes[jobType]}
                      onCheckedChange={() => handleJobTypeChange(jobType)}
                    />
                    <Label htmlFor={`jobType-${jobType}`} className="capitalize font-normal text-sm">
                      {jobType.replace(/([A-Z])/g, ' $1').trim()} {/* Converts camelCase to Title Case */}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
            <CardDescription>Configure which job platforms to search and auto-apply on.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(Object.keys(formState.platforms) as Array<keyof PreferencesFormState["platforms"]>).map(platformKey => (
              <div key={platformKey} className="p-4 border dark:border-slate-700 rounded-md space-y-3">
                <h4 className="font-semibold text-lg text-slate-800 dark:text-slate-200">{platformDisplayNames[platformKey]}</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`platform-enabled-${platformKey}`}
                    checked={formState.platforms[platformKey].enabled}
                    onCheckedChange={() => handlePlatformChange(platformKey, "enabled")}
                  />
                  <Label htmlFor={`platform-enabled-${platformKey}`} className="font-normal">
                    Enable searching on {platformDisplayNames[platformKey]}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 pl-2">
                  <Checkbox
                    id={`platform-autoapply-${platformKey}`}
                    checked={formState.platforms[platformKey].autoApply}
                    onCheckedChange={() => handlePlatformAutoApplyChange(platformKey)}
                    disabled={!formState.platforms[platformKey].enabled}
                  />
                  <Label
                    htmlFor={`platform-autoapply-${platformKey}`}
                    className={`font-normal ${!formState.platforms[platformKey].enabled ? 'text-slate-400 dark:text-slate-600' : ''}`}
                  >
                    Enable Auto-Apply on {platformDisplayNames[platformKey]}
                  </Label>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableSmartMatching" className="text-base">
                  Enable Smart Matching
                </Label>
                <div className="flex items-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mr-1">
                        AI-enhanced relevance for job matching (uses more tokens).
                    </p>
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-slate-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Smart Matching uses advanced AI models to better understand job descriptions and your profile, potentially leading to more relevant matches but consuming more resources.</p>
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                </div>
              </div>
              <Switch
                id="enableSmartMatching"
                checked={formState.enableSmartMatching}
                onCheckedChange={handleSmartMatchingChange}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg">
            <Save className="mr-2 h-5 w-5" /> Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
