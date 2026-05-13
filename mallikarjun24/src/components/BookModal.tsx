import React from 'react';
import { X, Save, Book as BookIcon, Image as ImageIcon, Tags, List } from 'lucide-react';
import { Book, Role } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Partial<Book>) => void;
  initialData?: Book | null;
}

export default function BookModal({ isOpen, onClose, onSave, initialData }: BookModalProps) {
  const [formData, setFormData] = React.useState<Partial<Book>>({
    title: '',
    author: '',
    isbn: '',
    category: 'Technology',
    description: '',
    coverUrl: '',
    count: 1,
    available: 1,
    publishedYear: new Date().getFullYear(),
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        author: '',
        isbn: '',
        category: 'Technology',
        description: '',
        coverUrl: '',
        count: 1,
        available: 1,
        publishedYear: new Date().getFullYear(),
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-brand-blue/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        <div className="bg-brand-blue text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookIcon className="w-5 h-5 text-amazon-orange" />
            <h2 className="text-xl font-display italic">{initialData ? 'Edit Book Record' : 'Add New Book to Archive'}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Book Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. The Pragmatic Programmer"
                  className="w-full border-b-2 border-gray-200 focus:border-brand-red outline-none py-1 transition-colors"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Author</label>
                <input
                  required
                  type="text"
                  placeholder="name of author"
                  className="w-full border-b-2 border-gray-200 focus:border-brand-red outline-none py-1 transition-colors"
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">ISBN</label>
                  <input
                    required
                    type="text"
                    className="w-full border-b-2 border-gray-200 focus:border-brand-red outline-none py-1 transition-colors"
                    value={formData.isbn}
                    onChange={e => setFormData({ ...formData, isbn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Year</label>
                  <input
                    required
                    type="number"
                    className="w-full border-b-2 border-gray-200 focus:border-brand-red outline-none py-1 transition-colors"
                    value={formData.publishedYear}
                    onChange={e => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cover Image URL</label>
                <div className="flex items-center gap-2 border-b-2 border-gray-200 focus-within:border-brand-red transition-colors">
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full outline-none py-1"
                    value={formData.coverUrl}
                    onChange={e => setFormData({ ...formData, coverUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                <select
                  className="w-full border-b-2 border-gray-200 focus:border-brand-red outline-none py-1 transition-colors bg-transparent"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Technology</option>
                  <option>Science</option>
                  <option>Literature</option>
                  <option>History</option>
                  <option>Design</option>
                  <option>Self-Help</option>
                  <option>Business</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full border-b-2 border-gray-200 focus:border-brand-red outline-none py-1 transition-colors"
                    value={formData.count}
                    onChange={e => {
                      const count = parseInt(e.target.value);
                      setFormData({ ...formData, count, available: count });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Available</label>
                  <input
                    type="number"
                    min="0"
                    max={formData.count}
                    className="w-full border-b-2 border-gray-200 focus:border-brand-red outline-none py-1 transition-colors"
                    value={formData.available}
                    onChange={e => setFormData({ ...formData, available: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={4}
                  className="w-full border-2 border-gray-200 focus:border-brand-red outline-none p-2 rounded transition-colors text-sm"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded font-bold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-brand-red text-white rounded font-bold hover:bg-brand-red-hover shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> {initialData ? 'Update Record' : 'Save Book'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
