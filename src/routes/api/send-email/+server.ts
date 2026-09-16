import { Resend } from 'resend';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RESEND_API_KEY } from '$env/static/private';
import {
	checkMessage,
	escapeHtml,
	isHoneypotTripped,
	isSafeEmail,
	isSafeName,
	isSafePhone,
	isSafeSuburb,
	isAllowedValue
} from '$lib/server/form-guard';

// Exclude this endpoint from prerendering
export const prerender = false;

// Configure for Vercel Edge Functions
export const config = {
	isr: {
		expiration: 0 // On-demand revalidation, never cached
	}
};

const resend = new Resend(RESEND_API_KEY);

const ALLOWED_PREFERRED_CONTACT = ['Either', 'Phone', 'Email'] as const;
const ALLOWED_JOB_AREAS = ['Sales', 'Installation', 'Administration', 'Electrician'] as const;

export const POST: RequestHandler = async ({ request }) => {
	// Set CORS headers
	const headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	// Handle preflight request
	if (request.method === 'OPTIONS') {
		return new Response(null, { headers });
	}

	const body = await request.json();
	const { name, email, phone, postCode, message, type, website } = body;

	// Honeypot: a hidden field real visitors never see or fill in. Any value
	// here means the submission is automated — silently pretend success so
	// the bot doesn't learn anything, without ever sending an email.
	if (isHoneypotTripped(website)) {
		return json({ success: true }, { headers });
	}

	// Field allowlisting — reject anything that doesn't look like the field
	// it claims to be (in particular: no links/HTML in any text field).
	if (!isSafeName(name)) {
		return json({ success: false, error: 'Please enter a valid name.' }, { status: 400, headers });
	}
	if (!isSafeEmail(email)) {
		return json(
			{ success: false, error: 'Please enter a valid email address.' },
			{ status: 400, headers }
		);
	}
	if (!isSafePhone(phone)) {
		return json(
			{ success: false, error: 'Please enter a valid phone number.' },
			{ status: 400, headers }
		);
	}
	if (!isSafeSuburb(postCode)) {
		return json(
			{ success: false, error: 'Please enter a valid suburb and state.' },
			{ status: 400, headers }
		);
	}
	const messageCheck = checkMessage(message, 500);
	if (!messageCheck.valid) {
		return json({ success: false, error: messageCheck.reason }, { status: 400, headers });
	}

	try {
		let htmlContent: string;

		if (type === 'Career Interest') {
			const { jobAreas } = body;
			const safeJobAreas = Array.isArray(jobAreas)
				? jobAreas.filter((area) => isAllowedValue(area, ALLOWED_JOB_AREAS))
				: [];
			htmlContent = `
                <h1>New Career Interest Submission</h1>
                <p><strong>Type:</strong> ${escapeHtml(type)}</p>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
                <p><strong>Suburb and State:</strong> ${postCode ? escapeHtml(postCode) : 'Not provided'}</p>
                <p><strong>Job Areas of Interest:</strong> ${escapeHtml(safeJobAreas.join(', '))}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message)}</p>
            `;
		} else {
			const { preferredContact } = body;
			const safePreferredContact = isAllowedValue(preferredContact, ALLOWED_PREFERRED_CONTACT)
				? preferredContact
				: 'Either';
			htmlContent = `
                <h1>New Form Submission From quote.maximumsolar.com.au</h1>
                <p><strong>Type:</strong> ${escapeHtml(type)}</p>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
                <p><strong>Suburb and State:</strong> ${postCode ? escapeHtml(postCode) : 'Not provided'}</p>
                <p><strong>Preferred Contact Method:</strong> ${escapeHtml(safePreferredContact)}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message)}</p>
            `;
		}

		const data = await resend.emails.send({
			from: 'Form Submission <webmaster@quote.maximumsolar.com.au>',
			// to: ['jake@haruassembly.com'],
			to: ['jake@haruassembly.com', 'info@maximumsolar.com.au'],
			replyTo: `${email}`,
			subject: `New ${type} Submission from ${name}`,
			html: htmlContent
		});

		return json({ success: true, data }, { headers });
	} catch (error) {
		console.error('Error sending email:', error);
		return json({ success: false, error: 'Failed to send email' }, { status: 500, headers });
	}
};
