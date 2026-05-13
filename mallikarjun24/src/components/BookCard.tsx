import React from 'react';
import { Edit2, Trash2, BookOpen, AlertCircle, FlaskConical } from 'lucide-react';
import { Book, Role } from '../types';
import { motion } from 'motion/react';

interface BookCardProps {
  book: Book;
  role: Role;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onClick: (book: Book) => void;
  index?: number;
  key?: string;
}

export default function BookCard({ book, role, onEdit, onDelete, onClick, index = 0 }: BookCardProps) {
  const isEmployeeOrAdmin = role === 'employee' || role === 'admin';
  const outOfStock = book.available === 0;
  const isScience = book.category === 'Science';
  const isNewArrival = book.category === 'New Arrivals';
  const isPopular = book.category === 'Popular';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.05, 1.2),
        layout: { duration: 0.3 }
      }}
      onClick={() => onClick(book)}
      className={`bg-white p-4 rounded shadow-sm hover:shadow-xl transition-shadow flex flex-col gap-3 group border cursor-pointer ${isScience ? 'border-brand-red/30' : isNewArrival ? 'border-violet-300 bg-violet-50/10 shadow-violet-100' : isPopular ? 'border-orange-300 bg-orange-50/10' : 'border-gray-100'}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded">
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isScience && (
          <div className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg flex items-center gap-1 z-10 animate-pulse">
            <FlaskConical className="w-3 h-3" /> Featured Science
          </div>
        )}
        {isNewArrival && (
          <div className="absolute top-2 left-2 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg flex items-center gap-1 z-10">
            <BookOpen className="w-3 h-3 text-amazon-orange" /> New Arrival
          </div>
        )}
        {isPopular && (
          <div className="absolute top-2 left-2 bg-amazon-orange text-brand-blue text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg flex items-center gap-1 z-10">
            <BookOpen className="w-3 h-3 text-white" /> Popular Choice
          </div>
        )}
        {isEmployeeOrAdmin && (
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(book); }}
              className="p-2 bg-white/90 hover:bg-brand-blue hover:text-white rounded shadow-lg text-brand-blue transition-all"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(book.id); }}
              className="p-2 bg-white/90 hover:bg-brand-red hover:text-white rounded shadow-lg text-brand-red transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex gap-1">
          <span className="bg-brand-blue/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
            {book.category}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 hover:text-brand-red cursor-pointer transition-colors flex items-center gap-1">
          {book.title} {isScience && <span className="text-blue-500 font-bold text-[10px] bg-blue-100 px-1 rounded">DEEP RESEARCH</span>}
        </h3>
        <p className="text-sm text-gray-600 italic">by {book.author}</p>
        
        <div className="flex items-center gap-2 mt-2">
          {outOfStock ? (
            <span className="flex items-center gap-1 text-brand-red text-xs font-bold uppercase">
              <AlertCircle className="w-3 h-3" /> Unavailable
            </span>
          ) : (
            <span className="text-green-600 text-xs font-bold uppercase">
              Available: {book.available}
            </span>
          )}
          <span className="text-gray-400 text-xs">| Total: {book.count}</span>
        </div>
        
        <p className="text-xs text-gray-400 mt-1">ISBN: {book.isbn}</p>
      </div>

      <button 
        disabled={outOfStock}
        onClick={(e) => e.stopPropagation()}
        className={`w-full py-2 rounded font-bold text-sm transition-all ${
          outOfStock 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-amazon-orange hover:bg-orange-400 text-brand-blue shadow hover:shadow-md'
        }`}
      >
        {outOfStock ? 'Out of Stock' : 'Reserve Book'}
      </button>

      {role === 'admin' && (
        <div className="pt-2 border-t border-gray-100 mt-2 flex justify-between items-center">
           <span className="text-[10px] font-black text-brand-blue tracking-widest uppercase opacity-50">Admin Access</span>
           <BookOpen className="w-3 h-3 text-brand-blue opacity-30" />
        </div>
      )}
    </motion.div>
  );
}
