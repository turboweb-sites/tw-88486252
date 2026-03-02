import ServiceCard from '../components/ServiceCard';
import CTAButton from '../components/CTAButton';
import { services } from '../data/services';
import { PageType } from '../types';
import { Sparkles, Shield, Award, Clock, Zap } from 'lucide-react';

interface ServicesProps {
  navigateTo: (page: PageType) => void;
}

export default function Services({ navigateTo }: ServicesProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-500 to-dark-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-500/3 rounded-full blur-3xl" />

        <div className="relative container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-primary-500 text-sm font-medium">Premium Services</span>
          </div>
          <h1 className="heading-xl text-white mb-4">
            Our <span className="gold-text">Detailing</span> Services
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            From basic exterior washes to multi-year ceramic coatings, we offer comprehensive 
            detailing solutions for every vehicle and budget.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { icon: Shield, label: 'Insured & Bonded' },
              { icon: Award, label: 'IDA Certified' },
              { icon: Clock, label: 'Same Day Service' },
              { icon: Zap, label: 'Premium Products' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                <badge.icon className="w-4 h-4 text-primary-500" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding !pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                {...{ service, onBook: () => navigateTo('contact') } as any}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-dark-500">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-primary-500 text-sm font-medium uppercase tracking-widest mb-4 block">How It Works</span>
            <h2 className="heading-lg text-white mb-4">Our <span className="gold-text">Process</span></h2>
            <p className="text-muted max-w-2xl mx-auto">
              From booking to delivery, we ensure a seamless premium experience.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Book Online', desc: 'Choose your service, pick a date using our interactive calendar, and book in under 2 minutes.' },
              { step: '02', title: 'Vehicle Assessment', desc: 'We inspect your vehicle and recommend the best treatment plan for optimal results.' },
              { step: '03', title: 'Expert Detailing', desc: 'Our certified technicians meticulously work on every inch using premium products.' },
              { step: '04', title: 'Quality Check', desc: 'Final inspection under specialized lighting before we hand back your showroom-ready vehicle.' },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                <div className="text-6xl font-display font-bold text-white/5 group-hover:text-primary-500/10 transition-colors duration-500 mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>

                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary-500/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Detailing Callout */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-3 py-1.5 mb-4">
                  <Zap className="w-3.5 h-3.5 text-primary-500" />
                  <span className="text-primary-500 text-xs font-medium uppercase tracking-wider">Mobile Service</span>
                </div>
                <h3 className="heading-lg text-white mb-3">
                  We Come to <span className="gold-text">You</span>
                </h3>
                <p className="text-muted mb-6">
                  Can't come to us? No problem. Our fully equipped mobile detailing vans bring 
                  the same premium service right to your home, office, or anywhere in Miami. 
                  Just $50 travel fee added to any service.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">Miami Beach</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">Brickell</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">Coral Gables</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">Wynwood</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">Downtown</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">Key Biscayne</span>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-block">
                  <div className="text-5xl md:text-6xl font-display font-bold gold-text mb-2">+$50</div>
                  <p className="text-gray-400 text-sm">Travel fee for mobile service</p>
                  <CTAButton
                    text="Book Mobile Service"
                    onClick={() => navigateTo('contact')}
                    size="lg"
                    className="mt-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center bg-dark-500">
        <div className="container-custom">
          <h2 className="heading-lg text-white mb-4">
            Not Sure Which Service <span className="gold-text">You Need?</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-10">
            Contact us for a free consultation. We'll assess your vehicle and recommend the perfect service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton text="Get Free Quote" onClick={() => navigateTo('contact')} size="lg" />
            <CTAButton text="View Packages" onClick={() => navigateTo('pricing')} variant="outline" size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
}