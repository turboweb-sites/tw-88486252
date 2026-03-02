const EMAIL_API_URL = "" || '';
const EMAIL_API_KEY = "" || '';
const BUSINESS_EMAIL = "" || 'info@miamidetailing.com';

const isConfigured = EMAIL_API_URL && EMAIL_API_KEY;

async function sendEmail(to: string, subject: string, html: string) {
  if (!isConfigured) {
    console.log(`[Email Mock] To: ${to}, Subject: ${subject}`);
    return { success: true };
  }

  const response = await fetch(EMAIL_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${EMAIL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Miami Auto Detailing <noreply@miamidetailing.com>`,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error('Email send failed');
  }

  return response.json();
}

export async function sendBookingConfirmation(data: {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
}) {
  const html = `
    <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 16px;">
      <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 20px;">Booking Confirmed ✓</h1>
      <p style="color: #999; margin-bottom: 20px;">Hi ${data.name}, your appointment has been confirmed!</p>
      <div style="background: #1a1a2e; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <p style="margin: 8px 0;"><strong style="color: #D4AF37;">Service:</strong> <span style="color: #ccc;">${data.service}</span></p>
        <p style="margin: 8px 0;"><strong style="color: #D4AF37;">Date:</strong> <span style="color: #ccc;">${data.date}</span></p>
        <p style="margin: 8px 0;"><strong style="color: #D4AF37;">Time:</strong> <span style="color: #ccc;">${data.time}</span></p>
      </div>
      <p style="color: #666; font-size: 14px;">If you need to reschedule, please call us at (305) 555-0199</p>
    </div>
  `;

  return sendEmail(data.email, 'Booking Confirmed - Miami Auto Detailing', html);
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const html = `
    <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    </div>
  `;

  return sendEmail(BUSINESS_EMAIL, `New Contact: ${data.subject || 'Website Message'}`, html);
}

export async function sendQuoteNotification(data: {
  name: string;
  email: string;
  phone: string;
  services: string[];
  vehicleInfo: string;
  message?: string;
}) {
  const html = `
    <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Services:</strong> ${data.services.join(', ')}</p>
      <p><strong>Vehicle:</strong> ${data.vehicleInfo}</p>
      ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
    </div>
  `;

  return sendEmail(BUSINESS_EMAIL, `New Quote Request: ${data.name}`, html);
}