import { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import { PageType } from '../types';

interface GalleryProps {
  navigateTo: (page: PageType) => void;
}

const categories = ['All', 'Exterior', 'Interior', 'Paint Correction', 'Ceramic Coating', 'Full Detail'];

const galleryImages = [
  { id: '1', src: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&h=400&fit=crop', alt: 'Luxury car exterior detail', category: 'Exterior', title: 'Mercedes S-Class' },
  { id: '2', src: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop', alt: 'Interior leather detail', category: 'Interior', title: 'BMW Interior Restoration' },
  { id: '3', src: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop', alt: 'Paint correction process', category: 'Paint Correction', title: 'Porsche 911 Correction' },
  { id: '4', src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop', alt: 'Ceramic coated car', category: 'Ceramic Coating', title: 'Ferrari Ceramic Coat' },
  { id: '5', src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop', alt: 'Full detail result', category: 'Full Detail', title: 'Range Rover Full Detail' },
  { id: '6', src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop', alt: 'Exterior wash and wax', category: 'Exterior', title: 'Audi R8 Exterior' },
  { id: '7', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop', alt: 'Sports car detail', category: 'Paint Correction', title: 'Lamborghini Paint Correction' },
  { id: '8', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop', alt: 'Classic car interior', category: 'Interior', title: 'Classic Corvette Interior' },
  { id: '9', src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop', alt: 'Ceramic coating application', category: 'Ceramic Coating', title: 'Tesla Model S Coating' },
  { id: '10', src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop', alt: 'Full detail package', category: 'Full Detail', title: 'Rolls Royce Full Detail' },
  { id: '11', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop', alt: 'Luxury SUV exterior', category: 'Exterior', title: 'G-Wagon Exterior' },
  { id: '12', src: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop', alt: 'Dashboard detail', category: 'Interior', title: 'McLaren Dashboard' },
];

export default function Gallery({ navigateTo }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const goPrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-500 to-dark-900" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

        <div className="relative container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <Camera className="w-4 h-4 text-primary-500" />
            <span className="text-primary-500 text-sm font-medium">Our Work</span>
          </div>
          <h1 className="heading-xl text-white mb-4">
            Gallery of <span className="gold-text">Excellence</span>
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Browse our portfolio of transformations. Every vehicle tells a story of meticulous care and premium results.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section-padding !pt-0">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary-500 text-dark-900 shadow-lg shadow-primary-500/20'
                    : 'bg-dark-500 text-gray-400 hover:text-white hover:bg-dark-400 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold text-sm">{image.title}</p>
                  <p className="text-primary-500 text-xs mt-1">{image.category}</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-muted mb-6">Ready to give your car the same treatment?</p>
            <CTAButton
              text="Book Your Detail"
              onClick={() => navigateTo('contact')}
              variant="primary"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-dark-900/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] w-full">
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="w-full h-full object-contain rounded-xl"
            />
            <div className="text-center mt-4">
              <p className="text-white font-semibold">{filteredImages[selectedImage].title}</p>
              <p className="text-primary-500 text-sm mt-1">{filteredImages[selectedImage].category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}