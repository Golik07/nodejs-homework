const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, META_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25,2525,265
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmailCustom = async (data) => {
  const email = { ...data, from: META_EMAIL };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmailCustom;
