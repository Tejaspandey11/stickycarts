const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}:`, info.response);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${to}:`, error.message);
    throw error;
  }
};

const sendVerificationEmail = async (email, verificationLink) => {
  const subject = 'Verify your Sticky Carts account';
  const htmlContent = `
    <h2>Welcome to Sticky Carts!</h2>
    <p>Please click the link below to verify your email:</p>
    <a href="${verificationLink}">Verify Email</a>
  `;
  return sendEmail(email, subject, htmlContent);
};

const sendPasswordResetEmail = async (email, resetLink) => {
  const subject = 'Reset your Sticky Carts password';
  const htmlContent = `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link expires in 1 hour.</p>
  `;
  return sendEmail(email, subject, htmlContent);
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
};
