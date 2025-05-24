import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About ResumeRater</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          At ResumeRater, we believe everyone deserves a fair chance at their dream job. Our mission is to help job seekers navigate the increasingly automated hiring process by providing tools to optimize resumes for Applicant Tracking Systems (ATS).
        </p>
        <p className="text-gray-700">
          By helping you understand how ATS systems evaluate your resume, we aim to level the playing field and ensure your qualifications are properly recognized by both algorithms and hiring managers.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How ATS Systems Work</h2>
        <p className="text-gray-700 mb-4">
          Applicant Tracking Systems are software applications that help employers manage the recruitment process. They automatically scan, filter, and rank job applications based on keywords, skills, former employers, experience, and education.
        </p>
        <p className="text-gray-700 mb-4">
          These systems help employers handle large volumes of applications, but they can also screen out qualified candidates whose resumes aren't properly optimized for the software's algorithms.
        </p>
        <p className="text-gray-700">
          Our ATS Checker helps you identify how your resume will be interpreted by these systems and provides actionable suggestions to improve your chances of making it past the initial screening.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Technology</h2>
        <p className="text-gray-700 mb-4">
          ResumeRater uses advanced natural language processing and machine learning algorithms to analyze your resume against job descriptions. Our system evaluates:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>Keyword matching and relevance</li>
          <li>Resume format and structure</li>
          <li>Skills alignment with job requirements</li>
          <li>Experience and education relevance</li>
          <li>Content optimization opportunities</li>
        </ul>
        <p className="text-gray-700">
          We continuously update our algorithms to keep pace with the latest developments in ATS technology, ensuring our recommendations remain effective.
        </p>
      </div>
      
      <div className="text-center mt-10">
        <p className="text-xl mb-4">Ready to optimize your resume?</p>
        <Link href="/ats-checker">
          <Button size="lg">
            Try Our ATS Checker
          </Button>
        </Link>
      </div>
    </div>
  );
}
