import { useState } from 'react';
import { Calendar, CheckCircle, Loader2, Car } from 'lucide-react';
import BookingCalendar from './BookingCalendar';
import { BookingFormData } from '../types';
import { submitBooking } from '../lib/supabase';

const services = [
  'Exterior Detail',
  'Interior Detail',
  'Full Detail Package',
  'Paint Correction',
  'Ceramic Coating',
  'Premium Protection Package',
];

const vehicleTypes = ['Sedan', 'SUV/Truck', 'Sports Car', 'Luxury/Exotic', 'Van/Large Vehicle'];

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      setError('Please select a date and time.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      await submitBooking(formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', service: '', date: '', time: '', vehicleType: '', vehicleMake: '', vehicleModel: '', vehicleYear: '', notes: '' });
      }, 5000);
    } catch (err) {
      console.error('Booking error:', err);
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
        <h3 className="heading-md text-white mb-3">Booking Confirmed!</h3>
        <p className="text-muted max-w-md mx-auto">
          We've received your booking request. You'll receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-5 h-5 text-primary-500" />
        <h3 className="heading-md text-white">Book Your Appointment</h3>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Full Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Smith" className="input-field" required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="input-field" required />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Phone *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(305) 555-0000" className="input-field" required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Service *</label>
          <select name="service" value={formData.service} onChange={handleChange} className="input-field" required>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="border-t border-white/5 pt-5">
        <div className="flex items-center gap-2 mb-4">
          <Car className="w-4 h-4 text-primary-500" />
          <h4 className="text-white font-semibold text-sm">Vehicle Information</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Vehicle Type</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="input-field">
              <option value="">Select type</option>
              {vehicleTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Year</label>
            <input type="text" name="vehicleYear" value={formData.vehicleYear} onChange={handleChange} placeholder="2024" className="input-field" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Make</label>
            <input type="text" name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} placeholder="Mercedes-Benz" className="input-field" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Model</label>
            <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="S-Class" className="input-field" />
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="border-t border-white/5 pt-5">
        <BookingCalendar
          selectedDate={formData.date}
          selectedTime={formData.time}
          onDateChange={(date) => setFormData({ ...formData, date })}
          onTimeChange={(time) => setFormData({ ...formData, time })}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm text-gray-400 mb-2 font-medium">Special Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special requests or details about your vehicle..." rows={3} className="input-field resize-none" />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full !text-sm disabled:opacity-50">
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</>
        ) : (
          <><Calendar className="w-4 h-4" /> Confirm Booking</>
        )}
      </button>
    </form>
  );
}