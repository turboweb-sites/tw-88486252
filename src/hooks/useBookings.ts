import { useState, useCallback } from 'react';
import { submitBooking, submitQuote, submitContact, getBookingsForDate } from '../lib/supabase';
import { createGHLContact, createGHLOpportunity, buildBookingContactData, buildQuoteContactData } from '../lib/gohighlevel';
import { sendBookingNotification, sendQuoteNotification, sendContactNotification } from '../lib/email';

interface UseBookingsReturn {
  isSubmitting: boolean;
  error: string | null;
  submitBookingForm: (data: {
    name: string;
    phone: string;
    email: string;
    vehicleType: string;
    service: string;
    serviceLabel: string;
    preferredDate?: string;
    preferredTime?: string;
    notes?: string;
    servicePrice?: number;
  }) => Promise<boolean>;
  submitQuoteForm: (data: {
    name: string;
    phone: string;
    email: string;
    vehicleYear?: string;
    vehicleMake?: string;
    vehicleModel?: string;
    servicesInterested?: string[];
    serviceLabels?: string[];
    message?: string;
  }) => Promise<boolean>;
  submitContactForm: (data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) => Promise<boolean>;
  checkAvailability: (date: string) => Promise<number>;
}

export function useBookings(): UseBookingsReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitBookingForm = useCallback(async (data: {
    name: string;
    phone: string;
    email: string;
    vehicleType: string;
    service: string;
    serviceLabel: string;
    preferredDate?: string;
    preferredTime?: string;
    notes?: string;
    servicePrice?: number;
  }): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Save to database
      await submitBooking({
        name: data.name,
        phone: data.phone,
        email: data.email,
        vehicle_type: data.vehicleType,
        service: data.service,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        notes: data.notes,
      });

      // 2. Create CRM contact + opportunity
      const contactData = buildBookingContactData({
        name: data.name,
        phone: data.phone,
        email: data.email,
        vehicleType: data.vehicleType,
        service: data.serviceLabel,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
      });

      const ghlContactId = await createGHLContact(contactData);

      if (ghlContactId) {
        await createGHLOpportunity({
          title: `Booking: ${data.name} — ${data.serviceLabel}`,
          contactId: ghlContactId,
          pipelineId: '',
          stageId: '',
          monetaryValue: data.servicePrice || 0,
          source: 'Website Booking',
        });
      }

      // 3. Send email notifications
      await sendBookingNotification({
        name: data.name,
        phone: data.phone,
        email: data.email,
        vehicleType: data.vehicleType,
        service: data.serviceLabel,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        notes: data.notes,
      });

      return true;
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err?.message || 'Failed to submit booking');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const submitQuoteForm = useCallback(async (data: {
    name: string;
    phone: string;
    email: string;
    vehicleYear?: string;
    vehicleMake?: string;
    vehicleModel?: string;
    servicesInterested?: string[];
    serviceLabels?: string[];
    message?: string;
  }): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const vehicle = [data.vehicleYear, data.vehicleMake, data.vehicleModel].filter(Boolean).join(' ') || 'Not specified';

      await submitQuote({
        name: data.name,
        phone: data.phone,
        email: data.email,
        vehicle_type: vehicle,
        vehicle_year: data.vehicleYear,
        vehicle_make: data.vehicleMake,
        vehicle_model: data.vehicleModel,
        services_interested: data.servicesInterested,
        message: data.message,
      });

      const contactData = buildQuoteContactData({
        name: data.name,
        phone: data.phone,
        email: data.email,
        vehicleYear: data.vehicleYear,
        vehicleMake: data.vehicleMake,
        vehicleModel: data.vehicleModel,
        servicesInterested: data.servicesInterested,
      });

      await createGHLContact(contactData);

      await sendQuoteNotification({
        name: data.name,
        phone: data.phone,
        email: data.email,
        vehicleYear: data.vehicleYear,
        vehicleMake: data.vehicleMake,
        vehicleModel: data.vehicleModel,
        servicesInterested: data.serviceLabels || data.servicesInterested,
        message: data.message,
      });

      return true;
    } catch (err: any) {
      console.error('Quote error:', err);
      setError(err?.message || 'Failed to submit quote');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const submitContactForm = useCallback(async (data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      await submitContact(data);
      await sendContactNotification(data);
      return true;
    } catch (err: any) {
      console.error('Contact error:', err);
      setError(err?.message || 'Failed to send message');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const checkAvailability = useCallback(async (date: string): Promise<number> => {
    try {
      const bookings = await getBookingsForDate(date);
      return bookings.length;
    } catch {
      return 0;
    }
  }, []);

  return {
    isSubmitting,
    error,
    submitBookingForm,
    submitQuoteForm,
    submitContactForm,
    checkAvailability,
  };
}