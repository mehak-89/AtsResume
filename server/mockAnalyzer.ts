/**
 * Mock ATS Analyzer
 * 
 * This module provides a mock implementation for resume analysis
 * that simulates AI-powered analysis without requiring an external API.
 */

interface AnalyzeResumeParams {
  resumeText: string;
  jobTitle: string;
  companyName?: string;
  jobDescription: string;
  skills: string[];
}

interface AtsAnalysisResult {
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

/**
 * Analyzes a resume against a job description and skills to provide ATS feedback
 */
export async function analyzeResumeForAts({
  resumeText,
  jobTitle,
  companyName,
  jobDescription,
  skills,
}: AnalyzeResumeParams): Promise<AtsAnalysisResult> {
  // Add a small delay to simulate API processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Create a simple matching algorithm based on keywords
  const resumeLower = resumeText.toLowerCase();
  const jobDescLower = jobDescription.toLowerCase();
  
  // Determine matched skills
  const matchedSkills = skills.filter(skill => 
    resumeLower.includes(skill.toLowerCase())
  );
  
  const missingSkills = skills.filter(skill => 
    !resumeLower.includes(skill.toLowerCase())
  );
  
  // Calculate a skill match percentage
  const skillsMatchScore = skills.length > 0 
    ? Math.min(Math.round((matchedSkills.length / skills.length) * 100), 100)
    : 85;
  
  // Generate mock scores for different aspects
  const formatStructureScore = Math.floor(Math.random() * 30) + 70; // 70-100
  const experienceMatchScore = Math.floor(Math.random() * 40) + 60; // 60-100
  const educationMatchScore = Math.floor(Math.random() * 25) + 75; // 75-100
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (skillsMatchScore * 0.4) + 
    (formatStructureScore * 0.2) + 
    (experienceMatchScore * 0.3) + 
    (educationMatchScore * 0.1)
  );
  
  // Generate key findings based on scores
  const keyFindings = generateKeyFindings(
    skillsMatchScore, 
    formatStructureScore, 
    experienceMatchScore, 
    educationMatchScore,
    jobTitle,
    matchedSkills,
    missingSkills
  );
  
  // Generate improvement suggestions
  const improvementSuggestions = generateImprovementSuggestions(
    skillsMatchScore,
    formatStructureScore,
    missingSkills,
    jobTitle,
    jobDescLower
  );
  
  return {
    score: overallScore,
    keyFindings,
    matchedSkills,
    missingSkills,
    scores: {
      skillsMatch: skillsMatchScore,
      formatStructure: formatStructureScore,
      experienceMatch: experienceMatchScore,
      educationMatch: educationMatchScore,
    },
    improvementSuggestions,
  };
}

/**
 * Generate key findings based on various scores and data
 */
function generateKeyFindings(
  skillsMatchScore: number,
  formatStructureScore: number,
  experienceMatchScore: number,
  educationMatchScore: number,
  jobTitle: string,
  matchedSkills: string[],
  missingSkills: string[]
): Array<{ type: "positive" | "warning" | "negative"; text: string; }> {
  const findings: Array<{ type: "positive" | "warning" | "negative"; text: string; }> = [];
  
  // Skill match findings
  if (skillsMatchScore >= 80) {
    findings.push({
      type: "positive",
      text: `Your resume shows strong alignment with ${matchedSkills.length} key skills required for this ${jobTitle} position.`
    });
  } else if (skillsMatchScore >= 50) {
    findings.push({
      type: "warning",
      text: `Your resume matches some key skills for this position, but ${missingSkills.length} important skills are missing.`
    });
  } else {
    findings.push({
      type: "negative",
      text: `Your resume lacks many of the key skills required for this ${jobTitle} position.`
    });
  }
  
  // Format findings
  if (formatStructureScore >= 85) {
    findings.push({
      type: "positive",
      text: "Your resume has a clear, ATS-friendly structure with good readability."
    });
  } else if (formatStructureScore >= 70) {
    findings.push({
      type: "warning",
      text: "Your resume's format could be improved for better ATS readability."
    });
  } else {
    findings.push({
      type: "negative",
      text: "Your resume format may be difficult for ATS systems to parse correctly."
    });
  }
  
  // Experience match findings
  if (experienceMatchScore >= 80) {
    findings.push({
      type: "positive",
      text: `Your experience appears well-aligned with the ${jobTitle} requirements.`
    });
  } else if (experienceMatchScore >= 60) {
    findings.push({
      type: "warning",
      text: `Your experience partially matches the ${jobTitle} position requirements.`
    });
  } else {
    findings.push({
      type: "negative",
      text: `Your experience does not strongly align with the ${jobTitle} requirements.`
    });
  }
  
  // Education findings
  if (educationMatchScore >= 85) {
    findings.push({
      type: "positive",
      text: "Your educational background is appropriate for this position."
    });
  } else {
    findings.push({
      type: "warning",
      text: "Consider highlighting your educational qualifications more effectively."
    });
  }
  
  return findings;
}

/**
 * Generate improvement suggestions based on analysis
 */
function generateImprovementSuggestions(
  skillsMatchScore: number,
  formatStructureScore: number,
  missingSkills: string[],
  jobTitle: string,
  jobDescription: string
): string[] {
  const suggestions: string[] = [];
  
  // Skill-related suggestions
  if (missingSkills.length > 0) {
    suggestions.push(
      `Add the following key skills to your resume if you possess them: ${missingSkills.slice(0, 5).join(', ')}${missingSkills.length > 5 ? ', and others' : ''}.`
    );
  }
  
  // Format-related suggestions
  if (formatStructureScore < 85) {
    suggestions.push(
      "Use a clean, single-column resume format that's easily scannable by ATS systems.",
      "Ensure your section headers are clearly labeled (e.g., 'Experience', 'Education', 'Skills').",
      "Avoid complex tables, headers/footers, and graphics that ATS systems can't parse."
    );
  }
  
  // Common improvement suggestions
  suggestions.push(
    `Tailor your resume specifically to the ${jobTitle} position by mirroring language from the job description.`,
    "Use action verbs and quantify achievements with metrics where possible.",
    "Ensure your contact information is at the top and clearly visible."
  );
  
  return suggestions;
}