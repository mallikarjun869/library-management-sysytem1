import React from 'react';
import { ArrowLeft, BookOpen, Clock, MapPin, Landmark, ScrollText } from 'lucide-react';
import { motion } from 'motion/react';

interface HistoryExplorerProps {
  onBack: () => void;
  onSubmitArtifact: () => void;
}

const HISTORICAL_SITES = [
  {
    id: 1,
    title: "Dharwad Fort",
    description: "A silent spectator to the rise and fall of various empires, the Dharwad Fort stands as a testament to the region's military history.",
    year: "1413 AD",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Karnatak University",
    description: "One of the oldest and most prestigious educational landmarks in North Karnataka, fostering scholars for decades.",
    year: "1949 AD",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Chandramouleshwara Temple",
    description: "A stunning example of Chalukyan architecture, this 900-year-old temple is located in Unkal, near Dharwad.",
    year: "12th Century",
    image: "https://images.unsplash.com/photo-1600675317300-84228965f724?auto=format&fit=crop&q=80&w=800"
  }
];

export default function HistoryExplorer({ onBack, onSubmitArtifact }: HistoryExplorerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fdfaf6] text-brand-blue font-serif"
    >
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-[#fdfaf6]/80 backdrop-blur-md border-b border-brand-red/10 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-full font-sans font-bold text-xs uppercase tracking-widest hover:bg-brand-red-hover transition-all transform hover:-translate-x-1 shadow-lg active:scale-95"
          id="back-to-dashboard"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </button>
        <div className="flex items-center gap-2">
          <Landmark className="w-5 h-5 text-brand-red" />
          <h2 className="font-display italic text-xl">Historical Wisdom Portal</h2>
        </div>
        <div className="w-32" /> {/* Spacer */}
      </nav>

      {/* Hero Section */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
             src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=1200" 
             className="w-full h-full object-cover opacity-20 sepia-[.3]"
             alt="Historical background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fdfaf6]" />
        </div>
        
        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1 bg-brand-red/10 text-brand-red font-sans font-black text-[10px] uppercase tracking-[0.3em] rounded-sm mb-4">
              AI Restored Digital Archives
            </span>
            <h1 className="text-4xl md:text-7xl font-display italic tracking-tighter leading-tight">
              Chronicles of <span className="text-brand-red">Dharwad</span>
            </h1>
          </motion.div>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Step through time and explore the cultural, academic, and architectural heartbeat of North Karnataka's premier knowledge hub.
          </motion.p>
        </div>
      </header>

      {/* Timeline/Highlights */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-12 border-b border-gray-200 pb-4">
          <Clock className="w-6 h-6 text-brand-red" />
          <h2 className="text-2xl font-display italic">Timeline of Excellence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {HISTORICAL_SITES.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group space-y-4"
            >
              <div className="aspect-[4/5] rounded overflow-hidden shadow-2xl relative">
                <img 
                  src={site.image} 
                  alt={site.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-black font-sans uppercase tracking-[0.2em] shadow-lg">
                  {site.year}
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-display italic group-hover:text-brand-red transition-colors">{site.title}</h3>
                <p className="text-sm text-gray-600 font-sans leading-relaxed mt-2">{site.description}</p>
                <div className="pt-4 flex items-center gap-2 text-brand-red font-sans font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:underline">
                  <ScrollText className="w-3 h-3" /> View Manuscripts
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Literary Heritage */}
      <section className="bg-brand-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-amazon-orange font-sans font-black text-xs uppercase tracking-[0.4em]">Literary Legacy</span>
            <h2 className="text-4xl md:text-6xl font-display italic leading-tight">
              Where Penned Dreams <br />Met Academic <span className="text-brand-red">Reality.</span>
            </h2>
            <p className="text-lg opacity-80 leading-relaxed font-sans">
              Dharwad has long been the intellectual nursery of Karnataka. Known as the 'Vidya Kaashi', it has produced literary giants and legendary musicians whose works are preserved in our digital vaults.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
               <div className="border-l-2 border-brand-red pl-4">
                  <div className="text-3xl font-display italic text-amazon-orange">500k+</div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-widest opacity-60">Scanned Pages</div>
               </div>
               <div className="border-l-2 border-brand-red pl-4">
                  <div className="text-3xl font-display italic text-amazon-orange">1947</div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-widest opacity-60">Archive Start</div>
               </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-amazon-orange/30 rounded-xl" />
            <img 
               src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" 
               alt="Old books" 
               className="rounded-lg shadow-2xl relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center max-w-4xl mx-auto px-6">
        <div className="bg-brand-red/5 p-12 rounded-2xl border border-brand-red/10 space-y-6">
          <Landmark className="w-12 h-12 text-brand-red mx-auto" />
          <h2 className="text-3xl font-display italic">Contribute to the Archive</h2>
          <p className="text-gray-600 font-sans">Have original source materials or photographs of historical Dharwad? Help us preserve our heritage for future generations.</p>
          <button 
            onClick={onSubmitArtifact}
            className="px-8 py-4 bg-brand-blue text-white rounded-full font-sans font-bold text-sm uppercase tracking-widest hover:bg-brand-red transition-all shadow-xl"
          >
             Submit Artifact
          </button>
        </div>
      </section>
    </motion.div>
  );
}
