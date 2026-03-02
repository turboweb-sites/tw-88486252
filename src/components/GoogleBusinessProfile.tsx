import { Star, MapPin, Phone, Globe, Clock, ExternalLink, Navigation } from 'lucide-react';

interface GoogleBusinessProfileProps {
  compact?: boolean;
}

const BUSINESS_DATA = {
  name: 'Miami Premium Auto Detailing',
  rating: 4.9,
  totalReviews: 247,
  address: '1234 Brickell Ave, Suite 100, Miami, FL 33131',
  phone: '(305) 555-0199',
  website: 'www.miamidetailing.com',
  hours: [
    { day: 'Monday', time: '8:00 AM – 6:00 PM', isOpen: true },
    { day: 'Tuesday', time: '8:00 AM – 6:00 PM', isOpen: true },
    { day: 'Wednesday', time: '8:00 AM – 6:00 PM', isOpen: true },
    { day: 'Thursday', time: '8:00 AM – 6:00 PM', isOpen: true },
    { day: 'Friday', time: '8:00 AM – 6:00 PM', isOpen: true },
    { day: 'Saturday', time: '9:00 AM – 5:00 PM', isOpen: true },
    { day: 'Sunday', time: '10:00 AM – 3:00 PM', isOpen: true },
  ],
  categories: ['Auto Detailing', 'Car Wash', 'Ceramic Coating'],
  googleMapsUrl: 'https://goo.gl/maps/example',
  placeId: '',
};

function getCurrentDayIndex(): number {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
}

function isCurrentlyOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const schedules: Record<number, [number, number]> = {
    0: [10, 15],
    1: [8, 18],
    2: [8, 18],
    3: [8, 18],
    4: [8, 18],
    5: [8, 18],
    6: [9, 17],
  };

  const schedule = schedules[day];
  if (!schedule) return false;
  return hour >= schedule[0] && hour < schedule[1];
}

export default function GoogleBusinessProfile({ compact = false }: GoogleBusinessProfileProps) {
  const currentDayIndex = getCurrentDayIndex();
  const open = isCurrentlyOpen();

  if (compact) {
    return (
      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-dark-900 font-bold text-lg">
            M
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">{BUSINESS_DATA.name}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-primary-500 font-bold text-sm">{BUSINESS_DATA.rating}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.round(BUSINESS_DATA.rating) ? 'text-primary-500 fill-primary-500' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-xs">({BUSINESS_DATA.totalReviews})</span>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${open ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={open ? 'text-green-400' : 'text-red-400'}>
              {open ? 'Open Now' : 'Closed'}
            </span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-400 text-xs">{BUSINESS_DATA.hours[currentDayIndex].time}</span>
          </div>

          <a
            href={`tel:${BUSINESS_DATA.phone.replace(/\D/g, '')}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-500 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {BUSINESS_DATA.phone}
          </a>

          <a
            href={BUSINESS_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-500 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            Get Directions
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="relative p-6 bg-gradient-to-r from-dark-500 to-dark-400 border-b border-white/5">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-dark-900 font-bold text-2xl flex-shrink-0 shadow-lg shadow-primary-500/20">
            M
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg">{BUSINESS_DATA.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-primary-500 font-bold">{BUSINESS_DATA.rating}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(BUSINESS_DATA.rating) ? 'text-primary-500 fill-primary-500' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">({BUSINESS_DATA.totalReviews} reviews)</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {BUSINESS_DATA.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className={`absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
          open
            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          {open ? 'Open Now' : 'Closed'}
        </div>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        <a
          href={BUSINESS_DATA.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 group"
        >
          <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-gray-300 text-sm group-hover:text-primary-500 transition-colors">
              {BUSINESS_DATA.address}
            </span>
            <span className="text-primary-500 text-xs block mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              Open in Google Maps →
            </span>
          </div>
        </a>

        <a
          href={`tel:${BUSINESS_DATA.phone.replace(/\D/g, '')}`}
          className="flex items-center gap-3 group"
        >
          <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
          <span className="text-gray-300 text-sm group-hover:text-primary-500 transition-colors font-medium">
            {BUSINESS_DATA.phone}
          </span>
        </a>

        <a
          href={`https://${BUSINESS_DATA.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <Globe className="w-5 h-5 text-primary-500 flex-shrink-0" />
          <span className="text-gray-300 text-sm group-hover:text-primary-500 transition-colors">
            {BUSINESS_DATA.website}
          </span>
        </a>

        {/* Hours */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-primary-500" />
            <span className="text-white text-sm font-semibold">Business Hours</span>
          </div>
          <div className="space-y-1.5">
            {BUSINESS_DATA.hours.map((schedule, i) => (
              <div
                key={schedule.day}
                className={`flex items-center justify-between text-sm px-3 py-1.5 rounded-lg ${
                  i === currentDayIndex ? 'bg-primary-500/5 border border-primary-500/10' : ''
                }`}
              >
                <span className={`font-medium ${i === currentDayIndex ? 'text-primary-500' : 'text-gray-400'}`}>
                  {schedule.day}
                </span>
                <span className={i === currentDayIndex ? 'text-white' : 'text-gray-500'}>
                  {schedule.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <a
            href={BUSINESS_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </a>
          <a
            href={`tel:${BUSINESS_DATA.phone.replace(/\D/g, '')}`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm text-dark-900 font-semibold transition-all"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>

        {/* Schema Markup Info */}
        <div className="pt-3 border-t border-white/5">
          <a
            href={`https://search.google.com/local/reviews?placeid=${BUSINESS_DATA.placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-primary-500 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            View all Google Reviews
          </a>
        </div>
      </div>
    </div>
  );
}