import { ShieldCheck, Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const productLinks = [
    { name: "AI Document Vault", href: "#features" },
    { name: "OCR Smart Scanner", href: "#features" },
    { name: "Form Autofill Engine", href: "#features" },
    { name: "Family Share delegation", href: "#features" },
    { name: "Chrome Extension", href: "#features" }
  ];

  const companyLinks = [
    { name: "About Xinnava", href: "#" },
    { name: "Inquire Early Access", href: "#waitlist" },
    { name: "Security Protocols", href: "#faq" },
    { name: "Open Careers", href: "#" }
  ];

  const resourceLinks = [
    { name: "API Documentation", href: "#" },
    { name: "Filing Guides", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Status Indicators", href: "#" }
  ];

  return (
    <footer className="border-t border-slate-200/50 dark:border-slate-800 bg-white dark:bg-[#090e1a] py-14 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo Brand info */}
          <div className="md:col-span-4 space-y-4 text-left">
            <a href="#" className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">Xinnava</span>
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal max-w-sm">
              Xinnava is an AI-powered document vault and intelligent form-filling assistant that helps people securely store important credentials and automatically apply for global opportunities.
            </p>
            <div className="flex items-center space-x-3.5 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">
                <Github className="w-4.5 h-4.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href="mailto:support@xinnava.com" className="hover:text-indigo-500 transition-colors">
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Links grid */}
          <div className="md:col-span-8 grid grid-cols-3 gap-6 text-left">
            {/* Column 1: Product */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Product</h4>
              <ul className="space-y-2 text-xs">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Company</h4>
              <ul className="space-y-2 text-xs">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Resources</h4>
              <ul className="space-y-2 text-xs">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Copy / Privacy legal baseline */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <span>&copy; 2026 Xinnava Inc. All rights reserved.</span>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
