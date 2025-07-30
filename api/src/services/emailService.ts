import nodemailer from 'nodemailer';
import * as process from 'node:process';

// Create and configure the email transporter
const createTransporter = () => {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error('Missing required email environment variables');
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT, 10),
    secure: parseInt(EMAIL_PORT, 10) === 465, // true if port is 465
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    logger: true, // Logs to console
    debug: true,  // Enables debug output
  });
};

// Send a password reset email
export const sendPasswordResetEmail = async (
  email: string,
  firstName: string,
  resetUrl: string
): Promise<void> => {
  try {
    const transporter = createTransporter();

    const fromName = process.env.EMAIL_FROM_NAME || 'YourApp';
    const fromEmail = process.env.EMAIL_FROM_EMAIL || 'no-reply@yourapp.com';

    const mailOptions = {
      from: {
        name: fromName,
        address: fromEmail,
      },
      to: email,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <p style="font-size: 18px;">Hello ${firstName},</p>
            <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
            <p>To reset your password, click the button below:</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                       color: white;
                       padding: 14px 28px;
                       text-decoration: none;
                       border-radius: 5px;
                       font-weight: bold;
                       display: inline-block;">
                Reset Password
              </a>
            </div>

            <p>This link will expire in 1 hour for security reasons.</p>

            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Best regards,<br>
              ${fromName} Team
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Hello ${firstName},

        We received a request to reset your password. If you didn't make this request, you can safely ignore this email.

        To reset your password, visit this link: ${resetUrl}

        This link will expire in 1 hour for security reasons.

        Best regards,
        ${fromName} Team
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};


// Send a email varification email
export const sendEmailVerificationEmail = async (
  email: string,
  firstName: string,
  verificationUrl: string
): Promise<void> => {
  try {
    const transporter = createTransporter();

    const fromName = process.env.EMAIL_FROM_NAME || 'YourApp';
    const fromEmail = process.env.EMAIL_FROM_EMAIL || 'no-reply@yourapp.com';

    const mailOptions = {
      from: {
        name: fromName,
        address: fromEmail,
      },
      to: email,
      subject: 'Email Verification Request',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email Verification Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Email Verification Request</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <p style="font-size: 18px;">Hello ${firstName},</p>
            <p>Thank you for signing up with LifeLine. Please verify your email address by clicking on the button below:</p>
           
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                       color: white;
                       padding: 14px 28px;
                       text-decoration: none;
                       border-radius: 5px;
                       font-weight: bold;
                       display: inline-block;">
                Verify Email
              </a>
            </div>

            <p>This link will expire in 1 hour for security reasons.</p>

            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Best regards,<br>
              ${fromName}
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Hello ${firstName},

        Thank you for signing up with LifeLine. Please verify your email address by clicking on the button below:

        ${verificationUrl}

        This link will expire in 1 hour for security reasons.

        Best regards,
        ${fromName}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};