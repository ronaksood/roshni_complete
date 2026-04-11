import nodemailer from "nodemailer";

const formatCurrencyINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

function getEmailConfig() {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !EMAIL_FROM) {
    return null;
  }

  return {
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: EMAIL_SECURE === "true",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    from: EMAIL_FROM,
  };
}

function parseSender(fromValue) {
  const fallbackEmail = process.env.EMAIL_USER || "no-reply@example.com";
  const fallbackName = "Store Support";

  if (!fromValue) {
    return { email: fallbackEmail, name: fallbackName };
  }

  const match = fromValue.match(/^\s*"?(.*?)"?\s*<([^>]+)>\s*$/);

  if (match) {
    return {
      name: match[1]?.trim() || fallbackName,
      email: match[2]?.trim() || fallbackEmail,
    };
  }

  return {
    email: fromValue.trim() || fallbackEmail,
    name: fallbackName,
  };
}

function getBrevoApiKey() {
  if (process.env.BREVO_API_KEY) {
    return process.env.BREVO_API_KEY;
  }

  if (process.env.EMAIL_PASS?.startsWith("xkeysib-")) {
    return process.env.EMAIL_PASS;
  }

  return null;
}

let cachedTransporter = null;
let cachedVerificationPromise = null;

function getTransporter() {
  const config = getEmailConfig();

  if (!config) {
    return null;
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });
  }

  return { transporter: cachedTransporter, from: config.from };
}

async function verifyTransporter(transporter) {
  if (!cachedVerificationPromise) {
    cachedVerificationPromise = transporter.verify().catch((error) => {
      cachedVerificationPromise = null;
      throw error;
    });
  }

  return cachedVerificationPromise;
}

async function sendViaBrevoApi({
  from,
  to,
  subject,
  htmlContent,
  textContent,
}) {
  const apiKey = getBrevoApiKey();

  if (!apiKey) {
    return false;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: from,
      to: [to],
      subject,
      htmlContent,
      textContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Brevo API send failed (${response.status}): ${errorText || "Unknown error"}`
    );
  }

  return true;
}

export async function sendOrderConfirmationEmail({
  order,
  customer,
  trackingUrl,
  trackingSnapshot,
}) {
  const emailClient = getTransporter();
  const productsMarkup = order.products
    .map(
      ({ product, quantity, price }) => `
        <tr>
          <td style="padding: 12px 0; color: #d1d5db;">${product?.name || "Product"}</td>
          <td style="padding: 12px 0; color: #d1d5db; text-align: center;">${quantity}</td>
          <td style="padding: 12px 0; color: #34d399; text-align: right;">${formatCurrencyINR(
            price * quantity
          )}</td>
        </tr>
      `
    )
    .join("");

  const productsText = order.products
    .map(
      ({ product, quantity, price }) =>
        `- ${product?.name || "Product"} x${quantity}: ${formatCurrencyINR(
          price * quantity
        )}`
    )
    .join("\n");

  const estimatedDelivery = new Date(
    trackingSnapshot.estimatedDeliveryDate
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const subject = `Order confirmed: ${order.trackingNumber}`;
  const text = `Hi ${customer.name || "there"},

Your order has been placed successfully.

Tracking number: ${order.trackingNumber}
Current status: ${trackingSnapshot.currentLabel}
Estimated delivery: ${estimatedDelivery}

Order summary:
${productsText}

Total paid: ${formatCurrencyINR(order.totalAmount)}

Track your order: ${trackingUrl}`;
  const html = `
      <div style="font-family: Arial, sans-serif; background: #111827; color: white; padding: 24px;">
        <div style="max-width: 640px; margin: 0 auto; background: #1f2937; border: 1px solid #065f46; border-radius: 16px; overflow: hidden;">
          <div style="padding: 24px; background: linear-gradient(135deg, #065f46, #111827);">
            <p style="margin: 0; font-size: 14px; color: #a7f3d0;">Thanks for shopping with us</p>
            <h1 style="margin: 8px 0 0; font-size: 28px;">Order confirmed</h1>
          </div>
          <div style="padding: 24px;">
            <p style="margin-top: 0; color: #d1d5db;">Hi ${
              customer.name || "there"
            }, your order has been placed successfully.</p>
            <div style="background: #111827; border: 1px solid #374151; border-radius: 12px; padding: 16px; margin: 24px 0;">
              <p style="margin: 0 0 8px; color: #9ca3af;">Tracking number</p>
              <p style="margin: 0; font-size: 20px; font-weight: 700; color: #34d399;">${order.trackingNumber}</p>
              <p style="margin: 16px 0 8px; color: #9ca3af;">Current status</p>
              <p style="margin: 0; color: white;">${trackingSnapshot.currentLabel}</p>
              <p style="margin: 16px 0 8px; color: #9ca3af;">Estimated delivery</p>
              <p style="margin: 0; color: white;">${estimatedDelivery}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="text-align: left; padding-bottom: 12px; color: #9ca3af;">Item</th>
                  <th style="text-align: center; padding-bottom: 12px; color: #9ca3af;">Qty</th>
                  <th style="text-align: right; padding-bottom: 12px; color: #9ca3af;">Amount</th>
                </tr>
              </thead>
              <tbody>${productsMarkup}</tbody>
            </table>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #374151; display: flex; justify-content: space-between;">
              <span style="color: #9ca3af;">Total paid</span>
              <strong style="color: #34d399;">${formatCurrencyINR(
                order.totalAmount
              )}</strong>
            </div>
            <a href="${trackingUrl}" style="display: inline-block; margin-top: 24px; background: #059669; color: white; text-decoration: none; padding: 12px 18px; border-radius: 999px;">Track your order</a>
          </div>
        </div>
      </div>
    `;
  const sender = parseSender(emailClient?.from || process.env.EMAIL_FROM);
  const recipient = {
    email: customer.email,
    name: customer.name || "Customer",
  };

  if (emailClient && !process.env.EMAIL_PASS?.startsWith("xkeysib-")) {
    await verifyTransporter(emailClient.transporter);

    await emailClient.transporter.sendMail({
      from: emailClient.from,
      to: customer.email,
      subject,
      text,
      html,
    });

    return true;
  }

  if (getBrevoApiKey()) {
    await sendViaBrevoApi({
      from: sender,
      to: recipient,
      subject,
      htmlContent: html,
      textContent: text,
    });

    return true;
  }

  if (!emailClient) {
    console.warn(
      "Order confirmation email skipped because no supported email configuration was found."
    );
    return false;
  }

  await verifyTransporter(emailClient.transporter);

  await emailClient.transporter.sendMail({
    from: emailClient.from,
    to: customer.email,
    subject,
    text,
    html,
  });

  return true;
}
