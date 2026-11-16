# Contact email-app workflow

The enquiry form needs no email provider, Turnstile, Redis, API credentials or server endpoint. Its recipient comes from `src/data/profile.ts`. Keep `NEXT_PUBLIC_SITE_URL` set to the approved canonical origin for metadata and the enquiry's Source line.

- Required: enquiry type, name, email address and message (20–20,000 characters).
- Optional: company/organization and HTTP(S) website/project URL; budget and timeline for freelance projects.
- **Open Email App** validates the form and opens a percent-encoded `mailto:` composition. The visitor must review and send in their email app. Opening a link does not prove that an app opened or that mail was delivered.
- Encoded links over 1,800 characters use a conservative compatibility fallback: the complete enquiry is selectable, with **Copy Enquiry** and a plain email link. No text is silently truncated.
- **Copy Enquiry** copies recipient, subject and body. Clipboard denial or unavailability exposes selectable text for manual copying. Direct email and WhatsApp remain available.
- The website does not store form content, use localStorage for it, log it or send it to an API. Form fields are retained when handing off. Reloading or leaving the page can lose the draft.
- Without JavaScript, the composer is disabled to prevent native form submission from putting private fields into a URL. Direct email/WhatsApp links still work.
- A configured email app (or browser mail handler) is required for mailto. Browsers do not provide reliable delivery/handler detection. Visitors without one can paste into their usual webmail service.

The former `/api/contact` route and Resend/Turnstile/Redis handler were retired. Their old environment variables can be removed from hosting configuration during an approved release; no hosting settings were changed locally. No contact-only packages were installed, so no dependency removal was needed.

## Verification

Run `npm run verify:v2` for encoding/validation/search tests. Against a production server on localhost:3100, run `node scripts/verify-contact-browser.mjs` for desktop/mobile, both themes, all enquiry types, focus/errors, long messages, clipboard success/denial/unavailability and privacy assertions. Mailto navigation is captured to prevent opening an external email app; tests do not send mail. Native mail-client rendering and inbox delivery remain manual checks.
