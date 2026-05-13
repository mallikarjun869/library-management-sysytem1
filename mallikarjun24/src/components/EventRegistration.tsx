import React from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Ticket, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventRegistrationProps {
  onBack: () => void;
  eventName?: string;
}

export default function EventRegistration({ onBack, eventName = "Dharwad Tech Fest 2026" }: EventRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-2xl border border-emerald-100 text-center max-w-md space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-display italic text-slate-900">Seat Secured!</h2>
            <p className="text-sm font-sans font-black uppercase tracking-widest text-emerald-600">Ticket ID: #EV-{Math.floor(Math.random() * 100000)}</p>
          </div>
          <p className="text-slate-500 font-sans leading-relaxed">
            Your registration for <strong>{eventName}</strong> is confirmed. A digital pass has been added to your Student Portal.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-brand-blue text-white rounded-xl font-sans font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-lg active:scale-95"
          >
            Back to Portal
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans"
    >
      <nav className="p-6 border-b border-slate-200 bg-white sticky top-0 z-50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-red font-bold text-xs uppercase tracking-widest transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel Registration
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left: Event Details Card */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-brand-blue rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles className="w-24 h-24 rotate-12" />
              </div>
              <div className="relative z-10 space-y-6">
                 <span className="inline-block px-3 py-1 bg-white/10 rounded font-black text-[10px] uppercase tracking-widest">Upcoming Session</span>
                 <h1 className="text-4xl font-display italic leading-tight">{eventName}</h1>
                 
                 <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                       <Calendar className="w-5 h-5 text-amazon-orange shrink-0" />
                       <div>
                          <p className="text-xs font-bold">Tomorrow, 10:30 AM</p>
                          <p className="text-[10px] opacity-60">Add to Google Calendar</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <MapPin className="w-5 h-5 text-amazon-orange shrink-0" />
                       <div>
                          <p className="text-xs font-bold">Main Seminar Hall</p>
                          <p className="text-[10px] opacity-60">Library Block, 2nd Floor</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <Users className="w-5 h-5 text-amazon-orange shrink-0" />
                       <div>
                          <p className="text-xs font-bold">45 / 100 Seats Filled</p>
                          <p className="text-[10px] opacity-60 text-emerald-400">Limited Capacity Left</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Event Overview</h4>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "A flagship gathering of innovators and researchers in Dharwad. Explore modern frameworks, AI ethics, and hands-on laboratory workshops."
              </p>
           </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-3">
           <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 space-y-8">
              <div className="space-y-2">
                 <h2 className="text-2xl font-display italic">Reserve your Spot</h2>
                 <p className="text-xs text-slate-400 font-medium tracking-tight">Please provide your scholar credentials for verification.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Scholar ID / Roll No.</label>
                    <input 
                       required
                       type="text" 
                       placeholder="Ex. KLE-2024-X9"
                       className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Department</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all appearance-none cursor-pointer">
                       <option>Computer Science</option>
                       <option>Electronics & Comm.</option>
                       <option>Biomedical Research</option>
                       <option>Information Science</option>
                       <option>Civil Engineering</option>
                    </select>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Special Requirements</label>
                 <textarea 
                    rows={3}
                    placeholder="Laptop desk, dietary needs, or accessibility assistance..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all resize-none"
                 />
              </div>

              <div className="bg-brand-red/5 p-4 rounded-xl border border-brand-red/10 flex gap-4">
                 <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-brand-red/10">
                    <Ticket className="w-5 h-5 text-brand-red" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-800">Free Admission for Verified Scholars</p>
                    <p className="text-[10px] text-slate-500">Present your ID card at the entry gate.</p>
                 </div>
              </div>

              <button 
                 disabled={isSubmitting}
                 type="submit"
                 className="w-full py-4 bg-slate-900 text-white rounded-xl font-sans font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-red transition-all shadow-2xl active:scale-95 disabled:opacity-50"
              >
                 {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                    <>Register Now <ArrowLeft className="w-4 h-4 rotate-180" /></>
                 )}
              </button>

              <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                 Dharwad Library Digital Heritage Trust &copy; 2026
              </p>
           </form>
        </div>
      </div>
    </motion.div>
  );
}
