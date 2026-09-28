import { Resend } from "resend";
import type { InquiryInput } from "./validation";
import { siteConfig } from "./site-config";

/**
 * Sends a submitted event/custom-order inquiry to the bakery's inbox.
 *
 * Requires RESEND_API_KEY and INQUIRY_TO_EMAIL in the environment (see
 * .env.example). Until those are configured, sending fails loudly — the
 * form's error state tells the visitor to call/text instead, rather than
 * silently pretending the inquiry was delivered.
 */
export async function sendInquiryEmail(data: InquiryInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL || siteConfig.email;
  const from = process.env.INQUIRY_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error(
      "Email service is not configured (missing RESEND_API_KEY or INQUIRY_FROM_EMAIL).",
    );
  }

  const resend = new Resend(apiKey);

  const interests = data.interests.length ? data.interests.join(", ") : "—";
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Event date: ${data.date}`,
    `Event type: ${data.type}`,
    `Number of guests: ${data.guests || "—"}`,
    `Delivery ZIP code: ${data.zip || "—"}`,
    `Products of interest: ${interests}`,
    "",
    "Message:",
    data.message || "—",
  ];

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New event inquiry from ${data.name} (${data.type})`,
    text: lines.join("\n"),
  });

  if (error) {
    throw new Error(error.message || "The email service rejected the message.");
  }
}
