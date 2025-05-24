import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const resumeAnalyses = pgTable("resume_analyses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  jobTitle: text("job_title").notNull(),
  companyName: text("company_name"),
  resumeFilename: text("resume_filename").notNull(),
  atsScore: integer("ats_score").notNull(),
  analysisResults: jsonb("analysis_results").notNull(),
  createdAt: text("created_at").notNull().default("now()"),
});

export const insertResumeAnalysisSchema = createInsertSchema(resumeAnalyses).omit({
  id: true
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ResumeAnalysis = typeof resumeAnalyses.$inferSelect;
export type InsertResumeAnalysis = z.infer<typeof insertResumeAnalysisSchema>;

// Validation schemas for API requests
export const analyzeResumeSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().optional(),
  jobDescription: z.string().min(10, "Please provide a detailed job description"),
  skills: z.array(z.string()).min(1, "At least one skill is required")
});

export type AnalyzeResumeRequest = z.infer<typeof analyzeResumeSchema>;
