import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">ResumeRater</h3>
            <p className="text-gray-600 text-sm">
              Improve your resume's ATS compatibility and increase your chances of getting interviews.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ats-checker">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">ATS Score Checker</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">Cover Letter Creator</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">Job Match Analyzer</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">Resume Tips</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">Career Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">FAQs</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">Help Center</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-primary cursor-pointer">Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} ResumeRater. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
