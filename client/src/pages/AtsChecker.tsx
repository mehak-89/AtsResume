import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useSteps } from "@/hooks/use-steps";

import StepIndicator from "@/components/StepIndicator";
import UploadSection from "@/components/UploadSection";
import JobDetailsSection from "@/components/JobDetailsSection";
import ResultsSection from "@/components/ResultsSection";
import type { JobDetails } from "@/components/JobDetailsSection";
import type { AtsResult } from "@/components/ResultsSection";

const steps = [
  { id: 1, label: "Upload" },
  { id: 2, label: "Details" },
  { id: 3, label: "Results" },
];

export default function AtsChecker() {
  const { currentStep, nextStep, prevStep, goToStep } = useSteps({
    initialStep: 1,
    maxSteps: 3,
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [result, setResult] = useState<AtsResult | null>(null);
  
  const { toast } = useToast();
  
  const analyzeMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/analyze-resume", data);
      return response.json();
    },
    onSuccess: (data: AtsResult) => {
      setResult(data);
      nextStep();
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleFileUploaded = (file: File) => {
    setResumeFile(file);
  };
  
  const handleJobDetailsSubmit = async (details: JobDetails) => {
    if (!resumeFile) {
      toast({
        title: "Missing Resume",
        description: "Please upload your resume first.",
        variant: "destructive",
      });
      goToStep(1);
      return;
    }
    
    setJobDetails(details);
    
    try {
      // Create a new FormData instance
      const formData = new FormData();
      
      // Append the file with explicit filename
      formData.append("resume", resumeFile, resumeFile.name);
      
      // Append other form data
      formData.append("jobTitle", details.jobTitle);
      formData.append("companyName", details.companyName || "");
      formData.append("jobDescription", details.jobDescription);
      formData.append("skills", JSON.stringify(details.skills));
      
      // Log the form data entries for debugging
      console.log("Form data created with file:", resumeFile.name, resumeFile.type, resumeFile.size);
      
      // Submit the form data
      analyzeMutation.mutate(formData);
    } catch (error) {
      console.error("Error preparing form data:", error);
      toast({
        title: "Error",
        description: "There was an error preparing your submission. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleStartOver = () => {
    setResumeFile(null);
    setJobDetails(null);
    setResult(null);
    goToStep(1);
  };
  
  return (
    <div>
      <StepIndicator currentStep={currentStep} steps={steps} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar with instructions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">How It Works</h2>
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full ${currentStep >= 1 ? "bg-primary" : "bg-gray-200"} text-white flex items-center justify-center text-xs font-medium`}>
                  1
                </span>
                <div>
                  <p className="font-medium">Upload your resume</p>
                  <p className="text-gray-500 mt-1">Upload your CV/resume in PDF, DOCX, or TXT format.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full ${currentStep >= 2 ? "bg-primary" : "bg-gray-200"} text-white flex items-center justify-center text-xs font-medium`}>
                  2
                </span>
                <div>
                  <p className="font-medium">Add job details</p>
                  <p className="text-gray-500 mt-1">Enter the job title and description to compare against.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full ${currentStep >= 3 ? "bg-primary" : "bg-gray-200"} text-white flex items-center justify-center text-xs font-medium`}>
                  3
                </span>
                <div>
                  <p className="font-medium">Get your ATS score</p>
                  <p className="text-gray-500 mt-1">See how well your resume matches the job requirements.</p>
                </div>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-blue-50 rounded-md text-sm">
              <h3 className="font-medium text-blue-700 mb-2">Why ATS matters</h3>
              <p className="text-blue-600">
                Applicant Tracking Systems (ATS) filter resumes before they reach human reviewers. A high ATS score increases your chances of getting an interview.
              </p>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2 space-y-8">
          {currentStep === 1 && (
            <UploadSection 
              onFileUploaded={handleFileUploaded} 
              onContinue={nextStep} 
            />
          )}
          
          {currentStep === 2 && (
            <JobDetailsSection 
              onSubmit={handleJobDetailsSubmit} 
              onBack={prevStep} 
            />
          )}
          
          {currentStep === 3 && result && jobDetails && (
            <ResultsSection 
              result={result} 
              jobDetails={jobDetails}
              onBackToJobDetails={() => goToStep(2)} 
              onStartOver={handleStartOver} 
            />
          )}
          
          {currentStep === 2 && analyzeMutation.isPending && (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4 w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/2 mx-auto"></div>
                <div className="h-32 bg-gray-200 rounded mb-4 w-full mx-auto"></div>
              </div>
              <p className="text-gray-500 mt-4">Analyzing your resume against job requirements...</p>
              <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
