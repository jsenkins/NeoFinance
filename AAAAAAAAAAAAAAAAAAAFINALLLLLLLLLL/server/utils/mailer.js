// backend/utils/mailer.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: +process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from: `"Neo Finance" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
}
