import React from 'react';
import { X, Star, User, MessageCircle, ShieldAlert } from 'lucide-react';
import { Book, Role, Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
  currentUser: { id: string; name: string; role: Role };
  onAddReview: (bookId: string, review: Omit<Review, 'id' | 'date'>) => void;
  onDeleteReview?: (bookId: string, reviewId: string) => void;
  onReserve?: (book: Book) => void;
  isReserved?: boolean;
}

export default function BookDetailsModal({ 
  isOpen, 
  onClose, 
  book, 
  currentUser, 
  onAddReview,
  onDeleteReview,
  onReserve,
  isReserved
}: BookDetailsModalProps) {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [hoveredStar, setHoveredStar] = React.useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onAddReview(book.id, {
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment
    });
    setRating(0);
    setComment('');
  };

  if (!isOpen) return null;

  const averageRating = book.reviews && book.reviews.length > 0
    ? (book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length).toFixed(1)
    : 'New';

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-brand-blue/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="bg-brand-blue text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-amazon-orange" />
            <h2 className="text-xl font-display italic">Reader Experience & Reviews</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Book Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-gray-100">
              <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-display italic text-xl leading-tight">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amazon-orange">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    className={`w-4 h-4 ${Math.round(Number(averageRating)) >= s ? 'fill-amazon-orange' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-black text-brand-blue">{averageRating}</span>
              <span className="text-xs text-gray-400">({book.reviews?.length || 0} reviews)</span>
            </div>

            <div className="pt-4">
               {onReserve && (
                 <button 
                   onClick={() => onReserve(book)}
                   disabled={isReserved || book.available === 0}
                   className={`w-full py-3 rounded-lg font-black uppercase tracking-widest text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                     isReserved 
                     ? 'bg-emerald-500 text-white cursor-default' 
                     : book.available === 0
                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                     : 'bg-brand-red text-white hover:bg-brand-red-hover'
                   }`}
                 >
                   {isReserved ? 'Reserved in My Library' : book.available === 0 ? 'Out of Stock' : 'Reserve Archive Copy'}
                 </button>
               )}
            </div>
          </div>

          {/* Right Column: Reviews & Form */}
          <div className="md:col-span-2 space-y-8">
            {/* Review Form */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="text-sm font-black text-brand-blue uppercase tracking-widest mb-4">Leave a Review</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onMouseEnter={() => setHoveredStar(s)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(s)}
                        className="transition-transform active:scale-90"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            (hoveredStar || rating) >= s 
                            ? 'fill-amazon-orange text-amazon-orange' 
                            : 'text-gray-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Comment</label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded border-2 border-gray-200 focus:border-brand-red p-3 text-sm outline-none transition-colors"
                    rows={3}
                    placeholder="What did you think of this book?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={rating === 0}
                  className={`w-full py-2 rounded font-black text-sm uppercase tracking-widest transition-all ${
                    rating === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-amazon-orange text-brand-blue hover:bg-orange-400 shadow-md'
                  }`}
                >
                  Post Review
                </button>
              </form>
            </div>

            {/* List Reviews */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-brand-blue uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
                User Feedback
                {book.reviews?.length === 0 && <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-500">None Yet</span>}
              </h4>
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                <AnimatePresence initial={false}>
                  {book.reviews?.map((review) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white p-4 rounded border border-gray-100 shadow-sm relative group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-brand-blue" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{review.userName}</p>
                            <p className="text-[10px] text-gray-400">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              className={`w-3 h-3 ${review.rating >= s ? 'fill-amazon-orange text-amazon-orange' : 'text-gray-200'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 italic">"{review.comment}"</p>

                      {/* Admin Moderation */}
                      {currentUser.role === 'admin' && onDeleteReview && (
                        <button
                          onClick={() => onDeleteReview(book.id, review.id)}
                          className="absolute top-2 right-2 p-1.5 bg-brand-red/10 text-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-red hover:text-white"
                          title="Delete offensive/invalid review"
                        >
                          <ShieldAlert className="w-3 h-3" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
