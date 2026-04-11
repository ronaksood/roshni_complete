import nodemailer from "nodemailer";
import dotenv from "dotenv";

// This explicitly loads your .env file
dotenv.config();

async function testEmail() {
  console.log("1. Checking Environment Variables...");
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ ERROR: Could not read .env file. Variables are missing.");
    return;
  }
  console.log("✅ Variables loaded successfully.");

  console.log("2. Attempting to connect to Brevo...");
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "faizalam2432005@gmail.com", // Sending a test email to yourself
      subject: "Test Email from Node Server",
      text: "If you are reading this, your Brevo SMTP is working perfectly!",
    });
    console.log("✅ SUCCESS! Email sent to fahamchd@gmail.com");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ FAILED TO SEND EMAIL:");
    console.error(error);
  }
}

testEmail();