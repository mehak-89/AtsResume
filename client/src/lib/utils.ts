import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
}

export function extractSkillsFromText(text: string): string[] {
  if (!text) return [];
  
  // Common technical skills to look for
  const commonSkills = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Ruby", "PHP", "Swift", "Kotlin",
    "React", "Angular", "Vue", "Node.js", "Express", "Django", "Flask", "Spring", "ASP.NET",
    "HTML", "CSS", "SASS", "LESS", "Bootstrap", "Tailwind", "Material UI", "Semantic UI",
    "AWS", "Azure", "GCP", "Firebase", "Docker", "Kubernetes", "Jenkins", "CI/CD",
    "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence", "Trello", "Asana",
    "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "ElasticSearch", "DynamoDB", "Oracle",
    "REST API", "GraphQL", "SOAP", "gRPC", "WebSockets", "JSON", "XML", "YAML",
    "Agile", "Scrum", "Kanban", "Waterfall", "TDD", "BDD", "DevOps", "SRE",
    "Machine Learning", "AI", "Data Science", "Big Data", "Hadoop", "Spark", "TensorFlow", "PyTorch",
    "Blockchain", "Cryptocurrency", "Smart Contracts", "Solidity", "Ethereum", "Bitcoin",
    "Mobile Development", "iOS", "Android", "React Native", "Flutter", "Xamarin", "Cordova",
    "Cloud", "Serverless", "Microservices", "SOA", "Monolith", "Distributed Systems",
    "Security", "Authentication", "Authorization", "OAuth", "JWT", "SSO", "SAML",
    "Testing", "Unit Testing", "Integration Testing", "E2E Testing", "QA", "Selenium", "Cypress", "Jest"
  ];
  
  // Convert text to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  
  // Filter common skills that appear in the text
  return commonSkills.filter(skill => 
    lowerText.includes(skill.toLowerCase())
  );
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
