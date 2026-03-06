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
	const { companyName, yourName, positionHeld, phone, email, type } = body;

	try {
		// Custom HTML template for Expression of Interest
		const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expression of Interest Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #000000; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #FFC640; font-size: 28px; font-weight: bold;">Expression of Interest</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">New Builder Partnership Inquiry</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px;">A new expression of interest has been submitted from a builder looking to learn more about Maximum Solar's services.</p>

                            <!-- Company Information -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 20px; background-color: #f9f9f9; border-left: 4px solid #FFC640; border-radius: 4px;">
                                        <h2 style="margin: 0 0 15px 0; color: #000000; font-size: 18px; font-weight: bold;">Company Details</h2>

                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <strong style="color: #666666; font-size: 14px;">Company Name:</strong>
                                                </td>
                                                <td style="padding: 8px 0; text-align: right;">
                                                    <span style="color: #333333; font-size: 14px;">${companyName}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
                                                    <strong style="color: #666666; font-size: 14px;">Contact Name:</strong>
                                                </td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #e0e0e0;">
                                                    <span style="color: #333333; font-size: 14px;">${yourName}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
                                                    <strong style="color: #666666; font-size: 14px;">Position:</strong>
                                                </td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #e0e0e0;">
                                                    <span style="color: #333333; font-size: 14px;">${positionHeld}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Contact Information -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 20px; background-color: #f9f9f9; border-left: 4px solid #FFC640; border-radius: 4px;">
                                        <h2 style="margin: 0 0 15px 0; color: #000000; font-size: 18px; font-weight: bold;">Contact Information</h2>

                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <strong style="color: #666666; font-size: 14px;">Email:</strong>
                                                </td>
                                                <td style="padding: 8px 0; text-align: right;">
                                                    <a href="mailto:${email}" style="color: #0066cc; font-size: 14px; text-decoration: none;">${email}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
                                                    <strong style="color: #666666; font-size: 14px;">Phone:</strong>
                                                </td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #e0e0e0;">
                                                    <a href="tel:${phone}" style="color: #0066cc; font-size: 14px; text-decoration: none;">${phone}</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; color: #666666; font-size: 12px;">This email was sent from the Expression of Interest form at quote.maximumsolar.com.au</p>
                            <p style="margin: 10px 0 0 0; color: #666666; font-size: 12px;">Maximum Solar | Warehouse 3, Lot 4/21 South Arm Hwy, Mornington TAS 7018</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

		const data = await resend.emails.send({
			from: 'Expression of Interest <webmaster@quote.maximumsolar.com.au>',
			to: ['jake@haruassembly.com', 'info@maximumsolar.com.au'],
			replyTo: email,
			subject: `New Expression of Interest from ${companyName} - ${yourName}`,
			html: htmlContent
		});

		return json({ success: true, data }, { headers });
	} catch (error) {
		console.error('Error sending EOI email:', error);
		return json({ success: false, error: 'Failed to send email' }, { status: 500, headers });
	}
};
