import { Resend } from 'resend';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { RESEND_API_KEY } from '$env/static/private';

export const prerender = false;

const resend = new Resend(RESEND_API_KEY);

const FROM = 'Solar Calculator <webmaster@quote.maximumsolar.com.au>';
const INTERNAL_TO = ['jake@haruassembly.com'];
// const INTERNAL_TO = ['jake@haruassembly.com', 'info@maximumsolar.com.au'];

function fmtCurrency(n: number) {
	return new Intl.NumberFormat('en-AU', {
		style: 'currency',
		currency: 'AUD',
		maximumFractionDigits: 0
	}).format(n);
}

const occupancyMap: Record<string, string> = {
	all_day: 'All day (high self-consumption)',
	morning_evening: 'Mornings & evenings (typical working household)',
	night_only: 'Mostly at night (low self-consumption)'
};

const householdMap: Record<string, string> = {
	'1_2': '1–2 people',
	'3_4': '3–4 people',
	'5_plus': '5+ people'
};

const homeSizeMap: Record<string, string> = {
	apartment: 'Apartment or unit (under 120m²)',
	medium: 'Medium home (120–250m²)',
	large: 'Large home (250m²+)',
	rural: 'Rural or acreage'
};

function bool(val: string) {
	return val === 'true' ? '✅ Yes' : 'No';
}

function buildInternalEmail(data: Record<string, string>) {
	const {
		firstName,
		lastName,
		email,
		phone,
		postcode,
		region,
		billAmount,
		billPeriod,
		quarterlyBill,
		occupancyProfile,
		householdSize,
		homeSize,
		hasElectricHotWater,
		hasDucatedHvac,
		hasPool,
		hasEvOwned,
		hasEvPlanned,
		batteryInterest,
		batteryMaybe,
		systemSizeKw,
		annualSavings,
		lifetimeSavings,
		simplePaybackYears,
		newQuarterlyBill
	} = data;

	const regionLabel =
		{ hobart: 'Hobart', launceston: 'Launceston', burnie: 'Burnie' }[region] ?? region;

	const appliances =
		[
			hasElectricHotWater === 'true' ? 'Electric hot water' : null,
			hasDucatedHvac === 'true' ? 'Ducted HVAC' : null,
			hasPool === 'true' ? 'Pool/spa' : null,
			hasEvOwned === 'true' ? 'EV (owned)' : null
		]
			.filter(Boolean)
			.join(', ') || 'None';

	return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="background: #FFC640; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 20px; color: #1a1a1a;">New Solar Lead</h1>
        <p style="margin: 4px 0 0; font-size: 14px; color: #333;">${firstName} ${lastName} — ${postcode} (${regionLabel})</p>
      </td>
    </tr>
    <tr>
      <td style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">

        <h2 style="font-size: 16px; margin: 0 0 16px; color: #111;">Contact Details</h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="color: #666; width: 40%;">Name</td><td style="font-weight: bold;">${firstName} ${lastName}</td></tr>
          <tr style="background: #f9fafb;"><td style="color: #666;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="color: #666;">Phone</td><td><a href="tel:${phone}">${phone}</a></td></tr>
        </table>

        <h2 style="font-size: 16px; margin: 0 0 16px; color: #111;">Property & Usage</h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="color: #666; width: 40%;">Postcode</td><td style="font-weight: bold;">${postcode}</td></tr>
          <tr style="background: #f9fafb;"><td style="color: #666;">Region</td><td>${regionLabel}</td></tr>
          <tr><td style="color: #666;">Bill amount</td><td>$${billAmount} ${billPeriod} (≈ $${quarterlyBill}/quarter)</td></tr>
          <tr style="background: #f9fafb;"><td style="color: #666;">Home occupancy</td><td>${occupancyMap[occupancyProfile] ?? occupancyProfile}</td></tr>
          <tr><td style="color: #666;">Household size</td><td>${householdMap[householdSize] ?? householdSize}</td></tr>
          <tr style="background: #f9fafb;"><td style="color: #666;">Home type</td><td>${homeSizeMap[homeSize] ?? homeSize}</td></tr>
          <tr><td style="color: #666;">Appliances</td><td>${appliances}</td></tr>
          <tr style="background: #f9fafb;"><td style="color: #666;">EV planned</td><td>${bool(hasEvPlanned)}</td></tr>
          <tr><td style="color: #666;">Battery interest</td><td>${batteryInterest === 'true' ? '✅ Yes — include in estimate' : batteryMaybe === 'true' ? '🟡 Maybe later' : 'No'}</td></tr>
        </table>

        <h2 style="font-size: 16px; margin: 0 0 16px; color: #111;">Calculated Estimate</h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="color: #666; width: 40%;">Recommended system</td><td style="font-weight: bold;">${systemSizeKw} kW</td></tr>
          <tr style="background: #f9fafb;"><td style="color: #666;">Est. annual savings</td><td style="font-weight: bold; font-size: 18px; color: #d97706;">${fmtCurrency(Number(annualSavings))}</td></tr>
          <tr><td style="color: #666;">Est. 25-year savings</td><td style="font-weight: bold;">${fmtCurrency(Number(lifetimeSavings))}</td></tr>
          <tr style="background: #f9fafb;"><td style="color: #666;">New quarterly bill</td><td>${fmtCurrency(Number(newQuarterlyBill))}</td></tr>
          <tr><td style="color: #666;">Payback period</td><td>${simplePaybackYears} years</td></tr>
        </table>

        <p style="font-size: 12px; color: #999; border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 8px;">
          Submitted ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Hobart', dateStyle: 'full', timeStyle: 'short' })} AEST
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const actions: Actions = {
	submitLead: async ({ request }) => {
		const data = await request.formData();
		const fields = Object.fromEntries(data.entries()) as Record<string, string>;

		const { email, isViable, firstName, lastName, postcode } = fields;

		const viabilityTag = isViable === 'false' ? ' [LOW USAGE]' : '';

		try {
			await resend.emails.send({
				from: FROM,
				to: INTERNAL_TO,
				replyTo: email,
				subject: `New Solar Lead${viabilityTag} — ${firstName} ${lastName} — ${postcode}`,
				html: buildInternalEmail(fields)
			});

			return { success: true };
		} catch (error) {
			console.error('Calculator lead email error:', error);
			return fail(500, { success: false, error: 'Failed to send lead notification.' });
		}
	}
};
