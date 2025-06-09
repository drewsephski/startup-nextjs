"use client";

import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, FileText, Save, PlusCircle, Trash2 } from "lucide-react";

// Define the structure for resume data
export interface WorkExperienceEntry {
  id?: string; // For dynamic list key
  jobTitle: string;
  company: string;
  dates: string;
  description: string;
}
export interface EducationEntry {
  id?: string; // For dynamic list key
  degree: string;
  institution: string;
  dates: string;
  description: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phoneNumber: string;
  linkedinProfileUrl: string;
  portfolioUrl: string;
  summary: string;
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: string; // Comma-separated
  selectedTemplate: string; // e.g., "Simple", "Modern", "Creative"
  resumeFile: File | null;
  resumeFileName: string;
}

interface ResumeSectionProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

const initialWorkExperienceEntry: WorkExperienceEntry = { jobTitle: "", company: "", dates: "", description: "" };
const initialEducationEntry: EducationEntry = { degree: "", institution: "", dates: "", description: "" };


export const ResumeSection = ({ resumeData, setResumeData }: ResumeSectionProps) => {
  const [activeResumeTab, setActiveResumeTab] = useState<"upload" | "build">("build");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeData(prev => ({ ...prev, resumeFile: file, resumeFileName: file.name }));
      console.log("File selected:", file.name);
    }
  };

  const handleUpload = () => {
    if (resumeData.resumeFile) {
      console.log("Uploading file:", resumeData.resumeFile.name);
      alert(`Simulating upload of ${resumeData.resumeFile.name}. Not actually uploaded.`);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleTemplateChange = (template: string) => {
    setResumeData(prev => ({ ...prev, selectedTemplate: template }));
    alert(`Template "${template}" selected (UI only).`);
  };

  // Handlers for Work Experience
  const handleWorkExperienceChange = (index: number, field: keyof WorkExperienceEntry, value: string) => {
    const updatedExperience = resumeData.workExperience.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setResumeData(prev => ({ ...prev, workExperience: updatedExperience }));
  };

  const addWorkExperience = () => {
    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, { ...initialWorkExperienceEntry, id: Date.now().toString() }]
    }));
  };

  const removeWorkExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  // Handlers for Education
  const handleEducationChange = (index: number, field: keyof EducationEntry, value: string) => {
    const updatedEducation = resumeData.education.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setResumeData(prev => ({ ...prev, education: updatedEducation }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { ...initialEducationEntry, id: Date.now().toString() }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };


  const handleSaveResume = () => {
    console.log("Save Resume Data clicked. Data:", resumeData);
    alert("Save Resume Data: Functionality not implemented. Data logged to console.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume</CardTitle>
        <CardDescription>Upload an existing resume or build one using our templates and fields.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeResumeTab} onValueChange={(value) => setActiveResumeTab(value as "upload" | "build")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="build">Build Resume</TabsTrigger>
            <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          </TabsList>

          {/* Build Resume Tab */}
          <TabsContent value="build" className="space-y-6">
            <div className="mb-4">
              <Label className="text-base block mb-2">Resume Template</Label>
              <div className="flex gap-2 flex-wrap">
                {["Simple", "Modern", "Creative"].map(template => (
                  <Button
                    key={template}
                    variant={resumeData.selectedTemplate === template ? "default" : "outline"}
                    onClick={() => handleTemplateChange(template)}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>

            <h4 className="text-lg font-semibold border-b pb-2 dark:border-slate-700">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="fullName">Full Name</Label><Input id="fullName" name="fullName" value={resumeData.fullName} onChange={handleInputChange} /></div>
              <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={resumeData.email} onChange={handleInputChange} /></div>
              <div><Label htmlFor="phoneNumber">Phone Number</Label><Input id="phoneNumber" name="phoneNumber" value={resumeData.phoneNumber} onChange={handleInputChange} /></div>
              <div><Label htmlFor="linkedinProfileUrl">LinkedIn Profile URL</Label><Input id="linkedinProfileUrl" name="linkedinProfileUrl" value={resumeData.linkedinProfileUrl} onChange={handleInputChange} /></div>
              <div><Label htmlFor="portfolioUrl">Portfolio/Website URL (Optional)</Label><Input id="portfolioUrl" name="portfolioUrl" value={resumeData.portfolioUrl} onChange={handleInputChange} /></div>
            </div>

            <h4 className="text-lg font-semibold border-b pb-2 dark:border-slate-700 mt-6">Summary/Objective</h4>
            <div><Label htmlFor="summary" className="sr-only">Summary/Objective</Label><Textarea id="summary" name="summary" value={resumeData.summary} onChange={handleInputChange} placeholder="Brief professional summary..." rows={4} /></div>

            <h4 className="text-lg font-semibold border-b pb-2 dark:border-slate-700 mt-6">Work Experience</h4>
            {resumeData.workExperience.map((exp, index) => (
              <div key={exp.id || index} className="p-4 border rounded-md space-y-3 dark:border-slate-700 relative">
                {resumeData.workExperience.length > 1 && (
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => removeWorkExperience(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
                <div><Label htmlFor={`workTitle-${index}`}>Job Title</Label><Input id={`workTitle-${index}`} value={exp.jobTitle} onChange={e => handleWorkExperienceChange(index, "jobTitle", e.target.value)} /></div>
                <div><Label htmlFor={`workCompany-${index}`}>Company</Label><Input id={`workCompany-${index}`} value={exp.company} onChange={e => handleWorkExperienceChange(index, "company", e.target.value)} /></div>
                <div><Label htmlFor={`workDates-${index}`}>Dates (e.g., Jan 2020 - Present)</Label><Input id={`workDates-${index}`} value={exp.dates} onChange={e => handleWorkExperienceChange(index, "dates", e.target.value)} /></div>
                <div><Label htmlFor={`workDesc-${index}`}>Description</Label><Textarea id={`workDesc-${index}`} value={exp.description} onChange={e => handleWorkExperienceChange(index, "description", e.target.value)} rows={3} /></div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addWorkExperience}><PlusCircle className="mr-2 h-4 w-4" /> Add Work Experience</Button>

            <h4 className="text-lg font-semibold border-b pb-2 dark:border-slate-700 mt-6">Education</h4>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id || index} className="p-4 border rounded-md space-y-3 dark:border-slate-700 relative">
                 {resumeData.education.length > 1 && (
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => removeEducation(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                 )}
                <div><Label htmlFor={`eduDegree-${index}`}>Degree/Certificate</Label><Input id={`eduDegree-${index}`} value={edu.degree} onChange={e => handleEducationChange(index, "degree", e.target.value)} /></div>
                <div><Label htmlFor={`eduInstitution-${index}`}>Institution</Label><Input id={`eduInstitution-${index}`} value={edu.institution} onChange={e => handleEducationChange(index, "institution", e.target.value)} /></div>
                <div><Label htmlFor={`eduDates-${index}`}>Dates (e.g., Aug 2016 - May 2020)</Label><Input id={`eduDates-${index}`} value={edu.dates} onChange={e => handleEducationChange(index, "dates", e.target.value)} /></div>
                <div><Label htmlFor={`eduDesc-${index}`}>Description/Achievements (Optional)</Label><Textarea id={`eduDesc-${index}`} value={edu.description} onChange={e => handleEducationChange(index, "description", e.target.value)} rows={2} /></div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addEducation}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>

            <h4 className="text-lg font-semibold border-b pb-2 dark:border-slate-700 mt-6">Skills</h4>
            <div><Label htmlFor="skills">Skills (Comma-separated)</Label><Input id="skills" name="skills" value={resumeData.skills} onChange={handleInputChange} placeholder="e.g., JavaScript, Project Management, Figma" /></div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSaveResume} variant="default">
                <Save className="mr-2 h-4 w-4" /> Save Resume Data
              </Button>
            </div>
          </TabsContent>

          {/* Upload Resume Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="p-6 border-2 border-dashed rounded-lg text-center dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors">
              <UploadCloud className="mx-auto h-12 w-12 text-slate-400 mb-3" />
              <Label htmlFor="resumeUpload" className="text-lg font-medium text-primary cursor-pointer hover:underline">
                Choose a file to upload
              </Label>
              <Input id="resumeUpload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                PDF, DOC, DOCX up to 5MB.
              </p>
              {resumeData.resumeFileName && (
                <p className="mt-3 text-sm text-green-600 dark:text-green-400">Selected: {resumeData.resumeFileName}</p>
              )}
            </div>
            <Button onClick={handleUpload} disabled={!resumeData.resumeFile} className="w-full md:w-auto">
              <FileText className="mr-2 h-4 w-4" /> Upload Selected Resume
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
