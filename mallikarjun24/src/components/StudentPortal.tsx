import React from 'react';
import { ArrowLeft, GraduationCap, Book, Clock, Star, Bell, Calendar, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface StudentPortalProps {
  onBack: () => void;
  onRegisterEvent?: () => void;
  studentName?: string;
}

const BORROWED_BOOKS = [
  { id: 1, title: 'Python for Data Analysis', dueDate: '2026-05-20', progress: 65 },
  { id: 2, title: 'Operating Systems Concept', dueDate: '2026-05-15', progress: 20 },
];

export default function StudentPortal({ onBack, onRegisterEvent, studentName = 'Alex' }: StudentPortalProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 text-gray-900 font-sans"
    >
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Library Home
        </button>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-brand-red" />
          <h1 className="font-display italic text-2xl text-brand-blue">Student <span className="text-brand-red not-italic font-black">Portal</span></h1>
        </div>
        <div className="flex items-center gap-4">
           <button className="p-2 text-gray-400 hover:text-brand-red relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-red rounded-full" />
           </button>
           <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center text-white font-black text-xs">
              {studentName[0]}
           </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome Section */}
        <div className="bg-brand-blue rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <GraduationCap className="w-64 h-64 rotate-12" />
           </div>
           <div className="relative z-10 space-y-4">
              <span className="inline-block px-3 py-1 bg-white/10 rounded text-[10px] font-black uppercase tracking-widest">Spring Semester 2026</span>
              <h2 className="text-4xl md:text-6xl font-display italic leading-tight">Welcome back, <span className="text-brand-red">{studentName}!</span></h2>
              <p className="text-lg opacity-80 max-w-xl">You have 2 books due this week. Stay ahead of your curriculum with our digital archives.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left: Active Loans */}
           <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-display italic flex items-center gap-2">
                    <Book className="w-5 h-5 text-brand-red" /> My Active Loans
                 </h3>
                 <button className="text-[10px] font-black uppercase text-brand-blue border-b-2 border-brand-red">View History</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {BORROWED_BOOKS.map(book => (
                    <div key={book.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                       <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-800 leading-tight">{book.title}</h4>
                          <span className="text-[9px] font-black bg-brand-red/10 text-brand-red px-2 py-1 rounded">DUE SOON</span>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                             <span>Reading Progress</span>
                             <span>{book.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-brand-blue transition-all" style={{ width: `${book.progress}%` }} />
                          </div>
                       </div>
                       <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                          <Clock className="w-3 h-3" /> Due by {book.dueDate}
                       </div>
                    </div>
                 ))}
              </div>

              {/* Learning Stats */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="text-center space-y-1">
                    <p className="text-3xl font-display italic text-brand-blue">12</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Books Finished</p>
                 </div>
                 <div className="text-center space-y-1 border-x border-gray-100">
                    <p className="text-3xl font-display italic text-brand-red">850</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pages Read</p>
                 </div>
                 <div className="text-center space-y-1">
                    <p className="text-3xl font-display italic text-amazon-orange">4.8</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Impact Score</p>
                 </div>
              </div>
           </div>

           {/* Right: Sidebar Info */}
           <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                 <h3 className="font-display italic text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-amazon-orange" /> Achievements
                 </h3>
                 <div className="space-y-3">
                    {[
                       { icon: '🔥', label: '7 Day Streak' },
                       { icon: '📚', label: 'History Buff' },
                       { icon: '💻', label: 'Code Explorer' }
                    ].map(badge => (
                       <div key={badge.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <span className="text-xl">{badge.icon}</span>
                          <span className="text-xs font-bold text-gray-700">{badge.label}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="bg-brand-red/5 rounded-2xl p-6 border border-brand-red/10 space-y-4">
                 <h3 className="font-display italic text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-red" /> Library Events
                 </h3>
                 <div className="space-y-4">
                    <div className="space-y-1">
                       <p className="text-xs font-bold text-brand-blue">Dharwad Tech Fest</p>
                       <p className="text-[10px] text-gray-500 italic">Tomorrow at 10:30 AM</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-xs font-bold text-brand-blue">Manuscript Digitisation Workshop</p>
                       <p className="text-[10px] text-gray-500 italic">Friday at 2:00 PM</p>
                    </div>
                 </div>
                 <button 
                   onClick={onRegisterEvent}
                   className="w-full py-3 bg-brand-blue text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-brand-red transition-all"
                 >
                    Register for Events
                 </button>
              </div>
           </div>
        </div>
      </main>
    </motion.div>
  );
}
