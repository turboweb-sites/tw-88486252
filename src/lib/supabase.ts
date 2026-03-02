import { BookingFormData, QuoteFormData, BlockedSlot, BookingRecord } from '../types';

const SUPABASE_URL = "" || '';
const SUPABASE_KEY = "" || '';

const isConfigured = SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes('placeholder');

async function supabaseRequest(table: string, method: string, body?: unknown) {
  if (!isConfigured) {
    console.log(`[Supabase Mock] ${method} ${table}:`, body);
    return { data: body, error: null };
  }

  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const headers: Record<string, string> = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Supabase error: ${response.statusText}`);
  }

  const data = await response.json();
  return { data, error: null };
}

export async function submitBooking(formData: BookingFormData) {
  const record: BookingRecord = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    service: formData.service,
    package_id: formData.packageId,
    date: formData.date,
    time: formData.time,
    vehicle_type: formData.vehicleType,
    vehicle_make: formData.vehicleMake,
    vehicle_model: formData.vehicleModel,
    vehicle_year: formData.vehicleYear,
    vehicle_color: formData.vehicleColor,
    notes: formData.notes,
    add_ons: formData.addOns,
    status: 'pending',
  };
  return supabaseRequest('bookings', 'POST', record);
}

export async function submitQuote(formData: QuoteFormData) {
  return supabaseRequest('quotes', 'POST', {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    vehicle_type: formData.vehicleType,
    vehicle_make: formData.vehicleMake,
    vehicle_model: formData.vehicleModel,
    vehicle_year: formData.vehicleYear,
    vehicle_color: formData.vehicleColor,
    services_interested: formData.servicesInterested,
    current_condition: formData.currentCondition,
    message: formData.message,
    budget: formData.budget,
    status: 'new',
  });
}

export async function submitContact(data: { name: string; email: string; phone?: string; subject?: string; message: string }) {
  return supabaseRequest('contacts', 'POST', {
    ...data,
    status: 'new',
  });
}

export async function getBlockedSlots(date: string): Promise<BlockedSlot[]> {
  if (!isConfigured) {
    return [];
  }

  const url = `${SUPABASE_URL}/rest/v1/blocked_slots?date=eq.${date}`;
  const response = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) return [];
  return response.json();
}

export async function getBookingsForDate(date: string): Promise<BookingRecord[]> {
  if (!isConfigured) {
    return [];
  }

  const url = `${SUPABASE_URL}/rest/v1/bookings?date=eq.${date}&status=neq.cancelled`;
  const response = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) return [];
  return response.json();
}