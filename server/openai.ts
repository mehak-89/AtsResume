import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

export async function analyzeResumeForAts({
  resumeText,
  jobTitle,
  companyName,
  jobDescription,
  skills,
}: AnalyzeResumeParams): Promise<AtsAnalysisResult> {
  try {
    const prompt = `
      I need you to analyze a resume against a job description to determine ATS compatibility score and provide feedback.
      
      JOB TITLE: ${jobTitle}
      ${companyName ? `COMPANY: ${companyName}` : ''}
      
      JOB DESCRIPTION:
      ${jobDescription}
      
      KEY SKILLS FROM JOB DESCRIPTION:
      ${skills.join(', ')}
      
      RESUME TEXT:
      ${resumeText}
      
      Analyze the resume against the job description to determine:
      1. Overall ATS score (0-100%)
      2. Key findings (positive, warning, negative aspects)
      3. Skills that match and skills that are missing
      4. Detailed scores for: skills match, format & structure, experience match, education match
      5. Specific improvement suggestions
      
      Provide the analysis as JSON with the following structure:
      {
        "score": number (0-100),
        "keyFindings": [
          {
            "type": "positive" | "warning" | "negative",
            "text": string
          }
        ],
        "matchedSkills": string[],
        "missingSkills": string[],
        "scores": {
          "skillsMatch": number (0-100),
          "formatStructure": number (0-100),
          "experienceMatch": number (0-100),
          "educationMatch": number (0-100)
        },
        "improvementSuggestions": string[]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an ATS (Applicant Tracking System) expert who analyzes resumes for compatibility with job descriptions. Provide detailed analysis and actionable feedback to help job seekers improve their resumes."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    // Ensure the result matches the expected structure
    return {
      score: Math.min(100, Math.max(0, Math.round(result.score))),
      keyFindings: result.keyFindings.map((finding: any) => ({
        type: finding.type,
        text: finding.text
      })),
      matchedSkills: result.matchedSkills,
      missingSkills: result.missingSkills,
      scores: {
        skillsMatch: Math.min(100, Math.max(0, Math.round(result.scores.skillsMatch))),
        formatStructure: Math.min(100, Math.max(0, Math.round(result.scores.formatStructure))),
        experienceMatch: Math.min(100, Math.max(0, Math.round(result.scores.experienceMatch))),
        educationMatch: Math.min(100, Math.max(0, Math.round(result.scores.educationMatch)))
      },
      improvementSuggestions: result.improvementSuggestions
    };
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
}
