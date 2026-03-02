import { Check, Star, Sparkles, ArrowRight, Phone, Shield } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import { PageType } from '../types';

interface PricingProps {
  navigateTo: (page: PageType) => void;
}

const packages = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: 199,
    priceLabel: '$199',
    description: 'Essential exterior and interior cleaning for a fresh look.',
    features: [
      'Exterior hand wash & dry',
      'Interior vacuum & wipe-down',
      'Tire shine & dressing',
      'Windows cleaned inside & out',
      'Dashboard dusted & wiped',
      'Door jambs cleaned',
    ],
    popular: false,
    badge: 'Quick Refresh',
    color: 'from-gray-500/20 to-gray-600/10',
    borderColor: 'border-white/10',
    accentColor: 'text-gray-300',
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: 349,
    priceLabel: '$349',
    description: 'Deep clean with paint enhancement for that showroom finish.',
    features: [
      'Everything in Basic Package',
      'Full interior deep cleaning',
      'Clay bar paint decontamination',
      'Single-stage light polish',
      'Spray sealant protection (3 months)',
      'Leather conditioning',
      'Engine bay wipe-down',
      'Air freshener application',
    ],
    popular: true,
    badge: 'Most Popular',
    color: 'from-primary-500/20 to-primary-600/10',
    borderColor: 'border-primary-500/30',
    accentColor: 'text-primary-500',
  },
  {
    id: 'ultimate',
    name: 'Ultimate Package',
    price: 999,
    priceLabel: '$999',
    description: 'Complete transformation with long-term ceramic protection.',
    features: [
      'Everything in Premium Package',
      'Multi-stage paint correction',
      '2–3 year ceramic coating',
      'Deep interior restoration',
      'Engine bay full detail',
      'Headlight restoration',
      'Trim restoration & protection',
      'Wheel ceramic coating',
      'Complimentary maintenance wash',
    ],
    popular: false,
    badge: 'Best Value',
    color: 'from-amber-500/20 to-amber-600/10',
    borderColor: 'border-amber-500/20',
    accentColor: 'text-amber-400',
  },
];

const addOns = [
  { name: 'Pet Hair Removal', price: '$49' },
  { name: 'Odor Elimination', price: '$79' },
  { name: 'Scratch Removal (per panel)', price: '$89' },
  { name: 'Headlight Restoration', price: '$129' },
  { name: 'Engine Bay Detailing', price: '$89' },
  { name: 'Mobile Service Fee', price: '+$50' },
];

export default function Pricing({ navigateTo }: PricingProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-500 to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />

        <div className="relative container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-primary-500 text-sm font-medium">Transparent Pricing</span>
          </div>
          <h1 className="heading-xl text-white mb-4">
            Detailing <span className="gold-text">Packages</span>
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Choose the perfect package for your vehicle. All packages include our premium products 
            and certified technician expertise.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-padding !pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative glass-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group ${
                  pkg.popular ? 'ring-1 ring-primary-500/30 shadow-lg shadow-primary-500/10' : ''
                }`}
              >
                {/* Badge */}
                <div className={`px-4 py-2 text-center text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${pkg.color} border-b ${pkg.borderColor}`}>
                  <span className={pkg.accentColor}>{pkg.badge}</span>
                </div>

                {/* Popular glow */}
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
                )}

                <div className="relative p-6 md:p-8">
                  <h3 className="text-xl font-display font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl md:text-5xl font-display font-bold ${pkg.popular ? 'gold-text' : 'text-white'}`}>
                        {pkg.priceLabel}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">Starting price • varies by vehicle size</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          pkg.popular ? 'bg-primary-500/20' : 'bg-white/10'
                        }`}>
                          <Check className={`w-3 h-3 ${pkg.popular ? 'text-primary-500' : 'text-gray-400'}`} />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => navigateTo('contact')}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-primary-500 text-dark-900 hover:bg-primary-400 shadow-lg shadow-primary-500/20'
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom quote note */}
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              Prices may vary based on vehicle size, condition, and additional services. 
              <button
                onClick={() => navigateTo('contact')}
                className="text-primary-500 hover:underline ml-1"
              >
                Get a custom quote →
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="section-padding bg-dark-500">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-500 text-sm font-medium uppercase tracking-widest mb-4 block">Enhance Your Service</span>
            <h2 className="heading-lg text-white mb-4">Popular <span className="gold-text">Add-Ons</span></h2>
            <p className="text-muted max-w-lg mx-auto">
              Customize any package with these popular upgrades.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="glass-card p-4 flex items-center justify-between hover:border-primary-500/20 transition-all duration-300 group"
              >
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{addon.name}</span>
                <span className="text-primary-500 font-bold text-sm ml-3">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="heading-lg text-white mb-4">
                100% <span className="gold-text">Satisfaction Guarantee</span>
              </h3>
              <p className="text-muted max-w-2xl mx-auto mb-8">
                We stand behind every detail. If you're not completely satisfied with our work, 
                we'll redo the service for free. That's our promise to every customer.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton text="Book Your Detail" onClick={() => navigateTo('contact')} size="lg" />
                <a
                  href="tel:+13055550199"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  (305) 555-0199
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-style comparison */}
      <section className="section-padding bg-dark-500">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">Which Package is <span className="gold-text">Right for You?</span></h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'My car just needs a quick refresh',
                a: 'The Basic Package ($199) is perfect. It includes a thorough hand wash, interior vacuum, tire shine, and window cleaning.',
                pkg: 'Basic',
              },
              {
                q: 'I want a deep clean with some paint enhancement',
                a: 'Go with the Premium Package ($349). It adds clay bar treatment, light polish, spray sealant, and deep interior cleaning.',
                pkg: 'Premium',
              },
              {
                q: 'I want maximum protection that lasts years',
                a: 'The Ultimate Package ($999) includes multi-stage paint correction, 2-3 year ceramic coating, and complete interior restoration.',
                pkg: 'Ultimate',
              },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 hover:border-primary-500/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="w-4 h-4 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">"{item.q}"</h4>
                    <p className="text-gray-400 text-sm mb-3">{item.a}</p>
                    <button
                      onClick={() => navigateTo('contact')}
                      className="text-primary-500 text-sm font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Book {item.pkg} <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}