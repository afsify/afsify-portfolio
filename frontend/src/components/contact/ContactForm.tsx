"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { enquiryTypes, validateEnquiry, type FieldErrors } from "@/lib/contact-validation";
import { composeEnquiry } from "@/lib/contact-email";
import { profile } from "@/data/profile";

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ContactForm() {
  // Without JavaScript, a native form could GET private fields into the URL.
  // Keep it disabled until React can intercept submission; direct links still work.
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  const [type, setType] = useState<string>(enquiryTypes[0]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState("");
  const [manualText, setManualText] = useState("");
  const [copying, setCopying] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  function prepare() {
    if (!form.current) return;
    const result = validateEnquiry(Object.fromEntries(new FormData(form.current)));
    setErrors(result.errors);
    if (!result.data) {
      setStatus("Please check the highlighted fields.");
      const field = Object.keys(result.errors)[0];
      form.current.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
      return;
    }
    return composeEnquiry(result.data);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enquiry = prepare();
    if (!enquiry) return;
    if (enquiry.tooLong) {
      setStatus("Your enquiry is too long for a reliable email link. Copy the complete enquiry below, then open a blank email and paste it in.");
      setManualText(enquiry.text);
      return;
    }
    setManualText("");
    setStatus("Review your enquiry in your email app and press Send. If nothing opens, use Copy Enquiry and paste it into your email service. This page cannot confirm delivery.");
    // Synchronous navigation from the visitor's click/Enter gesture; no server request.
    const link = document.createElement("a");
    link.href = enquiry.href;
    link.click();
  }

  async function copy() {
    const enquiry = prepare();
    if (!enquiry) return;
    setCopying(true);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(enquiry.text);
      setStatus("Enquiry copied. Paste it into your email service, review it and press Send.");
    } catch {
      setManualText(enquiry.text);
      setStatus("Automatic copying is unavailable. Select and copy the complete enquiry below, then paste it into your email service.");
    } finally { setCopying(false); }
  }

  const fieldProps = (name: keyof FieldErrors) => ({ name, id: `enquiry-${name}`, "aria-labelledby": `enquiry-label-${name}`, "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `error-${name}` : undefined });
  const error = (name: keyof FieldErrors) => errors[name] ? <span id={`error-${name}`} className="field-error">{errors[name]}</span> : null;
  return <div className="enquiry-box">
    <h2>Start an enquiry</h2>
    <p id="email-handoff-help">We&apos;ll open your email app with your enquiry filled in. Review it and press Send.</p>
    <form ref={form} onSubmit={submit} noValidate aria-describedby="email-handoff-help" onChange={() => { setStatus(""); setManualText(""); }}>
      <fieldset disabled={!hydrated}><legend className="sr-only">Enquiry details</legend>
        <div className="form-grid">
          <label htmlFor="enquiry-type"><span id="enquiry-label-type">Enquiry type</span><select {...fieldProps("type")} required value={type} onChange={(event) => setType(event.target.value)}>{enquiryTypes.map((item) => <option key={item}>{item}</option>)}</select>{error("type")}</label>
          <label htmlFor="enquiry-name"><span id="enquiry-label-name">Name</span><input {...fieldProps("name")} autoComplete="name" required minLength={2} maxLength={100} />{error("name")}</label>
          <label htmlFor="enquiry-email"><span id="enquiry-label-email">Email address</span><input {...fieldProps("email")} type="email" autoComplete="email" required maxLength={254} />{error("email")}</label>
          <label htmlFor="enquiry-company"><span id="enquiry-label-company">Company / organization (optional)</span><input {...fieldProps("company")} autoComplete="organization" maxLength={160} />{error("company")}</label>
          <label htmlFor="enquiry-website"><span id="enquiry-label-website">Website / project URL (optional)</span><input {...fieldProps("website")} type="url" autoComplete="url" maxLength={1000} placeholder="https://" />{error("website")}</label>
        </div>
        <div className="form-grid freelance-fields" hidden={type !== "Freelance project"}>
          <label htmlFor="enquiry-budget"><span id="enquiry-label-budget">Project budget range (optional)</span><input {...fieldProps("budget")} disabled={type !== "Freelance project"} maxLength={100} placeholder="Amount and currency, or leave blank" />{error("budget")}</label>
          <label htmlFor="enquiry-timeframe"><span id="enquiry-label-timeframe">Preferred timeline (optional)</span><input {...fieldProps("timeframe")} disabled={type !== "Freelance project"} maxLength={100} />{error("timeframe")}</label>
        </div>
        <label htmlFor="enquiry-message"><span id="enquiry-label-message">Message</span><textarea {...fieldProps("message")} rows={6} required minLength={20} maxLength={20000} aria-describedby={errors.message ? "error-message message-help" : "message-help"} />{error("message")}</label>
        <p className="muted" id="message-help">20–20,000 characters. Details stay on this page until you choose to open your email app or copy them. Nothing is submitted to this website.</p>
        <div className="enquiry-actions"><button className="button button-accent" type="submit">Open Email App</button><button className="button button-outline" type="button" onClick={copy} disabled={copying}>{copying ? "Copying…" : "Copy Enquiry"}</button></div>
      </fieldset>
      <p role="status" aria-live="polite" className="form-status">{status}</p>
    </form>
    <noscript><p className="form-notice">Enable JavaScript to compose an enquiry here, or use the direct email and WhatsApp links below.</p></noscript>
    {manualText && <label className="manual-enquiry" htmlFor="manual-enquiry">Complete enquiry — select and copy<textarea id="manual-enquiry" readOnly rows={10} value={manualText} ref={(node) => { if (node) { node.focus(); node.select(); } }} /></label>}
    <p className="form-notice">No email app configured? Copy your enquiry and paste it into your usual email service, addressed to {profile.email}. <a href={`mailto:${profile.email}`}>Open a blank email</a> or <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">use WhatsApp<span className="sr-only"> (opens in new tab)</span></a>.</p>
  </div>;
}
