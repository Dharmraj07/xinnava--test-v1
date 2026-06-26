import { motion } from "motion/react";
import { AlertTriangle, ShieldCheck, XCircle, CheckCircle, FileText, Timer, Trash2, HelpCircle } from "lucide-react";

export default function ProblemSolution() {
  const problems = [
    {
      title: "Re-enter Information Every Time",
      description: "Filling out identical biographical forms, educational summaries, and home addresses across 20 different portals.",
      icon: XCircle
    },
    {
      title: "Upload Documents Repeatedly",
      description: "Manually re-sizing passport scans or proof of residence PDFs to match arbitrary sizing limits (e.g. 'Must be <2MB PNG').",
      icon: Trash2
    },
    {
      title: "Lose Important Certificates",
      description: "Frantically hunting through physical drawers or dusty Gmail attachments to find your 2018 graduation diploma copy.",
      icon: HelpCircle
    },
    {
      title: "Miss Crucial Deadlines",
      description: "Losing track of important application cutoff dates or letting critical documents expire without renewal.",
      icon: Timer
    },
    {
      title: "Complex Government Portals",
      description: "Navigating archaic federal state portals with 15 pages of intricate inputs that time out mid-process.",
      icon: AlertTriangle
    }
  ];

  const solutions = [
    {
      title: "The Smart Autofill Engine",
      description: "Our browser extension matches form fields semantically in the background, entering your entire profile correctly in a single click."
    },
    {
      title: "Universal Intelligent Vault",
      description: "Upload once. Xinnava automatically optimizes and compresses scans to fit standard application criteria safely."
    },
    {
      title: "Instant Cloud Retrieve & Search",
      description: "Find any credential by typing natural queries. Xinnava queries document tables semantically and renders details."
    },
    {
      title: "Smart Calendar Notifications",
      description: "Never miss a deadline. Receive notifications three months prior to document expiries and get reminders for matching grants."
    },
    {
      title: "Simplified Form Assistant",
      description: "AI-driven guidance breaks down complex government programs, providing step-by-step assistance to guarantee success."
    }
  ];

  return (
    <section id="problem-solution" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-1/10 left-1/10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/2 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/10 right-1/10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/2 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest font-bold text-rose-500 bg-rose-500/10 px-3.5 py-1.5 rounded-full">
            The Friction
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Paperwork Shouldn't Stop Opportunities
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
            Traditional administrative procedures are broken, taking hours of repetitive effort. See how Xinnava restructures the flow.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          {/* Left: The Old Way (Problem) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-4 md:p-6 rounded-3xl bg-rose-500/5 dark:bg-rose-500/2 border border-rose-200/50 dark:border-rose-900/30 text-left">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">The Old Way</h3>
                  <p className="text-xs text-rose-600 dark:text-rose-400">Inefficient, fragmented, and error-prone</p>
                </div>
              </div>

              <div className="space-y-4">
                {problems.map((prob, idx) => {
                  const ProbIcon = prob.icon;
                  return (
                    <motion.div
                      key={prob.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/40 flex gap-4 text-left"
                    >
                      <div className="mt-0.5 text-rose-500 shrink-0">
                        <ProbIcon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{prob.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{prob.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: The Xinnava Way (Solution) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-4 md:p-6 rounded-3xl bg-blue-500/5 dark:bg-blue-500/2 border border-blue-200/40 dark:border-blue-900/20 text-left h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">The Xinnava Way</h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Unified, automated, and secure encryption</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {solutions.map((sol, idx) => (
                    <motion.div
                      key={sol.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/40 flex gap-4 text-left"
                    >
                      <div className="mt-0.5 text-emerald-500 shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{sol.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{sol.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick graphic summary */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-wider uppercase font-extrabold text-blue-100">Performance Leap</span>
                  <div className="text-sm font-bold">Cut submission times by 95%</div>
                </div>
                <div className="flex items-center space-x-2 font-mono text-xs bg-white/10 rounded-lg px-2.5 py-1 border border-white/10">
                  <FileText className="w-4 h-4 text-blue-100" />
                  <span>Verified by AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
