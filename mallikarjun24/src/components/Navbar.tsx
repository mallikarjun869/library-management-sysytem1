import React from 'react';
import { motion } from 'motion/react';
import { Search, Library, UserCircle, Menu, ShoppingCart, LogIn, BookOpen } from 'lucide-react';
import { Role } from '../types';

interface NavbarProps {
  currentRole: Role;
  setRole: (role: Role) => void;
  onSearch: (query: string) => void;
  onPortalClick?: () => void;
  onAccountClick?: () => void;
  onMyLibraryClick?: () => void;
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
  reservedCount?: number;
}

export default function Navbar({ 
  currentRole, 
  setRole, 
  onSearch, 
  onPortalClick, 
  onAccountClick, 
  onMyLibraryClick, 
  onCategoryChange,
  selectedCategory,
  reservedCount = 0 
}: NavbarProps) {
  const [localSearch, setLocalSearch] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch(value);
  };

  return (
    <nav className="flex flex-col">
      {/* Top Bar */}
      <div className="bg-brand-blue text-white px-4 py-2 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.reload()}>
          <div className="bg-brand-red p-1.5 rounded shadow-lg group-hover:bg-brand-red-hover transition-colors">
            <Library className="w-6 h-6" />
          </div>
          <span className="font-display italic text-2xl tracking-tighter flex items-center">
            <span className="text-amazon-orange font-black not-italic mr-1 text-3xl">KLE</span> Library
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl relative group">
          <form onSubmit={handleSubmit} className="flex items-center">
            <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-l cursor-pointer border-r border-gray-300 text-sm hidden md:block">
              All
            </div>
            <input
              type="text"
              value={localSearch}
              placeholder="Search for books, authors, or ISBN..."
              className="w-full py-2 px-4 text-gray-900 focus:outline-none ring-2 ring-transparent focus:ring-amazon-orange transition-all"
              onChange={handleInputChange}
            />
            <button 
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-r transition-colors group/search"
            >
              <Search className="w-6 h-6 text-black group-hover/search:scale-110 transition-transform" />
            </button>
          </form>
        </div>

        {/* Portal Switcher & User */}
        <div className="flex items-center gap-6 text-xs font-bold whitespace-nowrap">
          <div 
            className="group relative cursor-pointer"
            onClick={() => currentRole === 'student' && onPortalClick?.()}
          >
            <span className="block font-normal text-[10px] opacity-80">Portal</span>
            <span className="flex items-center gap-1 uppercase tracking-wider hover:text-amazon-orange transition-colors">
              {currentRole} <Menu className="w-3 h-3" />
            </span>
            
            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-1 w-40 bg-white text-gray-800 rounded shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2 border border-gray-200">
              {(['student', 'employee', 'admin'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors uppercase text-[10px] tracking-widest ${currentRole === r ? 'text-brand-red font-black' : ''}`}
                >
                  {r} Portal
                </button>
              ))}
            </div>
          </div>

          <div 
            onClick={onMyLibraryClick}
            className="cursor-pointer hover:text-amazon-orange transition-colors"
          >
            <span className="block font-normal text-[10px] opacity-80">Your</span>
            <span>Collection</span>
          </div>

          <div 
            onClick={onMyLibraryClick}
            className="flex items-center gap-1 cursor-pointer group/reserved"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-amazon-orange group-hover/reserved:scale-110 transition-transform" />
              {reservedCount > 0 && (
                <motion.span 
                  animate={{ 
                    backgroundColor: ['#e11d48', '#f59e0b', '#e11d48'],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-1 -right-1 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-md"
                >
                  {reservedCount}
                </motion.span>
              )}
            </div>
            <span className="hidden sm:inline hover:text-amazon-orange transition-colors">Reserved</span>
          </div>
          
          <div 
            onClick={onAccountClick}
            className="flex items-center gap-3 bg-brand-blue-light px-3 py-1.5 rounded cursor-pointer hover:bg-gray-700 transition-colors"
          >
            {currentRole === 'student' ? (
              <img 
                src="https://images.unsplash.com/photo-1544717297-fa15c3096471?auto=format&fit=crop&q=80&w=100" 
                alt="Student"
                className="w-8 h-8 rounded-full border border-amazon-orange shadow-lg object-cover"
              />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            <span className="font-bold text-xs">Library Account</span>
          </div>
        </div>
      </div>

      {/* Sub Bar */}
      <div className="bg-brand-blue-light text-white px-4 py-1.5 flex items-center gap-6 text-sm font-medium">
        <div 
          onClick={() => onCategoryChange?.('All')}
          className="flex items-center gap-1 cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded -ml-1 transition-all"
        >
          <Menu className="w-5 h-5" /> All Departments
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <motion.span 
            animate={selectedCategory === 'Popular' ? { 
              boxShadow: ['0 0 0px #f59e0b', '0 0 15px #f59e0b', '0 0 0px #f59e0b'],
              color: ['#ffffff', '#fbbf24', '#ffffff'],
              backgroundColor: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => onCategoryChange?.('Popular')}
            className={`cursor-pointer hover:border hover:border-white px-2 py-1 rounded-md transition-all flex items-center gap-1 ${selectedCategory === 'Popular' ? 'border border-amazon-orange text-amazon-orange font-black ring-1 ring-amazon-orange/50' : ''}`}
          >
            {selectedCategory === 'Popular' && <BookOpen className="w-3 h-3" />} Popular
          </motion.span>
          <span 
            onClick={() => onCategoryChange?.('New Arrivals')}
            className={`cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded transition-all ${selectedCategory === 'New Arrivals' ? 'border border-white font-black' : ''}`}
          >
            New Arrivals
          </span>
          <span className="cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded transition-all">Magazines</span>
          {currentRole === 'admin' && (
            <span className="cursor-pointer text-amazon-orange hover:bg-white/10 px-2 py-0.5 rounded transition-all font-bold">Admin Controls</span>
          )}
        </div>
      </div>
    </nav>
  );
}
