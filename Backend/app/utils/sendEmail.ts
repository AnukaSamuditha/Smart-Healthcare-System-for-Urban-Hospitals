import nodemailer from "nodemailer";
export type EmailOptionsType = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
  logger: true,
  debug: false,
});

const sendMail = async (mailOptions: EmailOptionsType) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending email", error.message);
    }
    console.log("Email sent", info);
  });
};

export { sendMail };