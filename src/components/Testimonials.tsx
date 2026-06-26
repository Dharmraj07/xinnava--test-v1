import { motion } from "motion/react";
import { Star, Quote, ShieldCheck } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus Sterling",
      role: "Graduate Candidate",
      org: "Oxford University Applicant",
      avatar: "MS",
      quote: "Applying to 12 different overseas colleges was a massive headache until I used Xinnava. I uploaded my academic certificate, transcript, and passport once, and Xinnava auto-filled all the portals correctly. I saved at least 40 hours of manual entries!",
      rating: 5,
      verified: true
    },
    {
      name: "Eliza Kowalski",
      role: "Family Organizer",
      org: "Mother of Three",
      avatar: "EK",
      quote: "Managing passports, immunization records, and school applications for three active kids was chaotic. With Xinnava, I can retrieve my children's document numbers and fill municipal summer camp forms in single clicks. The expiry reminders are life-savers.",
      rating: 5,
      verified: true
    },
    {
      name: "Rajesh Nair",
      role: "Operations Lead",
      org: "Digital Plaza Kiosk",
      avatar: "RN",
      quote: "We assist hundreds of local citizens with government grant applications every week. By scanning physical forms into Xinnava, we extract data accurately and fill web portals without typographical errors. Our queue processing speeds jumped by 200%.",
      rating: 5,
      verified: true
    }
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/20 border-y border-slate-100 dark:border-slate-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Social Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Loved by Early Users
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
            See how Xinnava is helping individuals and businesses around the globe eliminate manual paperwork friction.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 shadow-sm flex flex-col justify-between text-left relative group hover:shadow-xl hover:border-indigo-500/10 transition-all duration-300"
            >
              {/* Star Rating & Quote Mark */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-indigo-100 dark:text-indigo-950/60" />
              </div>

              {/* Review Quote text */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal flex-1 mb-6">
                "{rev.quote}"
              </p>

              {/* User details footer */}
              <div className="pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {rev.avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rev.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{rev.role} • {rev.org}</p>
                  </div>
                </div>

                {rev.verified && (
                  <div className="flex items-center space-x-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[9px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
