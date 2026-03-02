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

export async function createGHLContact(contact: GHLContact) {
  return ghlRequest('/contacts/', 'POST', {
    firstName: contact.firstName,
    lastName: contact.lastName || '',
    email: contact.email,
    phone: contact.phone || '',
    locationId: GHL_LOCATION_ID,
    tags: contact.tags || ['website-lead'],
    source: contact.source || 'Website',
    customField: contact.customField || {},
  });
}

export async function createGHLOpportunity(opportunity: GHLOpportunity) {
  return ghlRequest('/pipelines/opportunities/', 'POST', {
    title: opportunity.title,
    contactId: opportunity.contactId,
    pipelineId: opportunity.pipelineId || GHL_PIPELINE_ID,
    pipelineStageId: opportunity.pipelineStageId || GHL_STAGE_ID,
    monetaryValue: opportunity.monetaryValue || 0,
    status: opportunity.status || 'open',
    source: opportunity.source || 'Website',
  });
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

    const contactResult = await createGHLContact({
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

    if (contactResult?.contact?.id) {
      await createGHLOpportunity({
        title: `${data.service} - ${data.name}`,
        contactId: contactResult.contact.id,
        pipelineId: GHL_PIPELINE_ID,
        pipelineStageId: GHL_STAGE_ID,
        monetaryValue: 0,
        source: 'Website Booking',
      });
    }

    return contactResult;
  } catch (err) {
    console.error('GHL lead creation error:', err);
    throw err;
  }
}