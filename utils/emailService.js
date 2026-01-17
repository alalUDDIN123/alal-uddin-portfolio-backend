const nodemailer = require('nodemailer');

// Create transporter using Gmail SMTP
// Note: For production, use environment variables for sensitive credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

/**
 * Send welcome email to user after contact form submission
 * @param {string} userEmail - Recipient email address
 * @param {string} firstName - User's first name
 * @returns {Promise<boolean>} - Success status
 */
const sendWelcomeEmail = async (userEmail, firstName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'alaluddin.dev@gmail.com',
      to: userEmail,
      subject: '✨ Thank you for reaching out!',
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Hello ${firstName}! 👋</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Thank you for reaching out to me! I've received your message and really appreciate you taking the time to contact me.
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            I will get back to you as soon as possible, typically within 24-48 hours.
          </p>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0; border-radius: 4px;">
            <p style="color: #333; font-size: 14px; margin: 0;">
              <strong>In the meantime:</strong><br>
              Feel free to check out my portfolio or connect with me on social media. I'm always happy to discuss new opportunities and collaborations.
            </p>
          </div>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
            Best regards,<br>
            <strong>Alal Uddin</strong><br>
            Full Stack Developer
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

/**
 * Send notification email to admin/owner
 * @param {Object} contactData - Contact form data
 * @returns {Promise<boolean>} - Success status
 */
const sendAdminNotification = async (contactData) => {
  try {
    const { firstname, lastname, email, phone, message } = contactData;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'alaluddin.dev@gmail.com',
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `📬 New Contact Form Submission from ${firstname}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #333;">New Contact Submission</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f5f5f5;">
              <td style="padding: 12px; font-weight: bold; color: #333; width: 150px;">Name:</td>
              <td style="padding: 12px; color: #666;">${firstname} ${lastname || ''}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 12px; color: #666;">${email}</td>
            </tr>
            <tr style="background-color: #f5f5f5;">
              <td style="padding: 12px; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 12px; color: #666;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 12px; font-weight: bold; color: #333;">Message:</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 12px; color: #666; background-color: #f9f9f9; border-radius: 4px;">
                ${message}
              </td>
            </tr>
          </table>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            This is an automated notification. Please reply directly to ${email} or visit the admin dashboard to respond.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Admin notification error:', error);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendAdminNotification,
};
