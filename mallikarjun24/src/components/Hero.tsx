import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const HIGHLIGHTS = [
  {
    title: "KLE Technological University",
    subtitle: "Excellence in Education since 1947. Explore our vast Dharwad campus archive.",
    color: "bg-brand-red",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "KLE BCA College, Dharwad",
    subtitle: "Empowering the next generation of software innovators and tech leaders.",
    color: "bg-amazon-orange",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Dharwad's Knowledge Hub",
    subtitle: "The pride of North Karnataka. Access premier engineering and healthcare resources.",
    color: "bg-brand-blue",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Scholar Community",
    subtitle: "Join Dharwad's elite student circle. Access mentors, journals, and exclusive study labs.",
    color: "bg-emerald-600",
    image: "https://images.unsplash.com/photo-1523240693567-510e807b9400?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "New Arrivals 2026",
    subtitle: "Just added: The latest in AI ethics, semiconductor history, and innovative product design.",
    color: "bg-violet-600",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function Hero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HIGHLIGHTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={HIGHLIGHTS[index].image} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-gray-100" />
          
          <div className="absolute top-12 left-12 max-w-lg space-y-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display italic text-6xl text-white drop-shadow-2xl leading-tight"
            >
              {HIGHLIGHTS[index].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white text-xl drop-shadow-lg font-medium opacity-90"
            >
              {HIGHLIGHTS[index].subtitle}
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amazon-orange text-brand-blue px-8 py-3 rounded font-bold shadow-xl hover:bg-orange-400 transition-colors"
            >
              Browse Catalog
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={() => setIndex((prev) => (prev === 0 ? HIGHLIGHTS.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        onClick={() => setIndex((prev) => (prev + 1) % HIGHLIGHTS.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}
