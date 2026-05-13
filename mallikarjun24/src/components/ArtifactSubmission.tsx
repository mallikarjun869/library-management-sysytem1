import React from 'react';
import { ArrowLeft, Send, Upload, ShieldCheck, FileText, Camera } from 'lucide-react';
import { motion } from 'motion/react';

interface ArtifactSubmissionProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function ArtifactSubmission({ onBack, onSubmit }: ArtifactSubmissionProps) {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-[#fdfaf6] flex flex-col items-center justify-center p-6"
      >
        <div className="text-center space-y-8 max-w-lg bg-white p-12 rounded-3xl shadow-2xl border border-brand-red/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue via-brand-red to-amazon-orange" />
          
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-green-100">
            <ShieldCheck className="w-12 h-12" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-4xl font-display italic text-brand-blue tracking-tight">Gratitude from Dharwad</h2>
            <p className="text-sm font-sans font-bold uppercase tracking-widest text-brand-red opacity-80">Reference ID: #DH-{Math.floor(Math.random() * 100000)}</p>
          </div>

          <p className="text-gray-600 font-sans leading-relaxed text-lg">
            Your contribution has been successfully queued for digitisation. We truly value your feedback and your commitment to preserving our collective memory.
          </p>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
            <p className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-400">Next Steps</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
               <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                  <p className="font-sans font-bold text-xs">Curation Review</p>
                  <p className="text-[10px] text-gray-500">Experts will verify the historical context.</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                  <p className="font-sans font-bold text-xs">Digital Display</p>
                  <p className="text-[10px] text-gray-500">Upon approval, it will appear in the library.</p>
               </div>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="w-full py-4 bg-brand-blue text-white rounded-xl font-sans font-black uppercase tracking-widest hover:bg-brand-red hover:scale-[1.02] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group/btn"
          >
            <span>Return to History Portal</span>
            <ArrowLeft className="w-4 h-4 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
          </button>
          <p className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-gray-300">Preserving our past for a brighter Dharwad</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#fdfaf6] text-brand-blue font-serif"
    >
      <nav className="p-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-red font-sans font-black text-xs uppercase tracking-widest hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel Submission
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-12 space-y-4">
          <span className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red font-sans font-black text-[10px] uppercase tracking-widest rounded">
            Community Contribution
          </span>
          <h1 className="text-4xl md:text-5xl font-display italic leading-tight">
            Help Preserve our <span className="text-brand-red">Heritage</span>
          </h1>
          <p className="text-gray-600 font-sans leading-relaxed">
            By contributing original photographs, manuscripts, or oral histories, you ensure that Dharwad's rich academic and cultural legacy remains accessible for future generations.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-brand-red/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-500">FullName</label>
              <input 
                required
                type="text" 
                placeholder="Ex. Dr. Vinayak Kulkarni"
                className="w-full bg-gray-50 border-none rounded-lg p-4 font-sans text-sm focus:ring-2 focus:ring-brand-red/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-500">Artifact Category</label>
              <select className="w-full bg-gray-50 border-none rounded-lg p-4 font-sans text-sm focus:ring-2 focus:ring-brand-red/50 outline-none appearance-none">
                <option>Photograph / Image</option>
                <option>Manuscript / Letter</option>
                <option>Audio Recording</option>
                <option>Physical Object Description</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-500">Description & Historical Context</label>
            <textarea 
              required
              rows={4}
              placeholder="Tell us about the artifact's origin, estimated date, and its significance to Dharwad..."
              className="w-full bg-gray-50 border-none rounded-lg p-4 font-sans text-sm focus:ring-2 focus:ring-brand-red/50 outline-none resize-none"
            />
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center space-y-4 hover:border-brand-red/30 transition-colors cursor-pointer group">
             <div className="w-16 h-16 bg-brand-red/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-brand-red" />
             </div>
             <div className="space-y-1">
                <p className="font-sans font-bold text-sm">Drop your digital files here</p>
                <p className="text-xs text-gray-400 font-sans">JPG, PNG, or PDF up to 20MB</p>
             </div>
             <div className="flex justify-center gap-4 pt-2">
                <button type="button" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-[10px] font-sans font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                   <Camera className="w-3 h-3" /> Capture
                </button>
                <button type="button" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-[10px] font-sans font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                   <FileText className="w-3 h-3" /> Browse
                </button>
             </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 bg-brand-blue text-white rounded-xl font-sans font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-red transition-all shadow-xl active:scale-[0.98]"
            >
              <Send className="w-4 h-4" /> Finalize Submission
            </button>
            <p className="text-center text-[10px] text-gray-400 font-sans mt-4 italic">
              By submitting, you agree to our digital heritage open-access terms.
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
