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
            <span className="text-xl font-bold text-primary cursor-pointer">Humgrow</span>
          </Link>
          <span className="text-xs text-gray-500 hidden sm:inline-block ml-2">Change your career with Mehak</span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <li>
              <Link href="/">
                <span className={`text-sm font-medium cursor-pointer ${isActive("/") ? "text-primary" : "hover:text-primary"}`}>
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className={`text-sm font-medium cursor-pointer ${isActive("/about") ? "text-primary" : "hover:text-primary"}`}>
                  About
                </span>
              </Link>
            </li>
            <li>
              <Link href="/ats-checker">
                <span className={`text-sm font-medium cursor-pointer ${isActive("/ats-checker") ? "text-primary" : "hover:text-primary"}`}>
                  ATS Checker
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className={`text-sm font-medium cursor-pointer ${isActive("/contact") ? "text-primary" : "hover:text-primary"}`}>
                  Contact
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="md:hidden">
          {/* Mobile menu button could go here */}
          <Link href="/ats-checker">
            <span className="text-sm font-medium cursor-pointer text-primary">ATS Checker</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
