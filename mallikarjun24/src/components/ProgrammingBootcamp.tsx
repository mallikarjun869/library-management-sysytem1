import React from 'react';
import { ArrowLeft, Braces, Code2, Globe, Cpu, BookOpen, Play, Github, Zap, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgrammingBootcampProps {
  onBack: () => void;
}

const MODULES = [
  {
    id: 1,
    title: "Python for AI",
    icon: <Braces className="w-8 h-8 text-[#3776AB]" />,
    description: "Master the fundamentals of Python, the core language of Artificial Intelligence and Data Science.",
    topics: ["Syntax & Types", "NumPy & Pandas", "Automation Scripts"],
    active: true
  },
  {
    id: 2,
    title: "Web Mastery (HTML/JS)",
    icon: <Globe className="w-8 h-8 text-orange-500" />,
    description: "Build robust, interactive frontends using modern HTML5, CSS3, and modern JavaScript engines.",
    topics: ["DOM Manipulation", "Responsive Design", "API Integration"],
    active: false
  },
  {
    id: 3,
    title: "Enterprise Java",
    icon: <Cpu className="w-8 h-8 text-red-600" />,
    description: "Deep dive into object-oriented programming for large-scale enterprise systems and Android apps.",
    topics: ["Spring Boot", "JVM Internals", "Multithreading"],
    active: false
  },
  {
    id: 4,
    title: "System-Level C",
    icon: <Code2 className="w-8 h-8 text-blue-700" />,
    description: "Understand the hardware-software interface by mastering memory management and pointers in C.",
    topics: ["Pointers & Memory", "Kernel Dev", "Data Structures"],
    active: false
  }
];

export default function ProgrammingBootcamp({ onBack }: ProgrammingBootcampProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-emerald-500/30"
    >
      {/* HUD-like Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20 font-bold text-xs uppercase tracking-widest hover:bg-emerald-500/20 transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Exit Bootcamp
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/10">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status: <span className="text-emerald-400">Operational</span></span>
          </div>
          <h2 className="font-display italic text-lg hidden md:block">Coding <span className="text-emerald-500">Masters</span> Series</h2>
        </div>
        <div className="hidden md:flex items-center gap-4">
           <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
           <div className="text-[10px] font-black uppercase tracking-widest opacity-50">Level 0: Initialize</div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-20 space-y-6">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400"
           >
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
             Live 2026 Curriculum
           </motion.div>
           <h1 className="text-5xl md:text-8xl font-display italic tracking-tighter leading-tight max-w-4xl">
             From Syntax to <span className="text-emerald-500 not-italic font-black">Production.</span>
           </h1>
           <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
             Join the elites in mastering the architectural foundations of modern software. Our labs are powered by real-world IDE environments and AI-assisted pair programming.
           </p>
        </header>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
           {MODULES.map((module, idx) => (
             <motion.div
               key={module.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className={`p-8 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${module.active ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100 hover:border-white/20'}`}
             >
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-6">
                   <div className="p-4 bg-black/40 rounded-xl border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                      {module.icon}
                   </div>
                   <div className={`px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest ${module.active ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white/50'}`}>
                      {module.active ? 'Available Now' : 'Unlocks in 4d'}
                   </div>
                </div>

                <h3 className="text-2xl font-display italic mb-3 group-hover:text-emerald-400 transition-colors">{module.title}</h3>
                <p className="text-sm text-gray-400 mb-6 font-sans leading-relaxed">{module.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                   {module.topics.map(topic => (
                     <span key={topic} className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded border border-white/10 text-gray-400 uppercase tracking-wide">
                        {topic}
                     </span>
                   ))}
                </div>

                <div className="flex gap-4">
                   <button className="flex-1 py-3 bg-emerald-500 text-black font-black rounded-lg text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group/btn">
                      <Play className="w-4 h-4 fill-black" /> Begin Lab
                   </button>
                   <button className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 hover:bg-white/10 transition-all">
                      <Github className="w-4 h-4" />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Learning Path */}
        <section className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-10 md:p-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5">
              <Terminal className="w-64 h-64 rotate-12" />
           </div>
           <div className="relative z-10 max-w-2xl space-y-8">
              <div className="flex items-center gap-4">
                 <BookOpen className="w-8 h-8 text-emerald-500" />
                 <h2 className="text-3xl font-display italic uppercase tracking-tighter">Your Learning Path</h2>
              </div>
              
              <div className="space-y-6">
                 {[
                   { step: 1, text: "Foundations: Understanding RAM, CPU cycles, and I/O logic." },
                   { step: 2, text: "Algorithm Design: Big O notation and efficient data pipelines." },
                   { step: 3, text: "Product Deployment: CI/CD, Containerization, and Cloud scaling." }
                 ].map(s => (
                   <div key={s.step} className="flex gap-6 items-start">
                      <div className="text-2xl font-black text-emerald-500/30 font-display italic">0{s.step}</div>
                      <p className="text-lg text-gray-300 font-sans">{s.text}</p>
                   </div>
                 ))}
              </div>

              <div className="pt-8">
                 <button className="px-8 py-4 bg-white text-black font-black rounded-xl text-sm uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95">
                    Enroll in Masterclass
                 </button>
              </div>
           </div>
        </section>
      </main>
    </motion.div>
  );
}
