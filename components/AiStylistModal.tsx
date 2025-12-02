import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AiStylistModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const advice = await getStylingAdvice(query);
    setResponse(advice || "Couldn't get style tips right now.");
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-brand-dark border border-brand-gray w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gradient-to-r from-brand-dark to-black">
          <div className="flex items-center gap-2">
            <Sparkles className="text-brand-gold animate-pulse" size={20} />
            <h2 className="text-lg font-bold text-white">Biggie AI Stylist</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {!response && !loading && (
            <div className="text-center space-y-4 py-8">
              <div className="inline-block p-4 bg-gray-900 rounded-full mb-2">
                <Sparkles size={40} className="text-brand-gold" />
              </div>
              <p className="text-gray-300">
                Not sure what to wear? Ask me anything!<br/>
                <span className="text-sm text-gray-500">"What goes with cargo pants?"</span><br/>
                <span className="text-sm text-gray-500">"Outfit for a concert?"</span>
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-brand-gold animate-pulse">Cooking up a fit...</p>
            </div>
          )}

          {response && !loading && (
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-black">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask for style advice..."
              className="w-full bg-gray-900 text-white pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold border border-gray-800"
            />
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-gold text-black rounded-lg hover:bg-yellow-300 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiStylistModal;