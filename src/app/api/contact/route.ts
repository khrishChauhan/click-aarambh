import { NextRequest, NextResponse } from "next/server";

/** Strict interface for what the frontend sends us */
interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  scope?: string;
}

/** What we forward to the CRM's /api/leads endpoint */
interface CRMLeadPayload {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  source: string;
  status: string;
}

export async function POST(req: NextRequest) {
  // 1. Parse and validate incoming request
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, phone, email, scope } = body;

  // 2. Server-side validation — mirror CRM requirements
  if (!name?.trim()) {
    return NextResponse.json(
      { error: "Full name is required." },
      { status: 400 }
    );
  }
  if (!phone?.trim()) {
    return NextResponse.json(
      { error: "Phone number is required." },
      { status: 400 }
    );
  }

  // 3. Build the CRM payload — map scope → notes, inject source
  const crmPayload: CRMLeadPayload = {
    name: name.trim(),
    phone: phone.trim(),
    ...(email?.trim() && { email: email.trim() }),
    ...(scope?.trim() && { notes: scope.trim() }),
    source: "Website Contact",
    status: "New",
  };

  // 4. Guard: ensure CRM_API_URL is configured
  const crmBaseUrl = process.env.CRM_API_URL;
  if (!crmBaseUrl) {
    console.error("[contact/route] CRM_API_URL environment variable is not set.");
    return NextResponse.json(
      { error: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  // 5. Server-to-server proxy — bypass CORS, keep CRM URL private
  let crmResponse: Response;
  try {
    crmResponse = await fetch(`${crmBaseUrl}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward a shared secret if CRM is hardened in production
        ...(process.env.CRM_API_SECRET && {
          "x-api-secret": process.env.CRM_API_SECRET,
        }),
      },
      body: JSON.stringify(crmPayload),
    });
  } catch (networkError) {
    // CRM server is unreachable (down, wrong port, etc.)
    console.error("[contact/route] Failed to reach CRM server:", networkError);
    return NextResponse.json(
      { error: "Could not reach the submission server. Please try again shortly." },
      { status: 503 }
    );
  }

  // 6. Relay CRM validation errors back to the client
  if (!crmResponse.ok) {
    let crmError = "Submission failed. Please check your details and try again.";
    try {
      const crmBody = await crmResponse.json();
      if (crmBody?.error) crmError = crmBody.error;
    } catch {
      // CRM returned a non-JSON error body — use default message
    }
    return NextResponse.json({ error: crmError }, { status: crmResponse.status });
  }

  // 7. Success
  const newLead = await crmResponse.json();
  return NextResponse.json(
    { success: true, leadId: newLead._id },
    { status: 201 }
  );
}
