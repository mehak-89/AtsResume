import { Link, useLocation } from "wouter";
import { ClipboardList } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-10 h-10 text-primary" />
          <Link href="/">
            <a className="text-xl font-bold text-primary">ResumeRater</a>
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <li>
              <Link href="/">
                <a className={`text-sm font-medium ${isActive("/") ? "text-primary" : "hover:text-primary"}`}>
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={`text-sm font-medium ${isActive("/about") ? "text-primary" : "hover:text-primary"}`}>
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/ats-checker">
                <a className={`text-sm font-medium ${isActive("/ats-checker") ? "text-primary" : "hover:text-primary"}`}>
                  ATS Checker
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className={`text-sm font-medium ${isActive("/contact") ? "text-primary" : "hover:text-primary"}`}>
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="md:hidden">
          {/* Mobile menu button could go here */}
          <Link href="/ats-checker">
            <a className="text-sm font-medium text-primary">ATS Checker</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
