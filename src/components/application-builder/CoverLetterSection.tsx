"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Save, FileText } from "lucide-react";

interface CoverLetterSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const CoverLetterSection = ({ value, onChange }: CoverLetterSectionProps) => {
  const handleAIGenerate = () => {
    console.log("AI Generate Cover Letter clicked. Feature coming soon!");
    alert("✨ AI Cover Letter Generation feature coming soon!");
    // Placeholder: onChange("Generated AI Cover Letter content...");
  };

  const handleSave = () => {
    console.log("Save Cover Letter clicked. Content:", value);
    alert("Save Cover Letter: Functionality not implemented yet. Content logged to console.");
  };

  const handleLoadTemplate = () => {
    console.log("Load Template clicked.");
    alert("Load Cover Letter Template: Functionality not implemented yet.");
    // Placeholder: onChange("Loaded template content...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cover Letter</CardTitle>
        <CardDescription>
          Write a compelling cover letter or use our AI assistant to generate one.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste your cover letter here, or start typing..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={15}
          className="min-h-[300px] text-sm leading-relaxed"
        />
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <Button onClick={handleAIGenerate} variant="outline">
            <Sparkles className="mr-2 h-4 w-4" /> AI Generate Cover Letter
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleLoadTemplate} variant="ghost">
              <FileText className="mr-2 h-4 w-4" /> Load Template
            </Button>
            <Button onClick={handleSave} variant="default">
              <Save className="mr-2 h-4 w-4" /> Save Cover Letter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
