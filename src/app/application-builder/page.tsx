"use client"; // For state and interactivity

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoverLetterSection } from "@/components/application-builder/CoverLetterSection";
import { ResumeSection, ResumeData } from "@/components/application-builder/ResumeSection"; // ResumeData will be defined in ResumeSection
import { PreviewSection } from "@/components/application-builder/PreviewSection";
import { useUser } from "@clerk/nextjs"; // To ensure user is loaded, though not directly used for data yet

export interface ApplicationData {
  coverLetter: string;
  resume: ResumeData; // Will define this type in ResumeSection.tsx
  // resumeFile?: File; // Optional: for uploaded file
  // resumeFileName?: string;
}

export default function ApplicationBuilderPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [coverLetterContent, setCoverLetterContent] = useState<string>("");
  const [resumeData, setResumeData] = useState<ResumeData>({ // Initial empty state for resume
    fullName: "",
    email: "",
    phoneNumber: "",
    linkedinProfileUrl: "",
    portfolioUrl: "",
    summary: "",
    workExperience: [{ jobTitle: "", company: "", dates: "", description: "" }],
    education: [{ degree: "", institution: "", dates: "", description: "" }],
    skills: "",
    selectedTemplate: "Simple", // Default template
    resumeFile: null,
    resumeFileName: "",
  });

  const applicationData: ApplicationData = {
    coverLetter: coverLetterContent,
    resume: resumeData,
  };

  if (!isLoaded) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading user data...</div>;
  }
  if (!isSignedIn) {
    // Should be handled by middleware, but good to have a fallback.
    return <div className="container mx-auto px-4 py-12 text-center">Please sign in to access the Application Builder.</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          Application Builder
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Craft your cover letters and resumes, then preview your application.
        </p>
      </header>

      <Tabs defaultValue="cover-letter" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="cover-letter">1. Cover Letter</TabsTrigger>
          <TabsTrigger value="resume">2. Resume</TabsTrigger>
          <TabsTrigger value="preview">3. Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="cover-letter">
          <CoverLetterSection
            value={coverLetterContent}
            onChange={setCoverLetterContent}
          />
        </TabsContent>
        <TabsContent value="resume">
          <ResumeSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </TabsContent>
        <TabsContent value="preview">
          <PreviewSection applicationData={applicationData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
