import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-8 text-center">
          OUR <span className="text-brand-gold">STORY</span>
        </h1>
        
        <div className="space-y-12 text-lg text-gray-300 leading-relaxed">
          <section className="bg-brand-dark p-8 md:p-12 rounded-2xl border border-gray-800 relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-2xl font-bold text-white mb-4">THE ORIGIN</h2>
               <p>
                 Biggie Trends was born on the streets, forged in the culture of urban expression. 
                 We noticed a gap between high-fashion luxury and accessible streetwear. 
                 Our mission was simple: create bold, high-quality pieces that allow you to express your identity without compromise.
               </p>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-dark p-8 rounded-2xl border border-gray-800">
               <h3 className="text-xl font-bold text-brand-gold mb-4">QUALITY FIRST</h3>
               <p className="text-sm">
                 We don't do fast fashion. Every hoodie, tee, and accessory is crafted from heavyweight cottons and premium blends designed to last. We test every drop to ensure it withstands the lifestyle it represents.
               </p>
            </div>
            <div className="bg-brand-dark p-8 rounded-2xl border border-gray-800">
               <h3 className="text-xl font-bold text-brand-gold mb-4">THE CULTURE</h3>
               <p className="text-sm">
                 Biggie Trends isn't just a brand; it's a community. From our AI stylist to our exclusive drops, we are pushing the boundaries of what an e-commerce experience should feel like.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;