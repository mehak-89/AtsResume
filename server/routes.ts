import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { z } from "zod";
import { analyzeResumeSchema } from "@shared/schema";
import { analyzeResumeForAts } from "./mockAnalyzer";
import path from "path";
import { promises as fsPromises } from "fs";
import { ZodError } from "zod";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (_req, file, cb) => {
    console.log("Multer processing file:", file.originalname, file.mimetype);
    
    // Accept only PDF, DOCX, DOC, and TXT files
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];
    
    // Also check file extension for more reliable detection
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    const validExtensions = ['pdf', 'docx', 'doc', 'txt'];
    
    if (allowedTypes.includes(file.mimetype) || 
        (fileExtension && validExtensions.includes(fileExtension))) {
      cb(null, true);
    } else {
      console.log("File rejected - invalid type:", file.mimetype, fileExtension);
      cb(new Error('Invalid file type. Only PDF, DOCX, DOC, and TXT files are allowed.'));
    }
  }
});

// Function to extract text from a file based on its type
async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
  // For simplicity, we'll just return the buffer as text for now
  // In a production environment, you would want to use libraries like pdf-parse, mammoth, etc.
  return file.buffer.toString('utf-8');
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'server', 'public', 'uploads');
  await fsPromises.mkdir(uploadsDir, { recursive: true });
  
  // Analyze resume endpoint
  app.post('/api/analyze-resume', upload.single('resume'), async (req, res, next) => {
    try {
      console.log("Received resume analysis request:", { 
        hasFile: !!req.file,
        body: req.body 
      });

      if (!req.file) {
        return res.status(400).json({ message: "No resume file provided" });
      }
      
      const resumeFile = req.file;
      console.log("File received:", resumeFile.originalname, resumeFile.mimetype, resumeFile.size);
      
      // Extract form data
      const jobTitle = req.body.jobTitle;
      const companyName = req.body.companyName;
      const jobDescription = req.body.jobDescription;
      let skills: string[] = [];
      
      try {
        skills = JSON.parse(req.body.skills);
      } catch (error) {
        console.error("Error parsing skills:", error);
        return res.status(400).json({ message: "Invalid skills format" });
      }
      
      // Validate form data
      try {
        analyzeResumeSchema.parse({
          jobTitle,
          companyName,
          jobDescription,
          skills
        });
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({ 
            message: "Validation error", 
            errors: error.errors 
          });
        }
        throw error;
      }
      
      // Extract text from resume
      const resumeText = await extractTextFromFile(resumeFile);
      
      if (!resumeText || resumeText.trim().length < 10) {
        return res.status(400).json({ message: "Could not extract text from the resume or resume is too short" });
      }
      
      // Analyze the resume with our analyzer
      const analysisResult = await analyzeResumeForAts({
        resumeText,
        jobTitle,
        companyName,
        jobDescription,
        skills
      });
      
      // Save the file (optional)
      const filename = `${Date.now()}-${resumeFile.originalname}`;
      const filePath = path.join(uploadsDir, filename);
      await fsPromises.writeFile(filePath, resumeFile.buffer);
      
      // Store the analysis in DB (if logged in)
      // This would be implemented for authenticated users
      
      return res.status(200).json(analysisResult);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
