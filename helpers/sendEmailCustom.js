const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25,2525,265
  secure: true,
  auth: {
    user: "golik07@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmailCustom = async (data) => {
  const email = { ...data, from: "golik07@meta.ua" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmailCustom;
