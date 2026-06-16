const nodemailer = require("nodemailer");

const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

let transporter = null;

if (missingEnvVars.length > 0) {
  console.warn(`SMTP not configured. Missing: ${missingEnvVars.join(", ")}`);
} else {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

const isEmailConfigured = () => Boolean(transporter);

const verifyEmailConnection = async () => {
  if (!transporter) {
    console.warn("SMTP verification skipped because SMTP is not configured.");
    return false;
  }

  try {
    await transporter.verify();
    console.log("SMTP connection verified.");
    return true;
  } catch (error) {
    console.warn(`SMTP verification failed: ${error.message}`);
    return false;
  }
};

module.exports = {
  transporter,
  isEmailConfigured,
  verifyEmailConnection
};
