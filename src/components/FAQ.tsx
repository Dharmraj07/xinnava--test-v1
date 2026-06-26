import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "../types";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "Is my document data secure?",
      answer: "Absolutely. Xinnava takes privacy extremely seriously. Your documents are sharded and encrypted at rest using military-grade 256-bit AES cryptographic protocols. Files are decrypted exclusively on your browser client when retrieved, ensuring zero-knowledge privacy where even Xinnava engineers cannot read your raw forms."
    },
    {
      id: "faq-2",
      question: "Can I use Indian national documents like Aadhaar, PAN, or Passport?",
      answer: "Yes! Our high-precision AI OCR scanning engine is fully optimized for international documents, including Aadhaar cards, PAN cards, voter identification sheets, European IDs, UK residency certificates, and US state licenses. It accurately maps national ID layouts."
    },
    {
      id: "faq-3",
      question: "Does it support complex government application forms?",
      answer: "Yes, our intelligent browser extension utilizes semantic input matching to map credentials to arbitrary input selectors. It is capable of auto-filling multi-stage portals, such as municipal registries, visas, college applications, state scholarship forms, and corporate HR boards safely."
    },
    {
      id: "faq-4",
      question: "Can my family share vault documents?",
      answer: "Yes, you can create separate securely delegated household profiles. Grant permissions for specific credentials (e.g. spouse birth certificate or parent's vaccination list) while keeping separate secure directories. Ideal for coordinating group travel visa applications."
    },
    {
      id: "faq-5",
      question: "What happens when a document is expiring soon?",
      answer: "Xinnava automatically scans and parses document expiration dates during OCR. It triggers email, SMS, or browser push notifications 90, 60, and 30 days prior to expiry, ensuring you always renew passports or driving permits well in advance."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-blue-500/2 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Any Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-xl mx-auto font-normal">
            Everything you need to know about Xinnava security, compatibility, and family delegation.
          </p>
        </div>

        {/* Animated Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200/50 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-500" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-7 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal border-t border-slate-50 dark:border-slate-800/40 pt-4 text-left pl-11">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
