const { transporter } = require("../config/smtp");

const sendEmail = async ({ to, subject, text, html }) => {
  if (!transporter) {
    const error = new Error("Email service is not configured");
    error.statusCode = 503;
    error.publicMessage = "Email service is not configured. OTP cannot be sent.";
    throw error;
  }

  try {
    return await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    const emailError = new Error("Email could not be sent. Please try again later.");
    emailError.statusCode = 503;
    emailError.cause = error;
    throw emailError;
  }
};

module.exports = sendEmail;
