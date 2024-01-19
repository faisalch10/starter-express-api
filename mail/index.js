import { Resend } from 'resend';
import dotenv from 'dotenv';

import asyncHandler from '../middlewares/asyncHandler.js';
import welcomeTemplate from './templates/welcome-template.js';

dotenv.config({ path: './config/.env' });
const resend = new Resend(process.env.RESEND_EMAIL_KEY);

const sendEmail = asyncHandler(async ({ emailAddress, password }) => {
  const { _, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: emailAddress,
    subject: 'Welcome To Our Platform',
    html: welcomeTemplate(emailAddress, password),
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
});

export default sendEmail;
