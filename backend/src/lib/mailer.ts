import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }: {to:string; subject:string; html:string}) {
  const acc = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: acc.smtp.host,
    port: acc.smtp.port,
    secure: acc.smtp.secure,
    auth: { user: acc.user, pass: acc.pass },
  });

  const info = await transporter.sendMail({
    from: '"Malaika House" <no-reply@malaika.local>',
    to, subject, html,
  });

  console.log("Email preview URL:", nodemailer.getTestMessageUrl(info));
}