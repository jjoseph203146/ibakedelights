import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { sendInquiryEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot: a filled "company" field means a bot filled every input.
  // Respond as if it succeeded so the bot gets no signal, but skip sending.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendInquiryEmail(parsed.data);
  } catch (err) {
    console.error("[inquiry] failed to send email:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't send your inquiry right now. Please call or text us instead, or try again in a few minutes.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
