import { Check, Star } from 'lucide-react';
import { Package } from '../types';

interface PricingCardProps {
  pkg: Package;
  onBook?: () => void;
}

export default function PricingCard({ pkg, onBook }: PricingCardProps) {
  return (
    <div
      className={`relative glass-card p-6 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 group ${
        pkg.popular ? 'border-primary-500/30 shadow-lg shadow-primary-500/10' : ''
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-dark-900 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star className="w-3 h-3" />
          Most Popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
        <p className="text-muted text-sm mb-4">{pkg.description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold gold-text">${pkg.price}</span>
          {pkg.priceLabel && <span className="text-gray-500 text-sm">{pkg.priceLabel}</span>}
        </div>
        {pkg.duration && (
          <p className="text-gray-500 text-xs mt-2">{pkg.duration}</p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <Check className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onBook}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          pkg.popular
            ? 'bg-primary-500 text-dark-900 hover:bg-primary-400 shadow-lg shadow-primary-500/20'
            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
        }`}
      >
        Book This Package
      </button>
    </div>
  );
}