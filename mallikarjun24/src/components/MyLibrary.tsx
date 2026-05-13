import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookMarked, Clock, Trash2, ExternalLink, Sparkles } from 'lucide-react';
import { Book } from '../types';

interface MyLibraryProps {
  onBack: () => void;
  reservedBooks: Book[];
  onRemove: (bookId: string) => void;
}

export default function MyLibrary({ onBack, reservedBooks, onRemove }: MyLibraryProps) {
  const [activeTool, setActiveTool] = React.useState('Active Reservations');
  const [readingListCount, setReadingListCount] = React.useState(8);
  const [seatsReserved, setSeatsReserved] = React.useState(8);

  const handleReserveSeat = () => {
    if (seatsReserved < 12) {
      setSeatsReserved(prev => prev + 1);
    }
  };

  const handleCancelSeat = () => {
    if (seatsReserved > 0) {
      setSeatsReserved(prev => prev - 1);
    }
  };

  const readingList = [
    { id: 'r1', title: 'The Silent Patient', author: 'Alex Michaelides', coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300' },
    { id: 'r2', title: 'Atomic Habits', author: 'James Clear', coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300' },
    { id: 'r3', title: 'Deep Work', author: 'Cal Newport', coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300' },
    { id: 'r4', title: 'The Psychology of Money', author: 'Morgan Housel', coverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300' },
    { id: 'r5', title: 'Think and Grow Rich', author: 'Napoleon Hill', coverUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=300' },
    { id: 'r6', title: 'Grit', author: 'Angela Duckworth', coverUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300' },
    { id: 'r7', title: 'Start with Why', author: 'Simon Sinek', coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300' },
    { id: 'r8', title: 'Educated', author: 'Tara Westover', coverUrl: 'https://images.unsplash.com/photo-1499209974431-9dac3e74a1e9?auto=format&fit=crop&q=80&w=300' },
    { id: 'r9', title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300' },
    { id: 'r10', title: 'The Alchemist', author: 'Paulo Coelho', coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300' },
    { id: 'r11', title: 'Becoming', author: 'Michelle Obama', coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300' },
    { id: 'r12', title: 'Blink', author: 'Malcolm Gladwell', coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300' },
  ];

  const annotations = [
    { title: "Sanskrit Artifacts", type: "Manuscript", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" },
    { title: "Geology of North Karnataka", type: "Scientific Note", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400" },
    { title: "Railway Blueprints (1920)", type: "Blueprint", img: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=400" },
    { title: "Medicinal Flora Archive", type: "Illustration", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400" },
    { title: "Hoysala Temple Maps", type: "Cartography", img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400" },
    { title: "Kannada Dialect Study", type: "Linguistics", img: "https://images.unsplash.com/photo-1583912267550-d44d4a3c5a61?auto=format&fit=crop&q=80&w=400" },
    { title: "Meteorological Records", type: "Logbook", img: "https://images.unsplash.com/photo-1590055532391-8151813135ad?auto=format&fit=crop&q=80&w=400" },
    { title: "Silk Route Trade Logs", type: "Commerce", img: "https://images.unsplash.com/photo-1454165833767-027ffea7028c?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f8fafc] pb-20"
    >
      {/* Header */}
      <header className="bg-brand-blue text-white p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-4 transform rotate-12">
            {Array.from({ length: 32 }).map((_, i) => (
              <BookMarked key={i} className="w-12 h-12" />
            ))}
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Archives
            </button>
            <div className="space-y-1">
              <h1 className="text-5xl font-display italic leading-tight">My <span className="text-amazon-orange">Collection</span></h1>
              <p className="text-sm opacity-70 font-medium max-w-md">
                Manage your reserved titles, reading history, and digital artifacts in one secure vault.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-display italic">{reservedBooks.length}</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Reserved</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-display italic tracking-tighter">
                {seatsReserved}<span className="text-sm opacity-30">/12</span>
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Seats</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Library Tools</h4>
              <nav className="space-y-1">
                {['Active Reservations', 'Reading Lists', 'Annotations', 'Study Seat'].map(item => (
                  <button 
                    key={item} 
                    onClick={() => setActiveTool(item)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeTool === item 
                      ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-blue'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-gradient-to-br from-brand-red to-orange-600 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-16 h-16" />
               </div>
               <h4 className="font-display italic text-xl mb-2">Upgrade Status</h4>
               <p className="text-[10px] opacity-80 leading-relaxed">Early Access to Dharwad Historical Manuscripts is now available for Gold Members.</p>
               <button className="mt-4 w-full py-2 bg-white text-brand-red rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">
                 Learn More
               </button>
            </div>
          </div>

          {/* Main List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-display italic">{activeTool}</h3>
               {activeTool === 'Active Reservations' && (
                 <div className="flex gap-2">
                   <div className="px-3 py-1 bg-amazon-orange/10 text-amazon-orange rounded-full text-[10px] font-black uppercase tracking-widest border border-amazon-orange/20">
                      Auto-Renew ON
                   </div>
                 </div>
               )}
            </div>

            {activeTool === 'Active Reservations' ? (
              reservedBooks.length === 0 ? (
                <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-slate-200">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookMarked className="w-10 h-10 text-slate-300" />
                   </div>
                   <h4 className="text-2xl font-display italic text-slate-400">Your collection is empty</h4>
                   <p className="text-sm text-slate-400 mt-2">Explore the archives and reserve your first book.</p>
                   <button 
                     onClick={onBack}
                     className="mt-8 px-8 py-4 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-red transition-all shadow-xl"
                   >
                     Browse Archives
                   </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reservedBooks.map((book) => (
                    <motion.div 
                      layout
                      key={book.id}
                      className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex gap-4 group"
                    >
                      <div className="w-24 h-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
                         <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                         <div>
                            <div className="flex justify-between items-start">
                               <h4 className="font-display italic text-lg leading-tight line-clamp-1">{book.title}</h4>
                               <span className="text-[8px] font-black bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full uppercase tracking-widest">
                                  #{book.isbn.slice(-4)}
                               </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{book.author}</p>
                         </div>
                         
                         <div className="space-y-2">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2 text-emerald-600">
                                  <Clock className="w-3 h-3" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Pick up within 24h</span>
                               </div>
                               <span className="text-[9px] font-bold text-orange-500 uppercase tracking-tighter">Due soon</span>
                            </div>
                            
                            <div className="flex gap-2">
                               <button 
                                 onClick={() => onRemove(book.id)}
                                 className="p-2 bg-slate-50 text-slate-400 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-all"
                                 title="Cancel Reservation"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                               <button className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-blue transition-all">
                                  View Details <ExternalLink className="w-3 h-3" />
                               </button>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            ) : activeTool === 'Reading Lists' ? (
              <div className="space-y-8">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                   {readingList.slice(0, readingListCount).map((book) => (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       key={book.id}
                       className="space-y-3 group"
                     >
                        <div className="aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group-hover:shadow-2xl transition-all">
                           <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="px-1 text-center">
                           <h5 className="font-display italic text-xs leading-tight line-clamp-1">{book.title}</h5>
                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{book.author}</p>
                        </div>
                     </motion.div>
                   ))}
                 </div>
                 
                 {readingListCount < readingList.length && (
                   <div className="flex justify-center pt-4">
                      <button 
                        onClick={() => setReadingListCount(prev => prev + 4)}
                        className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-brand-blue transition-all flex items-center gap-2"
                      >
                         More Titles <Sparkles className="w-3 h-3 text-amazon-orange" />
                      </button>
                   </div>
                 )}
              </div>
            ) : activeTool === 'Annotations' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {annotations.map((item, i) => (
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     key={i}
                     className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 group cursor-pointer"
                   >
                      <div className="h-48 relative overflow-hidden">
                         <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-brand-blue shadow-sm">
                               {item.type}
                            </span>
                         </div>
                      </div>
                      <div className="p-6 space-y-2">
                         <h4 className="font-display italic text-lg leading-tight group-hover:text-brand-blue transition-colors">{item.title}</h4>
                         <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Archive Ref #882{i}</span>
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-amazon-orange transition-colors" />
                         </div>
                      </div>
                   </motion.div>
                 ))}
              </div>
            ) : activeTool === 'Study Seat' ? (
              <div className="bg-white rounded-[40px] p-12 shadow-xl border border-slate-100 flex flex-col items-center text-center space-y-8">
                 <div className="w-24 h-24 bg-brand-blue/5 rounded-full flex items-center justify-center">
                    <Clock className="w-10 h-10 text-brand-blue" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-3xl font-display italic text-slate-900">Study Room Reservation</h4>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                       Reserve a focused study environment in the Scholar's Wing. Maximum 12 members allowed at once.
                    </p>
                 </div>

                 <div className="grid grid-cols-6 md:grid-cols-12 gap-3 w-full max-w-2xl">
                    {Array.from({ length: 12 }).map((_, i) => (
                       <div 
                         key={i} 
                         className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${
                            i < seatsReserved 
                            ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20' 
                            : 'bg-slate-50 border-slate-100 text-slate-300'
                         }`}
                       >
                          <BookMarked className="w-4 h-4" />
                       </div>
                    ))}
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button 
                      onClick={handleReserveSeat}
                      disabled={seatsReserved >= 12}
                      className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-red transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                    >
                       {seatsReserved >= 12 ? 'All Seats Occupied' : 'Reserve My Seat'}
                    </button>
                    {seatsReserved > 0 && (
                      <button 
                        onClick={handleCancelSeat}
                        className="px-10 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all active:scale-95"
                      >
                         Cancel Seat
                      </button>
                    )}
                 </div>

                 <div className="pt-8 border-t border-slate-50 w-full flex justify-center gap-12">
                    <div className="text-center">
                       <p className="text-2xl font-display italic">{seatsReserved}</p>
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Current Scholars</p>
                    </div>
                    <div className="text-center">
                       <p className="text-2xl font-display italic">{Math.max(0, 12 - seatsReserved)}</p>
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Available Slots</p>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-slate-200">
                 <h4 className="text-2xl font-display italic text-slate-400">Coming Soon</h4>
                 <p className="text-sm text-slate-400 mt-2">We are digitizing this section of your portal.</p>
              </div>
            )}

            {/* Recently Viewed */}
            <div className="pt-8 space-y-6">
               <h3 className="text-xl font-display italic">Continue Reading</h3>
               <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="min-w-[140px] space-y-2">
                       <div className="aspect-[3/4] bg-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=300`} className="w-full h-full object-cover" />
                       </div>
                       <p className="text-[10px] font-bold text-center line-clamp-1">Scholar Journal #{i}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
