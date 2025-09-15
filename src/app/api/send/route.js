import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "messages.json");

async function readAll() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function append(entry) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const all = await readAll();
  all.push(entry);
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf8");
}

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();
    if (!email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const entry = {
      id: Date.now(),
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    await append(entry);
    console.log("[CONTACT] New message (saved):", entry);

    // ✅ Save succeeds → return immediately (no email here)
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("API /api/send error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// Optional: quick viewer in dev
export async function GET() {
  const all = await readAll();
  return NextResponse.json({ ok: true, messages: all }, { status: 200 });
}


// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
// const fromEmail = process.env.FROM_EMAIL;

// export async function POST(req, res) {
//   const { email, subject, message } = await req.json();
//   console.log(email, subject, message);
//   try {
//     const data = await resend.emails.send({
//       from: fromEmail,
//       to: [fromEmail, email],
//       subject: subject,
//       react: (
//         <>
//           <h1>{subject}</h1>
//           <p>Thank you for contacting us!</p>
//           <p>New message submitted:</p>
//           <p>{message}</p>
//         </>
//       ),
//     });
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }
