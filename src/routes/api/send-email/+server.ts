import { Resend } from 'resend';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RESEND_API_KEY } from '$env/static/private';

// Exclude this endpoint from prerendering
export const prerender = false;

// Configure for Vercel Edge Functions
export const config = {
	isr: {
		expiration: 0 // On-demand revalidation, never cached
	}
};

const resend = new Resend(RESEND_API_KEY);

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
	const { name, email, phone, message, type } = body;

	try {
		let htmlContent: string;

		if (type === 'Career Interest') {
			const { jobAreas } = body;
			htmlContent = `
                <h1>New Career Interest Submission</h1>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Job Areas of Interest:</strong> ${jobAreas.join(', ')}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `;
		} else {
			const { preferredContact } = body;
			htmlContent = `
                <h1>New Form Submission From quote.maximumsolar.com.au</h1>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Preferred Contact Method:</strong> ${preferredContact}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `;
		}

		const data = await resend.emails.send({
			from: 'Form Submission <webmaster@quote.maximumsolar.com.au>',
			to: ['jake@haruassembly.com'],
			replyTo: `${email}`,
			subject: `New ${type} Submission`,
			html: htmlContent
		});

		return json({ success: true, data }, { headers });
	} catch (error) {
		console.error('Error sending email:', error);
		return json({ success: false, error: 'Failed to send email' }, { status: 500, headers });
	}
};
