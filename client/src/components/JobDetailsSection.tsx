import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SkillTag from "./ui/skill-tag";
import { extractSkillsFromText } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { z } from "zod";

const jobDetailsSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().optional(),
  jobDescription: z.string().min(10, "Please provide a detailed job description"),
  skills: z.array(z.string()).min(1, "At least one skill is required")
});

export type JobDetails = z.infer<typeof jobDetailsSchema>;

interface JobDetailsSectionProps {
  onSubmit: (data: JobDetails) => void;
  onBack: () => void;
}

export default function JobDetailsSection({ onSubmit, onBack }: JobDetailsSectionProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const skillInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (jobDescription && jobDescription.length > 50) {
      const extractedSkills = extractSkillsFromText(jobDescription);
      if (extractedSkills.length > 0) {
        // Only add skills that aren't already in the list
        const newSkills = extractedSkills.filter(skill => !skills.includes(skill));
        if (newSkills.length > 0) {
          setSkills(prev => [...prev, ...newSkills]);
        }
      }
    }
  }, [jobDescription]);

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setNewSkill("");
      
      // Clear any skills-related error when user adds a skill
      if (errors.skills) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.skills;
          return updated;
        });
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsProcessing(true);
      
      const formData = {
        jobTitle,
        companyName,
        jobDescription,
        skills
      };
      
      // Validate the form data
      jobDetailsSchema.parse(formData);
      
      // Clear any existing errors
      setErrors({});
      
      // Submit the form
      onSubmit(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0].toString();
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        
        // Show toast for the first error
        const firstError = error.errors[0];
        toast({
          title: "Please check the form",
          description: firstError.message,
          variant: "destructive"
        });
        
        // If error is related to skills, focus the skill input
        if (fieldErrors.skills && skillInputRef.current) {
          skillInputRef.current.focus();
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <CardDescription>Enter the job information to compare against your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="job-title" className={errors.jobTitle ? "text-destructive" : ""}>
                Job Title
              </Label>
              <Input
                id="job-title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                className={errors.jobTitle ? "border-destructive" : ""}
              />
              {errors.jobTitle && (
                <p className="text-destructive text-sm mt-1">{errors.jobTitle}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="company-name">Company Name (Optional)</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Inc."
              />
            </div>
            
            <div>
              <Label htmlFor="job-description" className={errors.jobDescription ? "text-destructive" : ""}>
                Job Description
                <span className="text-gray-500 text-xs ml-1">(Paste the full job description for best results)</span>
              </Label>
              <Textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                placeholder="Copy and paste the job description here..."
                className={`resize-none ${errors.jobDescription ? "border-destructive" : ""}`}
              />
              {errors.jobDescription && (
                <p className="text-destructive text-sm mt-1">{errors.jobDescription}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="skill-input" className={errors.skills ? "text-destructive" : ""}>
                Key Skills Mentioned in Job Description
              </Label>
              <div className={`flex flex-wrap gap-2 p-3 border rounded-md min-h-[100px] ${errors.skills ? "border-destructive" : "border-input"}`}>
                {skills.map((skill, index) => (
                  <SkillTag
                    key={index}
                    text={skill}
                    onRemove={() => handleRemoveSkill(index)}
                  />
                ))}
                <Input
                  id="skill-input"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add skill and press Enter"
                  className="border-none shadow-none px-0 min-w-[120px] flex-grow"
                />
              </div>
              {errors.skills ? (
                <p className="text-destructive text-sm mt-1">{errors.skills}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-2">
                  {skills.length > 0
                    ? "We've detected some skills from the job description. Add or remove skills as needed."
                    : "Add skills mentioned in the job description to improve analysis accuracy."}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">
              Analyze Resume
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
