/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plus, Filter, LayoutGrid, List as ListIcon, Book as BookIcon, Library, Cpu, ArrowRight, Code, Terminal } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import BookDetailsModal from './components/BookDetailsModal';
import HistoryExplorer from './components/HistoryExplorer';
import ArtifactSubmission from './components/ArtifactSubmission';
import ProgrammingBootcamp from './components/ProgrammingBootcamp';
import StudentPortal from './components/StudentPortal';
import EventRegistration from './components/EventRegistration';
import LibraryAccount from './components/LibraryAccount';
import MyLibrary from './components/MyLibrary';
import { Book, Role, Review } from './types';
import { INITIAL_BOOKS, CATEGORIES, CATEGORY_BANNERS, SECONDARY_BANNERS } from './constants';
import { motion, AnimatePresence } from 'motion/react';

type View = 'dashboard' | 'history-explorer' | 'artifact-submission' | 'programming-bootcamp' | 'student-portal' | 'event-registration' | 'library-account' | 'my-library';

export default function App() {
  const [role, setRole] = React.useState<Role>('student');
  const [view, setView] = React.useState<View>('dashboard');
  const [user, setUser] = React.useState<{ name: string; id: string } | null>(null);
  const [reservedBooks, setReservedBooks] = React.useState<Book[]>(() => {
    const saved = localStorage.getItem('reserved_books');
    if (saved) return JSON.parse(saved);
    // Initial seeds for demo
    return INITIAL_BOOKS.slice(0, 4);
  });
  const [books, setBooks] = React.useState<Book[]>(() => {
    const saved = localStorage.getItem('library_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [editingBook, setEditingBook] = React.useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);

  const currentUser = {
    id: role === 'admin' ? 'admin-1' : role === 'employee' ? 'emp-1' : 'stu-1',
    name: user?.name || (role === 'admin' ? 'Chief Librarian' : role === 'employee' ? 'Archive Assistant' : 'Scholar Member'),
    role
  };

  // Persistence
  React.useEffect(() => {
    localStorage.setItem('library_books', JSON.stringify(books));
  }, [books]);

  React.useEffect(() => {
    localStorage.setItem('reserved_books', JSON.stringify(reservedBooks));
  }, [reservedBooks]);

  // Filtered Books
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSaveBook = (bookData: Partial<Book>) => {
    if (editingBook) {
      setBooks(prev => prev.map(b => b.id === editingBook.id ? { ...b, ...bookData } as Book : b));
    } else {
      const newBook: Book = {
        ...bookData,
        id: Date.now().toString(),
      } as Book;
      setBooks(prev => [newBook, ...prev]);
    }
    setEditingBook(null);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Are you sure you want to delete this book from the archive?')) {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleReserve = (book: Book) => {
    if (!reservedBooks.find(b => b.id === book.id)) {
      setReservedBooks(prev => [...prev, book]);
      // Update count locally
      setBooks(prev => prev.map(b => 
        b.id === book.id ? { ...b, available: Math.max(0, b.available - 1) } : b
      ));
    }
  };

  const handleCancelReservation = (bookId: string) => {
    setReservedBooks(prev => prev.filter(b => b.id !== bookId));
    setBooks(prev => prev.map(b => 
      b.id === bookId ? { ...b, available: b.available + 1 } : b
    ));
  };

  const openAddModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const openDetailsModal = (book: Book) => {
    setSelectedBook(book);
    setIsDetailsOpen(true);
  };

  const handleAddReview = (bookId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };

    setBooks(prev => prev.map(b => 
      b.id === bookId ? { ...b, reviews: [newReview, ...(b.reviews || [])] } : b
    ));

    // Update selected book if open
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook(prev => prev ? { ...prev, reviews: [newReview, ...(prev.reviews || [])] } : null);
    }
  };

  const handleDeleteReview = (bookId: string, reviewId: string) => {
    setBooks(prev => prev.map(b => 
      b.id === bookId ? { ...b, reviews: (b.reviews || []).filter(r => r.id !== reviewId) } : b
    ));

    // Update selected book if open
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook(prev => prev ? { ...prev, reviews: (prev.reviews || []).filter(r => r.id !== reviewId) } : null);
    }
  };

  if (view === 'history-explorer') {
    return (
      <HistoryExplorer 
        onBack={() => setView('dashboard')} 
        onSubmitArtifact={() => setView('artifact-submission')}
      />
    );
  }

  if (view === 'artifact-submission') {
    return (
      <ArtifactSubmission 
        onBack={() => setView('history-explorer')}
        onSubmit={() => setView('history-explorer')}
      />
    );
  }

  if (view === 'programming-bootcamp') {
    return (
      <ProgrammingBootcamp onBack={() => setView('dashboard')} />
    );
  }

  if (view === 'student-portal') {
    return (
      <StudentPortal 
        onBack={() => setView('dashboard')} 
        onRegisterEvent={() => setView('event-registration')}
        studentName={currentUser.name}
      />
    );
  }

  if (view === 'event-registration') {
    return (
      <EventRegistration 
        onBack={() => setView('student-portal')}
      />
    );
  }

  if (view === 'library-account') {
    return (
      <LibraryAccount 
        onBack={() => setView('dashboard')}
        onSuccess={(data) => {
          setUser(data);
          setView('dashboard');
        }}
      />
    );
  }

  if (view === 'my-library') {
    return (
      <MyLibrary 
        onBack={() => setView('dashboard')}
        reservedBooks={reservedBooks}
        onRemove={handleCancelReservation}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pb-20">
      <Navbar 
        currentRole={role} 
        setRole={setRole} 
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onPortalClick={() => setView('student-portal')}
        onAccountClick={() => setView('library-account')}
        onMyLibraryClick={() => setView('my-library')}
        reservedCount={reservedBooks.length}
      />
      
      <main className="flex-1 flex flex-col items-center">
        {/* Amazon-style Hero Area */}
        <div className="w-full max-w-7xl">
          <Hero />
        </div>

        {/* Content Section */}
        <div className="w-full max-w-7xl px-4 -mt-16 relative z-10 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            <div className="bg-white p-5 rounded shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">
                <Filter className="w-4 h-4 text-brand-red" /> Department
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <label key={cat} className={`flex items-center gap-2 group cursor-pointer py-1.5 px-2 rounded hover:bg-gray-50 transition-all border ${cat === 'Design' ? 'border-indigo-200 bg-indigo-50/50 ring-1 ring-indigo-100' : cat === 'Programming' ? 'border-blue-200 bg-blue-50/30' : 'border-transparent'} hover:border-gray-100`}>
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className={`w-4 h-4 cursor-pointer ${cat === 'Design' ? 'accent-indigo-600' : cat === 'Programming' ? 'accent-brand-blue' : 'accent-brand-red'}`}
                    />
                    <span className={`text-xs transition-colors ${selectedCategory === cat ? (cat === 'Design' ? 'text-indigo-700 font-black' : cat === 'Programming' ? 'text-brand-blue font-black' : 'text-brand-red font-black') : (cat === 'Design' ? 'text-indigo-600/70 group-hover:text-indigo-600' : cat === 'Programming' ? 'text-brand-blue group-hover:text-brand-blue' : 'text-gray-700 group-hover:text-brand-blue')}`}>
                      {cat}
                      {cat === 'Design' && <span className="ml-1 text-[8px] bg-indigo-600 text-white px-1 rounded-sm font-black animate-pulse">HOT</span>}
                      {cat === 'Programming' && <span className="ml-1 text-[8px] bg-emerald-600 text-white px-1 rounded-sm font-black uppercase shadow-sm">Masterclass</span>}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-950 to-brand-blue rounded-xl p-6 text-white space-y-4 shadow-xl overflow-hidden relative group border-l-8 border-brand-red">
               <div className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-40 transition-all transform group-hover:scale-110">
                  <img 
                    src="https://images.unsplash.com/photo-1544717297-fa15c3096471?auto=format&fit=crop&q=80&w=300" 
                    alt="Student"
                    className="w-full h-full object-cover rounded-full grayscale"
                  />
               </div>
               <div className="relative z-10">
                 <h4 className="font-display italic text-2xl uppercase tracking-tighter">Student <span className="text-brand-red not-italic font-black">Specials</span></h4>
                 <p className="text-xs opacity-70 mt-2 font-medium leading-relaxed">Exclusive 40% discount on KLE publication journals and international technical papers for verified scholars.</p>
                 <button className="mt-4 px-6 py-2 bg-brand-red text-white font-black rounded text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-red transition-all shadow-lg">
                   Claim Offer
                 </button>
               </div>
            </div>

            <div className="bg-brand-blue rounded-xl p-6 text-white space-y-4 shadow-xl overflow-hidden relative group border-b-8 border-amazon-orange">
               <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue to-indigo-900 opacity-90" />
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-amazon-orange/10 rounded-full blur-3xl group-hover:bg-amazon-orange/20 transition-all" />
               
               <div className="relative z-10 space-y-4">
                  <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20">
                     <Cpu className="w-6 h-6 text-amazon-orange" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-display italic text-2xl uppercase tracking-tighter leading-none">
                      Generative <span className="text-amazon-orange not-italic font-black">AI</span>
                    </h4>
                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-indigo-200">The 2026 Archive</p>
                  </div>
                  
                  <p className="text-xs font-medium leading-relaxed opacity-90 border-l-2 border-amazon-orange pl-3 italic">
                    "Unlocking the future of creativity and computation through LLMs and Diffusion Models."
                  </p>
                  
                  <button 
                    onClick={() => setSelectedCategory('Technology')}
                    className="w-full py-3 bg-amazon-orange text-brand-blue font-black rounded-lg text-xs hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,153,0,0.3)] hover:shadow-none active:scale-95 uppercase tracking-wide group/btn"
                  >
                    <span>Browse Intelligence</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>

            <div className="bg-white rounded-xl p-6 text-brand-blue space-y-4 shadow-xl overflow-hidden relative group border-t-8 border-brand-red">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity" />
               
               <div className="relative z-10 space-y-4">
                  <div className="bg-brand-red/10 w-12 h-12 rounded-lg flex items-center justify-center border border-brand-red/20">
                    <Library className="w-6 h-6 text-brand-red" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-display italic text-2xl uppercase tracking-tighter leading-none">
                      Historical <span className="text-brand-red not-italic font-black">Wisdom</span>
                    </h4>
                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-gray-500">AI Restored Archives</p>
                  </div>
                  
                  <p className="text-xs font-medium leading-relaxed text-gray-600 border-l-2 border-brand-red pl-3 italic">
                    "Virtually explore the ancient civilizations and Dharwad's rich heritage via our digital archive."
                  </p>
                  
                  <button 
                    onClick={() => setView('history-explorer')}
                    className="w-full py-3 bg-brand-blue text-white font-black rounded-lg text-xs hover:bg-brand-red transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 uppercase tracking-wide group/btn"
                  >
                    <span>Visit History</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>

            <div className="bg-emerald-900 rounded-xl p-6 text-white space-y-4 shadow-xl overflow-hidden relative group border-r-8 border-amazon-orange">
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 opacity-90" />
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Code className="w-24 h-24 rotate-[-15deg]" />
               </div>
               
               <div className="relative z-10 space-y-4">
                  <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20">
                     <Terminal className="w-6 h-6 text-amazon-orange" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-display italic text-2xl uppercase tracking-tighter leading-none">
                      Coding <span className="text-amazon-orange not-italic font-black">Masters</span>
                    </h4>
                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-emerald-200">2026 Bootcamp Series</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                     {['Python', 'HTML', 'Java', 'C'].map(lang => (
                        <span 
                          key={lang} 
                          onClick={(e) => {
                             e.stopPropagation();
                             setView('programming-bootcamp');
                          }}
                          className="text-[9px] font-black bg-white/10 px-2 py-1 rounded-sm border border-white/10 uppercase tracking-widest cursor-pointer hover:bg-emerald-500 hover:text-black transition-all"
                        >
                           {lang}
                        </span>
                     ))}
                  </div>
                  
                  <p className="text-xs font-medium leading-relaxed opacity-90 border-l-2 border-amazon-orange pl-3 italic">
                    "Mastering the logic of the machine through industry-standard modern languages."
                  </p>
                  
                  <button 
                    onClick={() => setView('programming-bootcamp')}
                    className="w-full py-3 bg-white text-emerald-900 font-black rounded-lg text-xs hover:bg-amazon-orange hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 uppercase tracking-wide group/btn"
                  >
                    <span>Access Bootcamp</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          </aside>

          {/* Main List Area */}
          <div className="space-y-6">
            {/* Category Posters Section */}
            <AnimatePresence mode="wait">
              {selectedCategory !== 'All' && (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Primary Poster */}
                  <div className="relative h-64 rounded-lg overflow-hidden shadow-2xl group cursor-pointer border-4 border-white">
                    <img 
                      src={CATEGORY_BANNERS[selectedCategory]} 
                      alt={selectedCategory}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <motion.div 
                      animate={{ 
                        opacity: [0.6, 0.4, 0.6],
                        backgroundColor: ['rgba(13, 35, 60, 0.6)', 'rgba(30, 64, 175, 0.6)', 'rgba(13, 35, 60, 0.6)']
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 via-transparent to-transparent" 
                    />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <div className="flex items-center gap-3 mb-2">
                        <motion.span 
                          animate={{ 
                            boxShadow: selectedCategory === 'Popular' 
                              ? ['0 0 0px #ffffff', '0 0 20px #ffffff', '0 0 0px #ffffff']
                              : ['0 0 0px #f59e0b', '0 0 20px #f59e0b', '0 0 0px #f59e0b']
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className={`${selectedCategory === 'Popular' ? 'bg-white text-brand-blue' : 'bg-amazon-orange text-brand-blue'} font-black text-[10px] tracking-widest px-3 py-1 rounded-full uppercase shadow-lg`}
                        >
                          {selectedCategory === 'Popular' ? 'Most Requested' : 'New Arrivals'}
                        </motion.span>
                        <div className="h-px bg-white/20 flex-1" />
                      </div>
                      <motion.h1 
                        animate={{ 
                          color: ['#ffffff', '#ffedd5', '#ffffff']
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-white text-6xl font-display italic drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] uppercase tracking-tighter leading-none"
                      >
                        {selectedCategory} Collection
                      </motion.h1>
                      <p className="text-white/60 font-black text-xs tracking-[0.3em] mt-3 uppercase">PREMIUM ARCHIVE ACCESS • UPDATED DAILY</p>
                    </div>
                  </div>

                  {/* Secondary Specialized Posters */}
                  {SECONDARY_BANNERS[selectedCategory] && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SECONDARY_BANNERS[selectedCategory].map((url, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -5 }}
                          className="relative h-40 rounded shadow-lg overflow-hidden border border-white/20"
                        >
                          <img src={url} alt="Promo" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors flex items-end p-4">
                            <span className="text-white font-bold text-[10px] uppercase tracking-widest bg-brand-red px-2 py-1">Limited Issue</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls Bar */}
            <div className="bg-white p-4 rounded shadow-sm flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Showing {filteredBooks.length} results for <span className="text-brand-red">"{selectedCategory}"</span>
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded p-1">
                  <button className="p-1.5 bg-white shadow-sm rounded text-brand-blue"><LayoutGrid className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-400 hover:text-brand-blue transition-colors"><ListIcon className="w-4 h-4" /></button>
                </div>
                
                {(role === 'employee' || role === 'admin') && (
                  <button 
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-4 py-2 rounded font-bold shadow-lg transition-transform active:scale-95"
                  >
                    <Plus className="w-5 h-5" /> Add Book
                  </button>
                )}
              </div>
            </div>

            {/* Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredBooks.map((book, idx) => (
                    <BookCard 
                      key={book.id} 
                      book={book} 
                      role={role}
                      index={idx}
                      onEdit={openEditModal}
                      onDelete={handleDeleteBook}
                      onClick={openDetailsModal}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white py-20 rounded shadow-sm flex flex-col items-center justify-center text-center px-4">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <Filter className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No matching books found</h3>
                <p className="text-gray-500 max-w-xs">Try adjusting your search or category filters to find what you're looking for.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  className="mt-6 text-brand-blue font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-brand-blue-light hover:bg-gray-600 text-white py-3 text-xs font-bold transition-colors cursor-pointer mt-12"
      >
        Back to top
      </button>

      <footer className="mt-auto bg-brand-blue text-white py-12 px-4">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
            <div className="space-y-4">
               <div className="flex items-center gap-2">
                 <Library className="w-6 h-6 text-amazon-orange" />
                 <span className="font-display italic text-2xl tracking-tighter">ScholarsArchive</span>
               </div>
               <p className="text-sm opacity-60">The definitive resource for academic excellence and digital archival since 1998.</p>
            </div>
            <div>
               <h5 className="font-bold mb-4 text-amazon-orange uppercase tracking-widest text-xs">Library Links</h5>
               <ul className="space-y-2 text-sm opacity-80">
                  <li className="hover:text-brand-red cursor-pointer">Membership Plans</li>
                  <li className="hover:text-brand-red cursor-pointer">Gift Cards</li>
                  <li className="hover:text-brand-red cursor-pointer">Borrowing Rules</li>
               </ul>
            </div>
            <div>
               <h5 className="font-bold mb-4 text-amazon-orange uppercase tracking-widest text-xs">Portals</h5>
               <ul className="space-y-2 text-sm opacity-80">
                  <li className="hover:text-brand-red cursor-pointer" onClick={() => setRole('student')}>Student Portal</li>
                  <li className="hover:text-brand-red cursor-pointer" onClick={() => setRole('employee')}>Employee Access</li>
                  <li className="hover:text-brand-red cursor-pointer" onClick={() => setRole('admin')}>Admin Console</li>
               </ul>
            </div>
            <div>
               <h5 className="font-bold mb-4 text-amazon-orange uppercase tracking-widest text-xs">Contact Support</h5>
               <ul className="space-y-2 text-sm opacity-80">
                  <li className="hover:text-brand-red cursor-pointer">Help Center</li>
                  <li className="hover:text-brand-red cursor-pointer">Report a Concern</li>
                  <li className="hover:text-brand-red cursor-pointer">Librarian Chat</li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto pt-8 flex flex-col md:row items-center justify-between gap-4 text-[10px] uppercase tracking-widest opacity-40 font-bold">
            <span>© 2026 Scholars Archive Library System</span>
            <div className="flex gap-6">
               <span>Conditions of Use</span>
               <span>Privacy Notice</span>
               <span>Interest-Based Ads</span>
            </div>
         </div>
      </footer>

      <BookModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBook}
        initialData={editingBook}
      />

      {selectedBook && (
        <BookDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          book={selectedBook}
          currentUser={currentUser}
          onAddReview={handleAddReview}
          onDeleteReview={handleDeleteReview}
          onReserve={handleReserve}
          isReserved={!!reservedBooks.find(b => b.id === selectedBook.id)}
        />
      )}
    </div>
  );
}
