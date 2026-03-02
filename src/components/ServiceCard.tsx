import { ArrowRight, Sparkles, Circle, Shield, Lightbulb, Wrench, Truck } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onBook: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="w-6 h-6" />,
  circle: <Circle className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  lightbulb: <Lightbulb className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
  truck: <Truck className="w-6 h-6" />,
};

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div className="glass-card-hover group overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />

        {service.popular && (
          <div className="absolute top-4 right-4 bg-primary-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            POPULAR
          </div>
        )}

        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 bg-primary-500/10 backdrop-blur-md rounded-xl flex items-center justify-center text-primary-500 border border-primary-500/20">
            {iconMap[service.icon] || <Sparkles className="w-6 h-6" />}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white font-display font-semibold text-xl">{service.title}</h3>
          <span className="text-primary-500 font-bold text-lg whitespace-nowrap ml-3">
            {service.id === 'mobile-detailing' ? '+$50' : `$${service.startingPrice}`}
          </span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">{service.description}</p>

        {/* Process steps */}
        <div className="space-y-2 mb-6">
          {service.process.slice(0, 4).map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 shrink-0" />
              <span className="text-gray-400 text-xs">{step}</span>
            </div>
          ))}
          {service.process.length > 4 && (
            <span className="text-gray-500 text-xs ml-3.5">+{service.process.length - 4} more steps</span>
          )}
        </div>

        <button
          onClick={onBook}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-medium 
                     transition-all duration-300 hover:bg-primary-500 hover:text-black hover:border-primary-500 group/btn"
        >
          Book This Service
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}