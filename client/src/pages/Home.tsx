import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="pt-8 pb-16">
      <section className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Get Your Resume Past <span className="text-primary">ATS Systems</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Optimize your resume to beat Applicant Tracking Systems and land more interviews
        </p>
        <Link href="/ats-checker">
          <Button size="lg" className="text-md h-12 px-8">
            Check Your Resume Now
          </Button>
        </Link>
      </section>

      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Upload Your Resume</h3>
            <p className="text-gray-600">
              Upload your resume in PDF, DOCX, or TXT format for analysis
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Add Job Details</h3>
            <p className="text-gray-600">
              Enter the job description to compare your resume against
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Get Your ATS Score</h3>
            <p className="text-gray-600">
              Receive detailed feedback and suggestions to improve your resume
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-12 px-4 rounded-lg max-w-5xl mx-auto mb-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Why ATS Optimization Matters</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            75% of resumes are rejected by ATS before a human ever sees them. Make sure yours makes it through.
          </p>
          <Link href="/ats-checker">
            <Button>
              Check Your Resume
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
