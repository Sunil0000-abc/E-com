const nodemailer = require('nodemailer');

const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,  
      pass: process.env.USER_PASSWORD   
    }
  });

  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to,
    subject,
    text
  });
};

module.exports = sendMail;
