import express, { Request, Response } from "express";
import nodemailer, { Transporter } from "nodemailer";

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@malaikahouse.co.za";
const FROM_EMAIL  = process.env.FROM_EMAIL  || "no-reply@malaikahouse.co.za";
const FROM_NAME   = process.env.FROM_NAME   || "Malaika House";

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Boolean(Number(process.env.SMTP_SECURE || 0)),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type VisitType = "onsite" | "online";

interface VisitRequestPayload {
  visitType: VisitType;
  ageGroup?: string | null;
  date: string;
  time: string;
  parentName: string;
  email: string;
  phone: string;
  programInterest?: string | null;
  childName?: string | null;
  childAge?: number | null;
  specialNeeds?: string | null;
  questions?: string | null;
  source?: string | null;
  submittedAt?: string | null;
}

const required = (val: unknown): val is string =>
  typeof val === "string" && val.trim().length > 0;

router.post(
  "/visit-requests",
  async (req: Request<unknown, unknown, VisitRequestPayload>, res: Response) => {
    try {
      const {
        visitType,
        ageGroup,
        date,
        time,
        parentName,
        email,
        phone,
        programInterest,
        childName,
        childAge,
        specialNeeds,
        questions,
        source,
        submittedAt,
      } = req.body || ({} as VisitRequestPayload);

      if (
        !required(visitType) ||
        !required(parentName) ||
        !required(email) ||
        !required(phone) ||
        !required(date) ||
        !required(time)
      ) {
        return res.status(400).json({ error: "Missing required fields." });
      }
      if (visitType !== "onsite" && visitType !== "online") {
        return res.status(400).json({ error: "Invalid visitType." });
      }

      const adminSubject = `New Visit Request (${visitType}) — ${parentName}`;
      const adminText = [
        `A new visit request has been submitted.`,
        ``,
        `Parent/Guardian: ${parentName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Visit Type: ${visitType}`,
        `Date: ${date}`,
        `Time: ${time}`,
        `Age Group: ${ageGroup || "—"}`,
        `Program Interest: ${programInterest || "—"}`,
        `Child Name: ${childName || "—"}`,
        `Child Age: ${typeof childAge === "number" ? childAge : "—"}`,
        `Special Needs: ${specialNeeds || "—"}`,
        `Questions: ${questions || "—"}`,
        ``,
        `Source: ${source || "—"}`,
        `Submitted At: ${submittedAt || new Date().toISOString()}`,
      ].join("\n");

      const adminHtml = `
        <h2>New Visit Request</h2>
        <p><strong>Parent/Guardian:</strong> ${escapeHtml(parentName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Visit Type:</strong> ${escapeHtml(visitType)}</p>
        <p><strong>Date:</strong> ${escapeHtml(date)} &nbsp; <strong>Time:</strong> ${escapeHtml(time)}</p>
        <p><strong>Age Group:</strong> ${escapeHtml(ageGroup || "—")}</p>
        <p><strong>Program Interest:</strong> ${escapeHtml(programInterest || "—")}</p>
        <p><strong>Child Name:</strong> ${escapeHtml(childName || "—")}</p>
        <p><strong>Child Age:</strong> ${typeof childAge === "number" ? escapeHtml(String(childAge)) : "—"}</p>
        <p><strong>Special Needs:</strong><br>${nl2br(escapeHtml(specialNeeds || "—"))}</p>
        <p><strong>Questions:</strong><br>${nl2br(escapeHtml(questions || "—"))}</p>
        <hr/>
        <p><small>Source: ${escapeHtml(source || "—")}<br/>Submitted: ${escapeHtml(
        submittedAt || new Date().toISOString()
      )}</small></p>
      `;

      const userSubject = `Your visit request with Malaika House`;
      const userText = [
        `Hi ${parentName},`,
        ``,
        `Thank you for booking a ${visitType === "onsite" ? "On-Site Visit" : "Online Consultation"} with Malaika House.`,
        `Here are your details:`,
        `- Date: ${date}`,
        `- Time: ${time}`,
        `- Program Interest: ${programInterest || "—"}`,
        ``,
        `We’ll contact you shortly to confirm and share any preparation materials.`,
        ``,
        `Warmly,`,
        `Malaika House`,
      ].join("\n");

      const userHtml = `
        <p>Hi ${escapeHtml(parentName)},</p>
        <p>Thank you for booking a <strong>${escapeHtml(
          visitType === "onsite" ? "On-Site Visit" : "Online Consultation"
        )}</strong> with Malaika House.</p>
        <p>Here are your details:</p>
        <ul>
          <li><strong>Date:</strong> ${escapeHtml(date)}</li>
          <li><strong>Time:</strong> ${escapeHtml(time)}</li>
          <li><strong>Program Interest:</strong> ${escapeHtml(programInterest || "—")}</li>
        </ul>
        <p>We’ll contact you shortly to confirm and share any preparation materials.</p>
        <p>Warmly,<br/>Malaika House</p>
      `;

      await transporter.sendMail({
        from: { name: FROM_NAME, address: FROM_EMAIL },
        to: ADMIN_EMAIL,
        subject: adminSubject,
        text: adminText,
        html: adminHtml,
        replyTo: email,
      });

      await transporter.sendMail({
        from: { name: FROM_NAME, address: FROM_EMAIL },
        to: email,
        subject: userSubject,
        text: userText,
        html: userHtml,
      });

      return res.json({ ok: true });
    } catch (err) {
      console.error("visit-requests error:", err);
      return res.status(500).json({ error: "Email error. Please try again later." });
    }
  }
);

function escapeHtml(input: unknown): string {
  return String(input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function nl2br(input: unknown): string {
  return String(input ?? "").replace(/\n/g, "<br/>");
}

router.post("/contact-messages", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      inquiryType,
      subject,
      message,
      source,
      submittedAt,
    } = (req.body ?? {}) as {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      inquiryType?: string;
      subject: string;
      message: string;
      source?: string;
      submittedAt?: string;
    };

    const required = (v?: string) => typeof v === "string" && v.trim().length > 0;

    if (!required(firstName) || !required(lastName) || !required(email) || !required(subject) || !required(message)) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const adminSubject = `New Contact Message — ${firstName} ${lastName}`;
    const adminText = [
      `A new contact message has been submitted.`,
      ``,
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Type: ${inquiryType || "—"}`,
      `Subject: ${subject}`,
      ``,
      `Message:`,
      `${message}`,
      ``,
      `Source: ${source || "contact-us"}`,
      `Submitted At: ${submittedAt || new Date().toISOString()}`,
    ].join("\n");

    const adminHtml = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(`${firstName} ${lastName}`)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <p><strong>Type:</strong> ${escapeHtml(inquiryType || "—")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong><br/>${nl2br(escapeHtml(message))}</p>
      <hr/>
      <p><small>Source: ${escapeHtml(source || "contact-us")}<br/>Submitted: ${escapeHtml(
        submittedAt || new Date().toISOString()
      )}</small></p>
    `;

    const userSubject = `We received your message — Malaika House`;
    const userText = [
      `Hi ${firstName},`,
      ``,
      `Thanks for contacting Malaika House. We’ve received your message and will get back to you within 24 hours.`,
      ``,
      `Subject: ${subject}`,
      `Type: ${inquiryType || "—"}`,
      ``,
      `Your message:`,
      `${message}`,
      ``,
      `Warmly,`,
      `Malaika House`,
    ].join("\n");

    const userHtml = `
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for contacting <strong>Malaika House</strong>. We’ve received your message and will get back to you within 24 hours.</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}<br/><strong>Type:</strong> ${escapeHtml(inquiryType || "—")}</p>
      <p><strong>Your message:</strong><br/>${nl2br(escapeHtml(message))}</p>
      <p>Warmly,<br/>Malaika House</p>
    `;

    await transporter.sendMail({
      from: { name: FROM_NAME, address: FROM_EMAIL },
      to: ADMIN_EMAIL,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
      replyTo: email,
    });

    await transporter.sendMail({
      from: { name: FROM_NAME, address: FROM_EMAIL },
      to: email,
      subject: userSubject,
      text: userText,
      html: userHtml,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("contact-messages error:", err);
    return res.status(500).json({ error: "Email error. Please try again later." });
  }
});

export default router;
