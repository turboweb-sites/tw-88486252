import { Phone, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function FloatingCallButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded options */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-fade-in">
          <a
            href="tel:+13055550199"
            className="flex items-center gap-3 bg-green-600 text-white pl-4 pr-5 py-3 rounded-full shadow-xl shadow-green-600/25 hover:bg-green-500 transition-all group"
          >
            <Phone className="w-5 h-5" />
            <span className="text-sm font-semibold whitespace-nowrap">Call Now</span>
          </a>
          <a
            href="https://wa.me/13055550199?text=Hi%2C%20I%27d%20like%20to%20book%20a%20detailing%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-xl shadow-[#25D366]/25 hover:bg-[#20BD5A] transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isExpanded
            ? 'bg-gray-700 rotate-45 shadow-gray-700/25'
            : 'bg-primary-500 animate-glow shadow-primary-500/25 hover:scale-110'
        }`}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Phone className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Pulse ring when not expanded */}
      {!isExpanded && (
        <div className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-primary-500/30 animate-ping pointer-events-none" />
      )}
    </div>
  );
}