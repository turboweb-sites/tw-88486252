import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Send, CheckCircle, Loader2, MessageSquare } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import QuoteForm from '../components/QuoteForm';
import GoogleBusinessProfile from '../components/GoogleBusinessProfile';
import { submitContact } from '../lib/supabase';
import { sendContactNotification } from '../lib/email';

type FormTab = 'booking' | 'quote' | 'message';

export default function Contact() {
  const [activeTab, setActiveTab] = useState<FormTab>('booking');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    setError('');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await submitContact({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || undefined,
        subject: contactForm.subject || undefined,
        message: contactForm.message,
      });

      await sendContactNotification({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        subject: contactForm.subject,
        message: contactForm.message,
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-500 to-dark-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

        <div className="relative container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <Phone className="w-4 h-4 text-primary-500" />
            <span className="text-primary-500 text-sm font-medium">Get In Touch</span>
          </div>
          <h1 className="heading-xl text-white mb-4">
            Book Your <span className="gold-text">Detail</span>
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Ready for a showroom finish? Book online, request a quote, or contact us directly. 
            We respond within 1 hour during business hours.
          </p>

          {/* Quick contact buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="tel:+13055550199"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-dark-900 rounded-xl font-semibold text-sm hover:bg-primary-400 transition-all shadow-lg shadow-primary-500/20"
            >
              <Phone className="w-4 h-4" />
              (305) 555-0199
            </a>
            <a
              href="mailto:info@miamidetailing.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-gray-300 rounded-xl font-medium text-sm hover:border-white/20 hover:text-white transition-all"
            >
              <Mail className="w-4 h-4" />
              info@miamidetailing.com
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding !pt-0">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2">
              {/* Tab Switcher */}
              <div className="flex bg-dark-500 rounded-xl p-1 mb-6">
                {[
                  { id: 'booking' as FormTab, label: 'Book Now', icon: Clock },
                  { id: 'quote' as FormTab, label: 'Get Quote', icon: Send },
                  { id: 'message' as FormTab, label: 'Message', icon: MessageSquare },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-dark-900 shadow-lg shadow-primary-500/20'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Forms */}
              <div className="animate-fade-in">
                {activeTab === 'booking' && <BookingForm />}
                {activeTab === 'quote' && <QuoteForm />}
                {activeTab === 'message' && (
                  <>
                    {isSubmitted ? (
                      <div className="glass-card p-8 md:p-12 text-center animate-fade-in">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="heading-md text-white mb-3">Message Sent!</h3>
                        <p className="text-muted max-w-md mx-auto">
                          Thank you for reaching out. We'll get back to you shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="glass-card p-6 md:p-8 space-y-5">
                        <h3 className="heading-md text-white mb-1">Send Us a Message</h3>
                        <p className="text-muted text-sm mb-4">Have a question? We'd love to hear from you.</p>

                        {error && (
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
                            {error}
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2 font-medium">Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              value={contactForm.name}
                              onChange={handleContactChange}
                              placeholder="John Smith"
                              className="input-field"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2 font-medium">Email *</label>
                            <input
                              type="email"
                              name="email"
                              value={contactForm.email}
                              onChange={handleContactChange}
                              placeholder="john@example.com"
                              className="input-field"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2 font-medium">Phone</label>
                            <input
                              type="tel"
                              name="phone"
                              value={contactForm.phone}
                              onChange={handleContactChange}
                              placeholder="(305) 555-0000"
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2 font-medium">Subject</label>
                            <select
                              name="subject"
                              value={contactForm.subject}
                              onChange={handleContactChange}
                              className="input-field"
                            >
                              <option value="">Select a topic</option>
                              <option value="General Inquiry">General Inquiry</option>
                              <option value="Service Question">Service Question</option>
                              <option value="Pricing Question">Pricing Question</option>
                              <option value="Complaint">Complaint</option>
                              <option value="Partnership">Partnership</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-400 mb-2 font-medium">Message *</label>
                          <textarea
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactChange}
                            placeholder="How can we help you?"
                            rows={5}
                            className="input-field resize-none"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary w-full !text-sm disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                          ) : (
                            <><Send className="w-4 h-4" /> Send Message</>
                          )}
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Google Business Profile */}
              <GoogleBusinessProfile />

              {/* Quick Contact */}
              <div className="glass-card p-5 space-y-4">
                <h4 className="text-white font-semibold text-sm">Quick Contact</h4>

                <a
                  href="tel:+13055550199"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-primary-500/10 border border-white/5 hover:border-primary-500/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-primary-500 transition-colors">(305) 555-0199</p>
                    <p className="text-gray-500 text-xs">Call or text</p>
                  </div>
                </a>

                <a
                  href="mailto:info@miamidetailing.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-primary-500/10 border border-white/5 hover:border-primary-500/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-primary-500 transition-colors">info@miamidetailing.com</p>
                    <p className="text-gray-500 text-xs">Email us anytime</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/miamidetailing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-pink-500/10 border border-white/5 hover:border-pink-500/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-pink-500 transition-colors">@miamidetailing</p>
                    <p className="text-gray-500 text-xs">Follow us on Instagram</p>
                  </div>
                </a>
              </div>

              {/* Service Area */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <h4 className="text-white font-semibold text-sm">Service Areas</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Miami', 'Brickell', 'Coral Gables', 'Wynwood', 'Miami Beach', 'Downtown', 'Key Biscayne', 'Coconut Grove', 'Doral', 'Aventura'].map(
                    (area) => (
                      <span
                        key={area}
                        className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs text-gray-400"
                      >
                        {area}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900 z-10 pointer-events-none" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.0987654321!2d-80.1918!3d25.7617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ1JzQyLjEiTiA4MMKwMTEnMzAuNSJX!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0, filter: 'grayscale(100%) brightness(0.4) contrast(1.2)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Miami Premium Auto Detailing Location"
            className="w-full"
          />
        </div>
      </section>

      {/* Schema Markup (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AutoBodyShop',
            name: 'Miami Premium Auto Detailing',
            image: 'https://miamidetailing.com/og-image.jpg',
            '@id': 'https://miamidetailing.com',
            url: 'https://miamidetailing.com',
            telephone: '+13055550199',
            priceRange: '$$-$$$',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '1234 Brickell Ave, Suite 100',
              addressLocality: 'Miami',
              addressRegion: 'FL',
              postalCode: '33131',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 25.7617,
              longitude: -80.1918,
            },
            openingHoursSpecification: [
              { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
              { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '17:00' },
              { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '10:00', closes: '15:00' },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '247',
            },
            areaServed: [
              { '@type': 'City', name: 'Miami' },
              { '@type': 'City', name: 'Miami Beach' },
              { '@type': 'City', name: 'Coral Gables' },
              { '@type': 'City', name: 'Brickell' },
              { '@type': 'City', name: 'Wynwood' },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Auto Detailing Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Detail' }, price: '149.00', priceCurrency: 'USD' },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Detail' }, price: '169.00', priceCurrency: 'USD' },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full Detail Package' }, price: '299.00', priceCurrency: 'USD' },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paint Correction' }, price: '499.00', priceCurrency: 'USD' },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ceramic Coating' }, price: '899.00', priceCurrency: 'USD' },
              ],
            },
          }),
        }}
      />
    </div>
  );
}