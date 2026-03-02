import { Star } from 'lucide-react';
import { reviews } from '../data/gallery';
import { useState, useEffect } from 'react';

export default function GoogleReviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-dark-500">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-lg font-semibold text-white">Google Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">4.9</span>
            <span className="text-gray-400">/ 5.0</span>
          </div>
          <p className="text-gray-400">Based on <span className="text-white font-semibold">247+ reviews</span></p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`glass-card-hover p-6 transition-all duration-500 ${
                index === activeIndex ? 'ring-1 ring-primary-500/30 scale-[1.02]' : ''
              }`}
            >
              {/* Quote icon as inline SVG */}
              <svg
                className="w-8 h-8 text-primary-500/20 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
              <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-4">{review.text}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-500/10 rounded-full flex items-center justify-center">
                    <span className="text-primary-500 font-bold text-sm">{review.avatar}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{review.author}</p>
                    <p className="text-gray-500 text-xs">{review.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              {review.vehicleType && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className="text-xs text-gray-500">Vehicle: <span className="text-gray-400">{review.vehicleType}</span></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Google badge */}
        <div className="text-center">
          <a
            href="https://g.page/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-500 transition-colors"
          >
            See all reviews on Google
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}