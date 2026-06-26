import { motion } from "motion/react";
import { GraduationCap, Home, Briefcase, Cpu, Store, ArrowRight } from "lucide-react";

export default function Trusted() {
  const targets = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Match with international scholarships, store college diplomas, and apply for student visas instantly without typing the same transcript credentials twice.",
      tag: "Academic Vaulting",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Home,
      title: "Families",
      description: "Manage medical sheets, identity credentials, and birth certificates for children. Receive notifications for passport expiries and share verified copies with schools.",
      tag: "Household Records",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Briefcase,
      title: "Job Seekers",
      description: "Keep resumes, portfolios, and diplomas in one place. Autofill massive job application forms on LinkedIn, Workday, or Greenhouse in under 3 seconds.",
      tag: "Career Accelerator",
      color: "from-sky-400 to-blue-600"
    },
    {
      icon: Store,
      title: "Cyber Cafés",
      description: "Enable kiosk operators to securely help visitors fill complicated government registration forms, upload documents, and print verified applications safely.",
      tag: "Kiosk Operations",
      color: "from-emerald-400 to-teal-600"
    },
    {
      icon: Cpu,
      title: "Small Businesses",
      description: "Manage business licenses, tax IDs, and incorporation certificates. Apply for government subsidies and credit grants with zero administrative drag.",
      tag: "SME Infrastructure",
      color: "from-amber-400 to-orange-500"
    }
  ];

  return (
    <section id="trusted" className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950/30 border-y border-slate-100 dark:border-slate-800/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-60 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 px-3.5 py-1.5 rounded-full">
            Tailored Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Designed to Simplify Life for Everyone
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
            Whether you are coordinating family health forms, blasting job applications, or operating a high-volume café portal, Xinnava fits your workflow.
          </p>
        </div>

        {/* Target Profile Horizontal Cards / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {targets.map((target, idx) => (
            <motion.div
              key={target.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-400/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header Icon */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${target.color} flex items-center justify-center text-white shadow-sm`}>
                  <target.icon className="w-5.5 h-5.5" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                    {target.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {target.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {target.description}
                </p>
              </div>

              {/* Decorative action pointer */}
              <div className="mt-6 pt-3 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <span>Learn scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
