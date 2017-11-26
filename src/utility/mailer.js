import { createTransport } from "nodemailer";

const from = '"Fuad" <fuad@bookworm.com>';

function setup() {
  return createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to BookWorm",
    text: `
    Welcome to BookWorm. Please confirm your email.

    ${user.generateConfirmationURL()}
    `
  };

  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset Password",
    text: `
    Follow this link to reset your password.

    ${user.generateResetPasswordURL()}
    `
  };

  transport.sendMail(email);
}