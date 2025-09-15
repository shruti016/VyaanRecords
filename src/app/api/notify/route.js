import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req) {
  if (!resendApiKey || !fromEmail) {
    // Don’t fail the client; just log a useful error
    console.warn("Resend not configured: set RESEND_API_KEY and FROM_EMAIL");
    return NextResponse.json({ ok: false, skipped: true }, { status: 200 });
  }

  try {
    const { email, subject, message } = await req.json();

    const resend = new Resend(resendApiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email], // you + sender gets confirmation
      subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });

    console.log("Resend sent:", result?.id || result);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Resend send error:", err?.message || err);
    // Still return 200 so this never breaks the UX
    return NextResponse.json({ ok: false, error: "Email failed" }, { status: 200 });
  }
}
