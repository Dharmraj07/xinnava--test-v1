import { motion } from "motion/react";
import { Sparkles, ArrowRight, Play, ShieldAlert, BadgePercent, Cpu } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-3xl -z-10" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 blur-3xl -z-10 animate-pulse duration-[8000ms]" />
      
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
            {/* Animated Micro-Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/80 dark:border-indigo-900/40 text-xs font-semibold text-indigo-600 dark:text-indigo-300"
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              <Cpu className="w-3.5 h-3.5" />
              <span>Next-Gen Document Infrastructure v2.1</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
              >
                Upload Once. <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 bg-clip-text text-transparent">
                  Apply Everywhere.
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed"
              >
                Store your important documents securely in an AI-powered vault. Extract structured details instantly and autofill government, job, or banking forms in a single click.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <a
                href="#waitlist"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-blue-600 dark:hover:bg-blue-50 font-semibold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-200"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#preview"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-all duration-200"
              >
                <Play className="w-3.5 h-3.5 fill-current text-indigo-500" />
                Try Live Simulator
              </a>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 max-w-md"
            >
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-blue-400">99.8%</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">OCR Accuracy</p>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-blue-400">256-bit</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">AES Encryption</p>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-blue-400">&lt; 3s</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Form Auto-Fill</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Dashboard Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              {/* Glowing Background Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-15 dark:opacity-20 animate-pulse duration-[6000ms]" />

              {/* Decorative Document Vault Visual */}
              <div className="relative rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-[#0b1222]/90 p-5 shadow-2xl backdrop-blur-xl">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">vault://central-secure-id</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    AES-256 SECURED
                  </div>
                </div>

                {/* Simulated scanning animation */}
                <div className="space-y-4">
                  {/* Mock Passport */}
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/40 dark:from-indigo-950/20 dark:to-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 overflow-hidden group">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-blue-500 animate-bounce duration-[2000ms]" />
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-indigo-500">Document Scan Active</div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-100 text-sm">International Passport.pdf</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">UK Passport Authority</p>
                      </div>
                      <Sparkles className="w-4.5 h-4.5 text-blue-500 animate-spin duration-[4000ms]" />
                    </div>
                    <div className="mt-3.5 space-y-1.5">
                      <div className="h-1.5 w-3/4 rounded bg-indigo-200/50 dark:bg-indigo-800/50" />
                      <div className="h-1.5 w-1/2 rounded bg-indigo-200/50 dark:bg-indigo-800/50" />
                    </div>
                  </div>

                  {/* Extract Flow Connector */}
                  <div className="flex justify-center my-1.5">
                    <div className="h-8 w-0.5 border-r border-dashed border-indigo-400/50" />
                  </div>

                  {/* Dynamic Extraction List */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 space-y-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">AI Extracted Metadata</span>
                    
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400">FULL NAME</span>
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Sarah Jenkins</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400">DOCUMENT ID</span>
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">UK-PASS-98725P</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400">EXPIRY DATE</span>
                        <div className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                          2026-12-15
                          <ShieldAlert className="w-3 h-3 text-rose-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400">CONFIDENCE</span>
                        <div className="text-xs font-semibold text-emerald-500">99.8% (Verified)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -bottom-4 -left-6 bg-emerald-500 text-white rounded-xl py-2 px-3.5 shadow-lg shadow-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform duration-200">
                  <BadgePercent className="w-4.5 h-4.5" />
                  No More Double Entries
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
