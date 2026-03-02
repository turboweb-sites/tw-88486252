import { GHLContact, GHLOpportunity } from '../types';

const GHL_API_KEY = "" || '';
const GHL_LOCATION_ID = "" || '';
const GHL_PIPELINE_ID = "" || '';
const GHL_STAGE_ID = "" || '';

const isConfigured = GHL_API_KEY && GHL_LOCATION_ID;

const GHL_BASE_URL = 'https://rest.gohighlevel.com/v1';

async function ghlRequest(endpoint: string, method: string, body?: unknown) {
  if (!isConfigured) {
    console.log(`[GHL Mock] ${method} ${endpoint}:`, body);
    return { data: body, success: true };
  }

  const response = await fetch(`${GHL_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`GHL API error: ${response.statusText}`);
  }

  return response.json();
}

export async function createGHLContact(contact: GHLContact): Promise<string | null> {
  try {
    const result = await ghlRequest('/contacts/', 'POST', {
      firstName: contact.firstName,
      lastName: contact.lastName || '',
      email: contact.email,
      phone: contact.phone || '',
      locationId: GHL_LOCATION_ID,
      tags: contact.tags || ['website-lead'],
      source: contact.source || 'Website',
      customField: contact.customField || {},
    });
    return result?.contact?.id || null;
  } catch (err) {
    console.error('GHL createContact error:', err);
    return null;
  }
}

export async function createGHLOpportunity(opportunity: GHLOpportunity) {
  return ghlRequest('/pipelines/opportunities/', 'POST', {
    title: opportunity.title,
    contactId: opportunity.contactId,
    pipelineId: opportunity.pipelineId || GHL_PIPELINE_ID,
    pipelineStageId: opportunity.pipelineStageId || opportunity.stageId || GHL_STAGE_ID,
    monetaryValue: opportunity.monetaryValue || 0,
    status: opportunity.status || 'open',
    source: opportunity.source || 'Website',
  });
}

export function buildBookingContactData(data: {
  name: string;
  phone: string;
  email: string;
  vehicleType: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
}): GHLContact {
  const nameParts = data.name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return {
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    tags: ['booking', 'website'],
    source: 'Website Booking',
    customField: {
      service: data.service,
      vehicle_type: data.vehicleType,
      preferred_date: data.preferredDate || '',
      preferred_time: data.preferredTime || '',
    },
  };
}

export function buildQuoteContactData(data: {
  name: string;
  phone: string;
  email: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  servicesInterested?: string[];
}): GHLContact {
  const nameParts = data.name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return {
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    tags: ['quote', 'website'],
    source: 'Website Quote',
    customField: {
      vehicle: [data.vehicleYear, data.vehicleMake, data.vehicleModel].filter(Boolean).join(' '),
      services_interested: data.servicesInterested?.join(', ') || '',
    },
  };
}

export async function createLeadFromBooking(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  vehicleInfo?: string;
}) {
  try {
    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    const contactId = await createGHLContact({
      firstName,
      lastName,
      email: data.email,
      phone: data.phone,
      tags: ['booking', 'website'],
      source: 'Website Booking',
      customField: {
        service: data.service,
        preferred_date: data.date,
        preferred_time: data.time,
        vehicle_info: data.vehicleInfo || '',
      },
    });

    if (contactId) {
      await createGHLOpportunity({
        title: `${data.service} - ${data.name}`,
        contactId,
        pipelineId: GHL_PIPELINE_ID,
        pipelineStageId: GHL_STAGE_ID,
        monetaryValue: 0,
        source: 'Website Booking',
      });
    }

    return contactId;
  } catch (err) {
    console.error('GHL lead creation error:', err);
    throw err;
  }
}