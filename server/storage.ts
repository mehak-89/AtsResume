import { users, type User, type InsertUser, type ResumeAnalysis, type InsertResumeAnalysis } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Resume analysis methods
  saveResumeAnalysis(analysis: InsertResumeAnalysis): Promise<ResumeAnalysis>;
  getResumeAnalyses(userId: number): Promise<ResumeAnalysis[]>;
  getResumeAnalysis(id: number): Promise<ResumeAnalysis | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumeAnalyses: Map<number, ResumeAnalysis>;
  private currentUserId: number;
  private currentAnalysisId: number;

  constructor() {
    this.users = new Map();
    this.resumeAnalyses = new Map();
    this.currentUserId = 1;
    this.currentAnalysisId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async saveResumeAnalysis(insertAnalysis: InsertResumeAnalysis): Promise<ResumeAnalysis> {
    const id = this.currentAnalysisId++;
    const analysis: ResumeAnalysis = { 
      ...insertAnalysis, 
      id,
      createdAt: new Date().toISOString()
    };
    this.resumeAnalyses.set(id, analysis);
    return analysis;
  }
  
  async getResumeAnalyses(userId: number): Promise<ResumeAnalysis[]> {
    return Array.from(this.resumeAnalyses.values())
      .filter(analysis => analysis.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  async getResumeAnalysis(id: number): Promise<ResumeAnalysis | undefined> {
    return this.resumeAnalyses.get(id);
  }
}

export const storage = new MemStorage();
