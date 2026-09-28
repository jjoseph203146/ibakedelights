import { z } from "zod";

/**
 * Shared validation for the event/custom-order inquiry form — used by both
 * the client form (inline field errors) and the /api/inquiry route (so a
 * request that bypasses the browser can't skip validation).
 */
export const EVENT_TYPES = [
  "Birthday",
  "Baby shower",
  "Family gathering",
  "Corporate event",
  "Wedding or bridal shower",
  "Other celebration",
] as const;

export const PRODUCT_INTERESTS = ["Cupcakes", "Cakes", "Cheesecakes", "Not sure yet"] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your full name.").max(200),
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  date: z.string().trim().min(1, "Choose an event date."),
  type: z.enum(EVENT_TYPES, { message: "Choose an event type." }),
  guests: z.string().trim().max(10).optional().or(z.literal("")),
  zip: z.string().trim().max(10).optional().or(z.literal("")),
  interests: z.array(z.enum(PRODUCT_INTERESTS)).optional().default([]),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  // Honeypot field: real visitors never fill this in (it's visually hidden
  // and unlabeled to assistive tech). A filled value marks the submission as
  // spam without showing the sender an error.
  company: z.string().max(200).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
