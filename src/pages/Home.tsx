import { ArrowRight, Shield, Award, Clock, Star, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import BeforeAfter from '../components/BeforeAfter';
import GoogleReviews from '../components/GoogleReviews';
import ServiceCard from '../components/ServiceCard';
import { services, serviceAreas } from '../data/services';
import { galleryItems } from '../data/gallery';
import { PageType } from '../types';

interface HomeProps {
  navigateTo: (page: PageType) => void;
}

export default function Home({ navigateTo }: HomeProps) {
  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&h=1080&fit=crop"
            alt="Luxury car detailing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/30" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-500/3 rounded-full blur-3xl" />

        <div className="relative container-custom pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-8 animate-slide-up">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-primary-500 text-sm font-medium">#1 Rated Auto Detailing in Miami</span>
            </div>

            {/* Headline */}
            <h1 className="heading-xl text-white mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Premium Auto{' '}
              <span className="gold-text">Detailing</span>{' '}
              in Miami, FL
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Transform your vehicle with Miami's most trusted detailing professionals. 
              Ceramic coatings, paint correction, and premium care for luxury & exotic vehicles.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-white font-semibold text-sm">4.9</span>
                <span className="text-gray-400 text-sm">(247 reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Shield className="w-4 h-4 text-primary-500" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Award className="w-4 h-4 text-primary-500" />
                <span>IDA Certified</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CTAButton text="Book Now" onClick={() => navigateTo('contact')} size="lg" />
              <CTAButton text="Get Free Quote" onClick={() => navigateTo('contact')} variant="outline" size="lg" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-float">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary-500 to-transparent" />
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="py-8 bg-dark-500 border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2,500+', label: 'Cars Detailed' },
              { value: '247+', label: '5-Star Reviews' },
              { value: '8+', label: 'Years Experience' },
              { value: '100%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold gold-text">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTRO SECTION ===== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-500 text-sm font-medium uppercase tracking-widest mb-4 block">Why Choose Us</span>
              <h2 className="heading-lg text-white mb-6">
                Miami's Most Trusted <span className="gold-text">Detailing</span> Experts
              </h2>
              <p className="text-muted mb-8">
                With over 8 years of experience serving Miami's most discerning car owners, we deliver 
                showroom-quality results using only premium, professional-grade products. From daily drivers 
                to exotic supercars, every vehicle receives our full attention and meticulous care.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'IDA Certified Professional Detailers',
                  'Premium Products from Gyeon, Gtechniq & CarPro',
                  'Climate-Controlled Indoor Facility',
                  'Mobile Service Available Throughout Miami',
                  'Satisfaction Guaranteed on Every Detail',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-500 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <CTAButton text="View Our Services" onClick={() => navigateTo('services')} />
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop"
                  alt="Professional detailing"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-dark-200 border border-white/10 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Quick Turnaround</p>
                    <p className="text-gray-500 text-xs">Most services in 2-4 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="section-padding bg-dark-500">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-primary-500 text-sm font-medium uppercase tracking-widest mb-4 block">Our Services</span>
            <h2 className="heading-lg text-white mb-4">Premium Detailing <span className="gold-text">Services</span></h2>
            <p className="text-muted max-w-2xl mx-auto">
              From a basic wash to a full ceramic coating, we offer comprehensive detailing solutions tailored to your vehicle's needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                {...{ service, onBook: () => navigateTo('contact') } as any}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <CTAButton text="View All Services" onClick={() => navigateTo('services')} variant="outline" />
          </div>
        </div>
      </section>

      {/* ===== BEFORE/AFTER ===== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-primary-500 text-sm font-medium uppercase tracking-widest mb-4 block">Our Results</span>
            <h2 className="heading-lg text-white mb-4">Before & <span className="gold-text">After</span></h2>
            <p className="text-muted max-w-2xl mx-auto">
              Drag the slider to see the transformation. Real results from real clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {galleryItems.slice(0, 4).map((item) => (
              <BeforeAfter
                key={item.id}
                {...{ item } as any}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <CTAButton text="See Full Gallery" onClick={() => navigateTo('gallery')} variant="outline" />
          </div>
        </div>
      </section>

      {/* ===== GOOGLE REVIEWS ===== */}
      <GoogleReviews />

      {/* ===== SERVICE AREA ===== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-primary-500 text-sm font-medium uppercase tracking-widest mb-4 block">Coverage Area</span>
            <h2 className="heading-lg text-white mb-4">Serving All of <span className="gold-text">Miami</span></h2>
            <p className="text-muted max-w-2xl mx-auto">
              We proudly serve the greater Miami area with both our shop and mobile detailing services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceAreas.map((area) => (
              <div
                key={area}
                className="glass-card-hover p-4 text-center group cursor-default"
              >
                <MapPin className="w-5 h-5 text-primary-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm font-medium">{area}</span>
              </div>
            ))}
          </div>

          {/* Google Map */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.53925855702!2d-80.29949880266901!3d25.782390733498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Miami Auto Detailing Service Area"
            />
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&h=600&fit=crop"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-900/90 backdrop-blur-sm" />
        </div>

        <div className="relative container-custom text-center">
          <h2 className="heading-lg text-white mb-4">
            Ready to Experience <span className="gold-text">Premium</span> Detailing?
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-10 text-lg">
            Book your appointment today and let us transform your vehicle. 
            First-time customers get 10% off any service.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton text="Book Appointment" onClick={() => navigateTo('contact')} size="lg" />
            <CTAButton text="Call (305) 555-0199" variant="call" onClick={() => window.open('tel:+13055550199')} size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
}