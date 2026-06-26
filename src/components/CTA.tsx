import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Sparkles, Mail, Check, Calendar, ArrowRight } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const handleWaitlistSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1200);
  };

  const handleBookDemo = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setIsBooked(true);
    }, 1200);
  };

  return (
    <section id="waitlist" className="py-20 md:py-28 relative overflow-hidden">
      {/* Visual glowing geometric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-sky-400/5 blur-3xl -z-10 animate-pulse duration-[8000ms]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 md:p-14 rounded-3xl border border-slate-200/50 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shadow-2xl text-center backdrop-blur-xl overflow-hidden"
        >
          {/* Top glow flare */}
          <div className="absolute -top-12 -left-12 w-44 h-44 bg-blue-500/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-indigo-500/20 rounded-full blur-2xl" />

          <div className="max-w-2xl mx-auto space-y-6 md:space-y-8 relative">
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Early Ingestion Program</span>
            </div>

            {/* Headline & Paragraph */}
            <div className="space-y-3.5">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Start Your Paperwork-Free Journey
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed">
                Unlock immediate access to Xinnava's decentralized document vault, smart auto-fill capabilities, and instant scheme discovery.
              </p>
            </div>

            {/* Waitlist Form or Success Message */}
            <div className="max-w-md mx-auto">
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex flex-col items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                    <Check className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold">You're On The Priority List!</h4>
                  <p className="text-[11px] leading-relaxed">We have reserved your access slot. We'll email you configuration instructions soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your personal/work email"
                      className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? "Enrolling..." : "Join Waitlist"}
                  </button>
                </form>
              )}
            </div>

            {/* Booking Trigger */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 text-xs">
              <span className="text-slate-400">Prefer a personal walkthrough?</span>
              {isBooked ? (
                <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Product slot scheduled! Check email.
                </span>
              ) : (
                <button
                  onClick={handleBookDemo}
                  disabled={isBooking}
                  className="font-bold text-indigo-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {isBooking ? "Booking Slot..." : "Book a 15m Demo Video Call"}
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
