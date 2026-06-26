import { motion } from "motion/react";
import {
  Shield,
  Scan,
  Zap,
  Users,
  Landmark,
  GraduationCap,
  Briefcase,
  Cloud,
  Clock,
  Search,
  Puzzle,
  Smartphone
} from "lucide-react";

export default function Features() {
  const featuresList = [
    {
      icon: Shield,
      title: "AI Document Vault",
      description: "State-of-the-art secure vault protected with military-grade 256-bit encryption. Organize files using semantic auto-generated folder tags.",
      badge: "Security Core",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    },
    {
      icon: Scan,
      title: "OCR Document Scanner",
      description: "Upload any PDF, high-res scan, or phone snap. Xinnava automatically cleans up contrasts, digitizes text, and parses structured fields instantly.",
      badge: "OCR Tech",
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
    },
    {
      icon: Zap,
      title: "One Click Form Autofill",
      description: "Stop retyping names, addresses, and document IDs. Our technology maps fields intelligently to any web form, filling long applications in one click.",
      badge: "Core Speed",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
    },
    {
      icon: Users,
      title: "Family Document Storage",
      description: "Create profiles for children, spouse, or elderly parents. Securely delegate permissions so children can retrieve passport copies safely.",
      badge: "Collaboration",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
    },
    {
      icon: Landmark,
      title: "Government Scheme Matching",
      description: "Let AI scan active grants and state welfare schemes. Based on your uploaded profiles, get alerts for subsidies you qualify for.",
      badge: "Automation",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
    },
    {
      icon: GraduationCap,
      title: "Scholarship Finder",
      description: "Unlock opportunities worldwide. Matches your academic transcripts and nationality to find active grants, college funding, and scholarships.",
      badge: "Academic",
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
    },
    {
      icon: Briefcase,
      title: "Job Application Assistant",
      description: "Automatically match requirements on tech job portals. Fills certifications, employment histories, and formats educational credentials to comply.",
      badge: "Employment",
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
    },
    {
      icon: Cloud,
      title: "Secure Cloud Backup",
      description: "Your digital paper lives across decentralized servers with redundant backups. High availability guarantees you can access files from anywhere, anytime.",
      badge: "Infrastructure",
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"
    },
    {
      icon: Clock,
      title: "Document Expiry Reminder",
      description: "Never suffer an expired driver license or international passport. AI extracts expiry details and notifies you 3 months prior to expiry.",
      badge: "Smart Alert",
      color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"
    },
    {
      icon: Search,
      title: "AI Semantic Search",
      description: "Can't remember where your tax ID is? Simply search 'what is my tax identification number' and Xinnava returns the exact digits, not just a raw file.",
      badge: "AI Query",
      color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20"
    },
    {
      icon: Puzzle,
      title: "Browser Extension",
      description: "Our seamless Chrome, Safari, and Firefox extension lives directly in your utility tray. Fills forms on arbitrary websites automatically.",
      badge: "Integration",
      color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly UI",
      description: "Our responsive progressive app operates perfectly on iOS and Android. Take pictures of receipts or documents directly on your phone camera.",
      badge: "Touch First",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 dark:bg-blue-500/2 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Full Suite Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Engineered For Document Intelligence
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
            A comprehensive, modular workspace designed to protect your identity, eliminate redundant data entry, and connect you to global opportunities.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuresList.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-500/20 dark:hover:border-indigo-400/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${feature.color}`}>
                      {feature.badge}
                    </span>
                  </div>

                  {/* Feature description */}
                  <div className="space-y-2 text-left">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Aesthetic bottom bar accent */}
                <div className="mt-5 h-1 w-0 bg-indigo-600 dark:bg-indigo-400 group-hover:w-full transition-all duration-500 rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
