/**
 * Shared server-side form security helpers.
 *
 * Goals:
 * - Catch simple bots via a honeypot field.
 * - Reject/strip embedded links and HTML from free-text fields so nothing
 *   clickable or markup-based can ever reach the outbound email.
 * - Allowlist the shape of structured fields (phone, name, suburb, etc.)
 *   so junk/URLs can't be typed into fields that should only ever contain
 *   plain values.
 * - Escape everything before it's interpolated into email HTML, as a
 *   defence-in-depth measure even if a check above is ever loosened.
 */

// Matches http(s) links, bare "www." links, and bare domain-looking strings
// (e.g. "free-cash.xyz") so people can't dodge the check by dropping the
// protocol.
const URL_PATTERN =
	/((https?:\/\/|www\.)[^\s]+)|(\b[a-z0-9-]+\.(com|net|org|io|co|au|info|biz|xyz|ru|cn|link|click|shop|top|site|online|dev|app|me|tv)(\/[^\s]*)?\b)/i;

// Matches HTML/XML tags and markdown-style links.
const MARKUP_PATTERN = /<[^>]*>/;
const MARKDOWN_LINK_PATTERN = /\[[^\]]*]\([^)]*\)/;

export function containsLinkOrMarkup(value: unknown): boolean {
	if (typeof value !== 'string' || value.length === 0) return false;
	return URL_PATTERN.test(value) || MARKUP_PATTERN.test(value) || MARKDOWN_LINK_PATTERN.test(value);
}

export function escapeHtml(value: unknown): string {
	return String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/** True when the hidden honeypot field has been filled in — a real visitor
 * never sees or fills it, so any value means it was an automated submission. */
export function isHoneypotTripped(value: unknown): boolean {
	return typeof value === 'string' && value.trim().length > 0;
}

export function isSafeName(value: unknown): value is string {
	return (
		typeof value === 'string' &&
		value.trim().length > 0 &&
		value.length <= 100 &&
		/^[a-zA-Z\u00C0-\u024F\u0400-\u04FF\s'.-]+$/.test(value) &&
		!containsLinkOrMarkup(value)
	);
}

export function isSafePhone(value: unknown): value is string {
	return typeof value === 'string' && /^[0-9+()\-\s]{6,20}$/.test(value.trim());
}

/** Suburb/postcode-style free text — optional on most forms. */
export function isSafeSuburb(value: unknown): value is string {
	if (value === undefined || value === null || value === '') return true;
	return (
		typeof value === 'string' &&
		value.length <= 100 &&
		/^[a-zA-Z0-9\u00C0-\u024F\s,'.-]+$/.test(value) &&
		!containsLinkOrMarkup(value)
	);
}

export function isSafeEmail(value: unknown): value is string {
	// Note: deliberately does NOT call containsLinkOrMarkup — every valid
	// email address has a domain (e.g. "gmail.com") that matches the
	// bare-domain half of URL_PATTERN, which would reject all real emails.
	// The regex below already fully constrains the format (no spaces,
	// no angle brackets, no markdown syntax), so it's sufficient on its own.
	return (
		typeof value === 'string' &&
		value.length <= 254 &&
		/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)
	);
}

export function isSafeShortText(value: unknown, maxLen = 150): value is string {
	return (
		typeof value === 'string' &&
		value.trim().length > 0 &&
		value.length <= maxLen &&
		!containsLinkOrMarkup(value)
	);
}

export interface MessageCheck {
	valid: boolean;
	reason?: string;
}

/** Free-text message field: allowed to be prose, but no links/HTML at all. */
export function checkMessage(value: unknown, maxLen = 2000, required = false): MessageCheck {
	if (value === undefined || value === null || value === '') {
		return required ? { valid: false, reason: 'Message is required.' } : { valid: true };
	}
	if (typeof value !== 'string') {
		return { valid: false, reason: 'Message is invalid.' };
	}
	if (value.length > maxLen) {
		return { valid: false, reason: `Message must be ${maxLen} characters or fewer.` };
	}
	if (containsLinkOrMarkup(value)) {
		return { valid: false, reason: 'Links and HTML are not allowed in the message field.' };
	}
	return { valid: true };
}

export function isAllowedValue(value: unknown, allowed: readonly string[]): value is string {
	return typeof value === 'string' && allowed.includes(value);
}
