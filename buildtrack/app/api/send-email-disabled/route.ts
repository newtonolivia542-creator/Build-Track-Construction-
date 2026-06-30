/*import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);*/

import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { to, subject, reply } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "BuildTrack <onboarding@resend.dev>",
      to,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>BuildTrack Construction</h2>

          <p>Hello,</p>

          <p>${reply}</p>

          <br/>

          <p>Thank you for contacting BuildTrack.</p>

          <hr/>

          <small>This email was sent from the BuildTrack Construction platform.</small>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(error, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}

/*export async function POST(request: Request) {
  try {
    const { to, subject, reply } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "BuildTrack <onboarding@resend.dev>",
      to,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>BuildTrack Construction</h2>

          <p>Hello,</p>

          <p>${reply}</p>

          <br/>

          <p>
            Thank you for contacting BuildTrack.
          </p>

          <hr/>

          <small>
            This email was sent from the BuildTrack Construction platform.
          </small>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(error, { status: 400 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}*/