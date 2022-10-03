import nodemailer from 'nodemailer';

const SMTP_HOST: string = process.env.SMTP_HOST!;
const SMTP_PORT: number = Number(process.env.SMTP_PORT)!;
const API_URL: string = process.env.API_URL!;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendActivationMail = async (email: string, link: string) => {
  const urlLink = `${API_URL}/api/activate/${link}`;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: `Activate your account on ${API_URL}`,
    html: `
         <div>
            <h1>For activation click the link</h1>
            <a href="${urlLink}" >${urlLink}</a>
         </div>
       `,
  });
};
