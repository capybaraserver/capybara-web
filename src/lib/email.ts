import nodemailer from 'nodemailer'
export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
  console.log(`Sending email to ${to} with subject "${subject}" and text "${text}"`)
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.163.com',
    port: process.env.MAIL_PORT ||  465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    });
    console.log('send email success:', info.response);
  } catch (error) {
    console.log('send email failed:', error);
  }
}