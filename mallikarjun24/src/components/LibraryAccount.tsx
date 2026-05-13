import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, User, Shield, Fingerprint, BookOpen, Sparkles, Phone, CheckCircle2 } from 'lucide-react';

interface LibraryAccountProps {
  onBack: () => void;
  onSuccess: (userData: { name: string; id: string }) => void;
}

export default function LibraryAccount({ onBack, onSuccess }: LibraryAccountProps) {
  const [mode, setMode] = React.useState<'login' | 'register'>('register');
  const [formData, setFormData] = React.useState({
    name: '',
    idNumber: '',
    password: '',
    mobileNumber: '',
    department: 'General Studies',
    scholarType: 'Student'
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (mode === 'register') {
        setShowSuccess(true);
        setTimeout(() => {
          onSuccess({
            name: formData.name || 'Scholar',
            id: formData.idNumber
          });
        }, 2000);
      } else {
        onSuccess({
          name: formData.name || 'Scholar',
          id: formData.idNumber
        });
      }
      setIsSubmitting(false);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white text-slate-900 p-12 rounded-[40px] text-center space-y-6 shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 rounded-t-[40px]" />
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-display italic">Welcome, {formData.name}!</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Account Created Successfully</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
             <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <p className="text-[10px] font-black uppercase tracking-tight text-slate-400">Department</p>
                <p className="text-xs font-bold text-brand-blue">{formData.department}</p>
             </div>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Notification Sent To</p>
             <p className="text-lg font-display italic text-brand-blue">{formData.mobileNumber}</p>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Your scholar credentials have been verified. Opening the library archives...
          </p>
          <div className="flex justify-center">
             <div className="w-8 h-8 border-4 border-slate-200 border-t-brand-blue rounded-full animate-spin" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden relative z-10"
      >
        {/* Left Side: Brand & Vibe */}
        <div className="bg-brand-blue p-12 text-white flex flex-col justify-between relative group">
           <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
             <div className="grid grid-cols-6 gap-4 transform rotate-12 -translate-y-1/4">
               {Array.from({ length: 48 }).map((_, i) => (
                 <BookOpen key={i} className="w-8 h-8" />
               ))}
             </div>
           </div>
           
           <div className="relative z-10">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-12"
              >
                <ArrowLeft className="w-4 h-4" /> Exit
              </button>
              
              <div className="space-y-4">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <Sparkles className="w-8 h-8 text-white" />
                 </div>
                 <h1 className="text-6xl font-display italic leading-[0.9] tracking-tighter">
                    Join the <br/>
                    <span className="text-brand-red not-italic font-black text-7xl block mt-2">Scholars</span> 
                    <span className="text-2xl mt-4 block opacity-50 font-sans font-black uppercase tracking-[0.3em]">of Dharwad</span>
                 </h1>
                 <p className="text-sm opacity-70 font-medium leading-relaxed max-w-sm">
                    Access over 2.5 million digitized records, ancient manuscripts, and modern technical insights.
                 </p>
              </div>
           </div>

           <div className="relative z-10 pt-12 border-t border-white/10">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-blue bg-slate-200 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-brand-blue bg-brand-red flex items-center justify-center text-[10px] font-black">
                    +2k
                 </div>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-black mt-4 opacity-50">Active Library Members</p>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-12 md:p-20 flex flex-col justify-center">
           <div className="space-y-8">
              <div className="space-y-4">
                 <div className="flex gap-4">
                    <button 
                      onClick={() => setMode('register')}
                      className={`text-xl font-display italic pb-2 border-b-2 transition-all ${mode === 'register' ? 'border-brand-red text-slate-900' : 'border-transparent text-slate-300'}`}
                    >
                      Registration
                    </button>
                    <button 
                      onClick={() => setMode('login')}
                      className={`text-xl font-display italic pb-2 border-b-2 transition-all ${mode === 'login' ? 'border-brand-red text-slate-900' : 'border-transparent text-slate-300'}`}
                    >
                      Login
                    </button>
                 </div>
                 <p className="text-xs text-slate-400 font-medium">Verify your credentials to open the library doors.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                 <AnimatePresence mode="wait">
                    {mode === 'register' && (
                       <motion.div 
                         key="register"
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -20 }}
                         className="space-y-5"
                       >
                          <div className="relative">
                             <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                             <input 
                                required
                                type="text" 
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all placeholder:text-slate-400"
                             />
                          </div>
                          <div className="relative">
                             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                             <input 
                                required
                                type="tel" 
                                placeholder="Mobile Number"
                                value={formData.mobileNumber}
                                onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all placeholder:text-slate-400"
                             />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div className="relative">
                                <select 
                                   value={formData.scholarType}
                                   onChange={(e) => setFormData({...formData, scholarType: e.target.value})}
                                   className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all appearance-none cursor-pointer"
                                >
                                   <option value="Student">Student</option>
                                   <option value="Researcher">Researcher</option>
                                   <option value="Faculty">Faculty</option>
                                   <option value="Staff">Staff</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                   <ArrowLeft className="w-3 h-3 text-slate-400 -rotate-90" />
                                </div>
                             </div>
                             <div className="relative">
                                <select 
                                   value={formData.department}
                                   onChange={(e) => setFormData({...formData, department: e.target.value})}
                                   className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all appearance-none cursor-pointer"
                                >
                                   <option value="General Studies">General</option>
                                   <option value="Sanskrit Architecture">Sanskrit</option>
                                   <option value="Geological Science">Geology</option>
                                   <option value="Railway Logics">Railway</option>
                                   <option value="Agricultural Botany">Botany</option>
                                   <option value="Kannada Heritage">Heritage</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                   <ArrowLeft className="w-3 h-3 text-slate-400 -rotate-90" />
                                </div>
                             </div>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>

                 <div className="relative">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                       required
                       type="text" 
                       placeholder="Scholar ID Number"
                       value={formData.idNumber}
                       onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                       className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all placeholder:text-slate-400"
                    />
                 </div>

                 <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                       required
                       type="password" 
                       placeholder="Access Password"
                       value={formData.password}
                       onChange={(e) => setFormData({...formData, password: e.target.value})}
                       className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all placeholder:text-slate-400"
                    />
                 </div>

                 <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-brand-red transition-all shadow-xl active:scale-95 disabled:opacity-50 mt-4"
                 >
                    {isSubmitting ? (
                       <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                       <>{mode === 'register' ? 'Create Account' : 'Access Library'} <ArrowLeft className="w-4 h-4 rotate-180" /></>
                    )}
                 </button>
              </form>

              <div className="pt-8 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Library Server Status: Online</span>
                 </div>
                 <a href="#" className="text-[10px] font-black uppercase text-brand-blue border-b border-brand-blue/20">Forgot Password?</a>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
