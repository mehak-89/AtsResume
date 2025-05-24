import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScoreRing from "@/components/ui/score-ring";
import SkillTag from "@/components/ui/skill-tag";
import { Download, FileText, AlertCircle, CheckCircle, XCircle, Info } from "lucide-react";
import { downloadBlob } from "@/lib/utils";
import { useState } from "react";
import type { JobDetails } from "./JobDetailsSection";

export interface AtsResult {
  score: number;
  keyFindings: Array<{
    type: "positive" | "warning" | "negative";
    text: string;
  }>;
  matchedSkills: string[];
  missingSkills: string[];
  scores: {
    skillsMatch: number;
    formatStructure: number;
    experienceMatch: number;
    educationMatch: number;
  };
  improvementSuggestions: string[];
}

interface ResultsSectionProps {
  result: AtsResult;
  jobDetails: JobDetails;
  onBackToJobDetails: () => void;
  onStartOver: () => void;
}

export default function ResultsSection({
  result,
  jobDetails,
  onBackToJobDetails,
  onStartOver,
}: ResultsSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const getIconForFinding = (type: "positive" | "warning" | "negative") => {
    switch (type) {
      case "positive":
        return <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />;
      case "negative":
        return <XCircle className="w-5 h-5 text-red-500 mt-0.5" />;
    }
  };
  
  const handleDownloadReport = async () => {
    setIsDownloading(true);
    
    try {
      // Create a simple HTML report
      const reportHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ATS Score Report - ${jobDetails.jobTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1, h2, h3 { color: #2563eb; }
            .score { font-size: 3em; font-weight: bold; color: #2563eb; }
            .section { margin: 30px 0; border-top: 1px solid #eee; padding-top: 20px; }
            .finding { margin: 10px 0; padding-left: 25px; position: relative; }
            .finding:before { content: "•"; position: absolute; left: 10px; color: #2563eb; }
            .skills { display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0; }
            .skill { background: #f0f9ff; color: #0369a1; padding: 5px 10px; border-radius: 15px; display: inline-block; }
            .missing-skill { background: #fef2f2; color: #b91c1c; }
            .progress-container { background: #e5e7eb; height: 10px; border-radius: 5px; margin: 5px 0 15px 0; }
            .progress-bar { background: #2563eb; height: 10px; border-radius: 5px; }
            .suggestion { margin: 10px 0; padding-left: 25px; position: relative; }
            .suggestion:before { content: "→"; position: absolute; left: 10px; color: #2563eb; }
          </style>
        </head>
        <body>
          <h1>ATS Score Report</h1>
          <p><strong>Job Title:</strong> ${jobDetails.jobTitle}</p>
          ${jobDetails.companyName ? `<p><strong>Company:</strong> ${jobDetails.companyName}</p>` : ''}
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          
          <div class="section">
            <h2>Overall Score</h2>
            <div class="score">${result.score}%</div>
            <p>${result.score >= 80 ? 'Good Match' : result.score >= 70 ? 'Decent Match' : 'Needs Improvement'}</p>
          </div>
          
          <div class="section">
            <h2>Key Findings</h2>
            ${result.keyFindings.map(finding => `<div class="finding">${finding.text}</div>`).join('')}
          </div>
          
          <div class="section">
            <h2>Skills Match</h2>
            <h3>Found Skills</h3>
            <div class="skills">
              ${result.matchedSkills.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
            
            <h3>Missing Skills</h3>
            <div class="skills">
              ${result.missingSkills.map(skill => `<span class="skill missing-skill">${skill}</span>`).join('')}
            </div>
          </div>
          
          <div class="section">
            <h2>Detailed Breakdown</h2>
            
            <p><strong>Skills Match:</strong> ${result.scores.skillsMatch}%</p>
            <div class="progress-container">
              <div class="progress-bar" style="width: ${result.scores.skillsMatch}%"></div>
            </div>
            
            <p><strong>Format & Structure:</strong> ${result.scores.formatStructure}%</p>
            <div class="progress-container">
              <div class="progress-bar" style="width: ${result.scores.formatStructure}%"></div>
            </div>
            
            <p><strong>Experience Match:</strong> ${result.scores.experienceMatch}%</p>
            <div class="progress-container">
              <div class="progress-bar" style="width: ${result.scores.experienceMatch}%"></div>
            </div>
            
            <p><strong>Education Match:</strong> ${result.scores.educationMatch}%</p>
            <div class="progress-container">
              <div class="progress-bar" style="width: ${result.scores.educationMatch}%"></div>
            </div>
          </div>
          
          <div class="section">
            <h2>Improvement Suggestions</h2>
            ${result.improvementSuggestions.map(suggestion => `<div class="suggestion">${suggestion}</div>`).join('')}
          </div>
          
          <div class="section">
            <p><em>Report generated by ResumeRater ATS Checker</em></p>
          </div>
        </body>
        </html>
      `;
      
      const blob = new Blob([reportHtml], { type: 'text/html' });
      downloadBlob(blob, `ATS_Score_Report_${jobDetails.jobTitle.replace(/\s+/g, '_')}.html`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ATS Score Results</CardTitle>
        <CardDescription>Analysis of your resume against the job requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          {/* ATS Score */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium text-center mb-4">ATS Compatibility Score</h3>
            <ScoreRing value={result.score} />
          </div>
          
          {/* Key Findings */}
          <div className="flex-grow">
            <h3 className="text-lg font-medium mb-4">Key Findings</h3>
            <ul className="space-y-3">
              {result.keyFindings.map((finding, index) => (
                <li key={index} className="flex items-start gap-2">
                  {getIconForFinding(finding.type)}
                  <span>{finding.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Skills Match */}
        <div className="mt-10">
          <h3 className="text-lg font-medium mb-4">Skills Match</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Found Skills */}
            <div>
              <h4 className="font-medium text-green-700 mb-3 flex items-center gap-1">
                <CheckCircle className="w-5 h-5" />
                Found Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills.map((skill, index) => (
                  <SkillTag
                    key={index}
                    text={skill}
                    variant="green"
                    onRemove={() => {}}
                  />
                ))}
                {result.matchedSkills.length === 0 && (
                  <p className="text-sm text-gray-500">No matching skills found in your resume.</p>
                )}
              </div>
            </div>
            
            {/* Missing Skills */}
            <div>
              <h4 className="font-medium text-red-700 mb-3 flex items-center gap-1">
                <XCircle className="w-5 h-5" />
                Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((skill, index) => (
                  <SkillTag
                    key={index}
                    text={skill}
                    variant="red"
                    onRemove={() => {}}
                  />
                ))}
                {result.missingSkills.length === 0 && (
                  <p className="text-sm text-gray-500">Great job! Your resume includes all required skills.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Breakdown */}
        <div className="mt-10">
          <h3 className="text-lg font-medium mb-4">Detailed Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Skills Match</span>
                <span className="text-sm font-medium">{result.scores.skillsMatch}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${result.scores.skillsMatch}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Format & Structure</span>
                <span className="text-sm font-medium">{result.scores.formatStructure}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${result.scores.formatStructure}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Experience Match</span>
                <span className="text-sm font-medium">{result.scores.experienceMatch}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${result.scores.experienceMatch}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Education Match</span>
                <span className="text-sm font-medium">{result.scores.educationMatch}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${result.scores.educationMatch}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Improvement Suggestions */}
        <div className="mt-10">
          <h3 className="text-lg font-medium mb-4">Improvement Suggestions</h3>
          <div className="bg-blue-50 p-4 rounded-md">
            <ul className="space-y-3 text-blue-800">
              {result.improvementSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-4 justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleDownloadReport}
            disabled={isDownloading}
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Generating..." : "Download Report"}
          </Button>
          
          <div className="flex gap-4">
            <Button variant="outline" onClick={onBackToJobDetails}>
              Edit Job Details
            </Button>
            <Button onClick={onStartOver}>
              Try Again with Another Resume
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
