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
                  <a className="text-gray-600 hover:text-primary">ATS Score Checker</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary">Resume Builder</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary">Cover Letter Creator</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary">Job Match Analyzer</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary">Resume Tips</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary">Career Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary">FAQs</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary">Help Center</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <a className="text-gray-600 hover:text-primary">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-600 hover:text-primary">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary">Terms of Service</a>
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
