import { useState, useRef, useCallback } from 'react';
import { GalleryItem } from '../types';

interface BeforeAfterProps {
  item: GalleryItem;
}

export default function BeforeAfter({ item }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    <div className="glass-card-hover overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-64 md:h-80 cursor-col-resize select-none overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      >
        {/* After Image (full) */}
        <img
          src={item.afterImage}
          alt={`${item.title} - After`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before Image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={item.beforeImage}
            alt={`${item.title} - Before`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary-500 z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/25">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 10L2 10M2 10L4 8M2 10L4 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 10L18 10M18 10L16 8M18 10L16 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-20 bg-red-500/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          BEFORE
        </div>
        <div className="absolute top-3 right-3 z-20 bg-green-500/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          AFTER
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
        <p className="text-gray-400 text-sm mb-2">{item.description}</p>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-primary-500/10 text-primary-500 px-3 py-1 rounded-full">
            {item.vehicleType}
          </span>
          <span className="text-xs bg-white/5 text-gray-400 px-3 py-1 rounded-full">
            {item.serviceType}
          </span>
        </div>
      </div>
    </div>
  );
}