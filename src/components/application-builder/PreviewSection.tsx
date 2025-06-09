"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ApplicationData } from "@/app/application-builder/page"; // Import the shared interface

interface PreviewSectionProps {
  applicationData: ApplicationData;
}

export const PreviewSection = ({ applicationData }: PreviewSectionProps) => {
  const { coverLetter, resume } = applicationData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Preview</CardTitle>
        <CardDescription>
          This is a simplified preview of the content you've prepared.
          Actual appearance on job platforms may vary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Cover Letter Preview */}
        <section>
          <h3 className="text-xl font-semibold mb-3 border-b pb-2 dark:border-slate-700">Cover Letter</h3>
          {coverLetter ? (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap break-words">
              {coverLetter}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 italic">No cover letter content entered yet.</p>
          )}
        </section>

        {/* Resume Preview */}
        <section>
          <h3 className="text-xl font-semibold mb-3 border-b pb-2 dark:border-slate-700">Resume</h3>
          {resume.resumeFileName ? (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md">
              <p className="font-medium">Uploaded Resume:</p>
              <p className="text-green-600 dark:text-green-400">{resume.resumeFileName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                (Preview of uploaded resume content is not available here. Ensure it's formatted correctly.)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              { (resume.fullName || resume.email || resume.phoneNumber) ? (
                <>
                  <h4 className="text-lg font-medium">{resume.fullName || "Your Name"}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {resume.email} {resume.email && resume.phoneNumber && " | "} {resume.phoneNumber}
                  </p>
                  {resume.linkedinProfileUrl && <p className="text-sm"><a href={resume.linkedinProfileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a></p>}
                  {resume.portfolioUrl && <p className="text-sm"><a href={resume.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Portfolio/Website</a></p>}

                  {resume.summary && (
                    <>
                      <h5 className="font-semibold mt-2">Summary/Objective</h5>
                      <p className="text-sm whitespace-pre-wrap break-words">{resume.summary}</p>
                    </>
                  )}

                  {resume.workExperience && resume.workExperience.some(exp => exp.jobTitle) && (
                    <>
                      <h5 className="font-semibold mt-3">Work Experience</h5>
                      {resume.workExperience.map((exp, index) => exp.jobTitle && (
                        <div key={index} className="text-sm mb-2 p-2 bg-slate-50 dark:bg-slate-800/30 rounded">
                          <strong>{exp.jobTitle}</strong> at {exp.company} ({exp.dates})<br />
                          <p className="text-xs whitespace-pre-wrap break-words">{exp.description}</p>
                        </div>
                      ))}
                    </>
                  )}

                  {resume.education && resume.education.some(edu => edu.degree) && (
                    <>
                      <h5 className="font-semibold mt-3">Education</h5>
                      {resume.education.map((edu, index) => edu.degree && (
                        <div key={index} className="text-sm mb-2 p-2 bg-slate-50 dark:bg-slate-800/30 rounded">
                          <strong>{edu.degree}</strong> from {edu.institution} ({edu.dates})<br />
                          <p className="text-xs whitespace-pre-wrap break-words">{edu.description}</p>
                        </div>
                      ))}
                    </>
                  )}

                  {resume.skills && (
                    <>
                      <h5 className="font-semibold mt-3">Skills</h5>
                      <p className="text-sm">{resume.skills}</p>
                    </>
                  )}
                </>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 italic">No resume data entered or resume uploaded yet.</p>
              )}
            </div>
          )}
        </section>
      </CardContent>
    </Card>
  );
};
