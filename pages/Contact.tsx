import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-12 text-center">
          GET IN <span className="text-brand-gold">TOUCH</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-8">
            <div className="bg-brand-dark p-8 rounded-2xl border border-gray-800">
               <h3 className="text-2xl font-bold text-white mb-6">HEADQUARTERS</h3>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-black rounded-lg text-brand-gold"><MapPin size={24} /></div>
                   <div>
                     <p className="font-bold text-white">Biggie Trends HQ</p>
                     <p className="text-gray-400">123 Streetwear Blvd, Fashion District<br/>New York, NY 10012</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-black rounded-lg text-brand-gold"><Mail size={24} /></div>
                   <div>
                     <p className="font-bold text-white">Email Us</p>
                     <p className="text-gray-400">support@biggietrends.com</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-black rounded-lg text-brand-gold"><Phone size={24} /></div>
                   <div>
                     <p className="font-bold text-white">Call Us</p>
                     <p className="text-gray-400">+1 (555) 123-4567</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-brand-dark p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">SEND A MESSAGE</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none" />
                <input type="email" placeholder="Email" className="bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none" />
              </div>
              <input type="text" placeholder="Subject" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none" />
              <textarea rows={5} placeholder="Message" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"></textarea>
              <button className="w-full bg-brand-gold text-black font-bold py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                SEND MESSAGE <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;