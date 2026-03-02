import { useState } from 'react';
import { Send, CheckCircle, Loader2, DollarSign } from 'lucide-react';
import { services } from '../data/services';
import { submitQuote } from '../lib/supabase';
import { createGHLContact, buildQuoteContactData } from '../lib/gohighlevel';
import { sendQuoteNotification } from '../lib/email';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    servicesInterested: [] as string[],
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const toggleService = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesInterested: prev.servicesInterested.includes(serviceId)
        ? prev.servicesInterested.filter((s) => s !== serviceId)
        : [...prev.servicesInterested, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Submit to Supabase
      await submitQuote({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        vehicle_type: [formData.vehicleYear, formData.vehicleMake, formData.vehicleModel].filter(Boolean).join(' ') || 'Not specified',
        vehicle_year: formData.vehicleYear || undefined,
        vehicle_make: formData.vehicleMake || undefined,
        vehicle_model: formData.vehicleModel || undefined,
        services_interested: formData.servicesInterested.length > 0 ? formData.servicesInterested : undefined,
        message: formData.message || undefined,
      });

      // 2. Create CRM contact
      const ghlContactData = buildQuoteContactData({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        vehicleYear: formData.vehicleYear,
        vehicleMake: formData.vehicleMake,
        vehicleModel: formData.vehicleModel,
        servicesInterested: formData.servicesInterested,
      });

      await createGHLContact(ghlContactData);

      // 3. Send email notifications
      await sendQuoteNotification({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        vehicleYear: formData.vehicleYear,
        vehicleMake: formData.vehicleMake,
        vehicleModel: formData.vehicleModel,
        servicesInterested: formData.servicesInterested.map(id => {
          const svc = services.find(s => s.id === id);
          return svc?.title || id;
        }),
        message: formData.message,
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          vehicleYear: '',
          vehicleMake: '',
          vehicleModel: '',
          servicesInterested: [],
          message: '',
        });
      }, 5000);
    } catch (err: any) {
      console.error('Quote submission error:', err);
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass-card p-8 md:p-12 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="heading-md text-white mb-3">Quote Request Sent!</h3>
        <p className="text-muted max-w-md mx-auto">
          We'll get back to you with a personalized quote within 2 hours during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-primary-500" />
        </div>
        <div>
          <h3 className="heading-md text-white">Get a Free Quote</h3>
          <p className="text-muted text-sm">Tell us about your vehicle and we'll provide a custom estimate.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm animate-fade-in">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Full Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Smith" className="input-field" required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Phone *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(305) 555-0000" className="input-field" required />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2 font-medium">Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="input-field" required />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Year</label>
          <input type="text" name="vehicleYear" value={formData.vehicleYear} onChange={handleChange} placeholder="2024" className="input-field" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Make</label>
          <input type="text" name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} placeholder="Porsche" className="input-field" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Model</label>
          <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="911 GT3" className="input-field" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-3 font-medium">Services Interested In</label>
        <div className="grid grid-cols-2 gap-2">
          {services.slice(0, 8).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleService(s.id)}
              className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all duration-200 ${
                formData.servicesInterested.includes(s.id)
                  ? 'bg-primary-500/20 text-primary-500 border border-primary-500/30 shadow-sm shadow-primary-500/10'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-300'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2 font-medium">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about what you need..."
          rows={3}
          className="input-field resize-none"
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full !text-sm disabled:opacity-50">
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
        ) : (
          <><Send className="w-4 h-4" /> Get Free Quote</>
        )}
      </button>

      <p className="text-xs text-gray-600 text-center">
        No spam, ever. We'll respond with a detailed quote for your vehicle.
      </p>
    </form>
  );
}