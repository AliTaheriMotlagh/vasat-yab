import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;
const mailDomain = process.env.NEXT_PUBLIC_MAIL_URL;

const sendMail = async (email: string, subject: string, html: string) => {
  try {
    await resend.emails.send({
      from: `no-reply@${mailDomain}`,
      to: email,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.log(`Email Was Not Send!`, error);
    console.log(`${subject}---${email}---${html}`);
  }
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendMail(email, "2FA Code", `<p>Your 2FA code: ${token}</p>`);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await sendMail(
    email,
    "Reset your password",
    `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  );
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await sendMail(
    email,
    "Confirm your email",
    `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  );
};
