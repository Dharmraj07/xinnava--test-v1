import { motion } from "motion/react";
import { UploadCloud, FileJson, MousePointerClick, CheckCircle, ArrowDown } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UploadCloud,
      title: "Upload Documents",
      description: "Securely drag & drop or take pictures of passports, resumes, licenses, or diplomas on any device.",
      details: "Encrypted at upload, completely private to you.",
      color: "border-blue-500 text-blue-600 dark:text-blue-400"
    },
    {
      step: "02",
      icon: FileJson,
      title: "AI Extracts Information",
      description: "Xinnava's semantic parsing engine instantly structures fields like name, birth dates, skills, and expiry alerts.",
      details: "Provides 99.8% precision with structural checks.",
      color: "border-indigo-500 text-indigo-600 dark:text-indigo-400"
    },
    {
      step: "03",
      icon: MousePointerClick,
      title: "One-Click Form Filling",
      description: "Our browser extension detects form inputs on government websites, university portals, or jobs boards and autofills details.",
      details: "Works on standard or custom web inputs.",
      color: "border-sky-500 text-sky-600 dark:text-sky-400"
    },
    {
      step: "04",
      icon: CheckCircle,
      title: "Submit Applications Instantly",
      description: "Double check fields, attach automatically parsed certificates, and complete the submission in seconds.",
      details: "Saves up to 45 minutes per application.",
      color: "border-emerald-500 text-emerald-600 dark:text-emerald-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/40 dark:bg-slate-950/20 border-y border-slate-100 dark:border-slate-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 px-3.5 py-1.5 rounded-full">
            Intuitive Pipeline
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How Xinnava Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
            Say goodbye to typing the exact same biographical details on yet another clunky government portal.
          </p>
        </div>

        {/* Timeline Desktop Representation (Grid with connecting arrows) */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={step.step} className="relative flex flex-col items-center">
                  {/* Timeline Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-full flex flex-col p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 shadow-sm relative hover:shadow-md transition-all duration-300"
                  >
                    {/* Badge showing index */}
                    <div className="absolute top-4 right-4 text-3xl font-black text-slate-100 dark:text-slate-800 select-none">
                      {step.step}
                    </div>

                    {/* Step Icon */}
                    <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center mb-6 shadow-sm ${step.color}`}>
                      <StepIcon className="w-5.5 h-5.5" />
                    </div>

                    <div className="space-y-3 flex-1 text-left">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>

                    {/* Meta detail */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/50 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {step.details}
                    </div>
                  </motion.div>

                  {/* Connecting Arrow for desktop (between items) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-slate-300 dark:text-slate-700 animate-pulse">
                      <ArrowDown className="w-5 h-5 -rotate-90 transform" />
                    </div>
                  )}

                  {/* Connecting Arrow for mobile */}
                  {idx < steps.length - 1 && (
                    <div className="flex md:hidden my-4 text-slate-300 dark:text-slate-800">
                      <ArrowDown className="w-6 h-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
