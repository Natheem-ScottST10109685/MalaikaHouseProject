import { Router } from "express";

const router = Router();

router.get("/status", (_req, res) => {
  const now = new Date().toISOString();
  res.json({
    integrations: [
      {
        key: "google_calendar",
        name: "Google Calendar",
        description: "Booking system sync",
        status: "connected",
        lastCheckedAt: now,
        details: "Booking system sync active",
        docsUrl: "https://developers.google.com/calendar",
      },
      {
        key: "payment_gateway",
        name: "Payment Gateway",
        description: "Payments processing",
        status: "connected",
        lastCheckedAt: now,
        details: "Secure payments processing",
        docsUrl: "https://stripe.com/docs",
      },
      {
        key: "notion_cms",
        name: "Notion CMS",
        description: "Content management",
        status: "connected",
        lastCheckedAt: now,
        details: "Content management active",
        docsUrl: "https://developers.notion.com/",
      },
      {
        key: "mailchimp",
        name: "MailChimp",
        description: "Newsletter sync",
        status: "error",
        lastCheckedAt: now,
        details: "Newsletter sync requires attention",
        docsUrl: "https://mailchimp.com/developer/",
      },
    ],
  });
});

router.post("/:key/test", (_req, res) => {
  res.json({ ok: true, status: "connected", message: "Demo test completed." });
});

export default router;
