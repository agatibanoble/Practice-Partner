const nodemailer = require("nodemailer");
const config = require("../config/config");
const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    service: "gmail",
    auth: {
      user: config.email_user,
      pass: config.email_pwd,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Practice Partner info<agatibanoble@gmail.com>",
    to: options.toid,
    subject: "recover password",
    text: options.message,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
