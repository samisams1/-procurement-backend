"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path = require('path');
class MailerService {
    constructor() {
        // Initialize the nodemailer transporter
        this.transporter = nodemailer_1.default.createTransport({
            host: 'mail.nilesoftdemo.com',
            port: 465, // or 465 for SSL  or 587
            secure: true, // true for SSL
            auth: {
                user: 'yosis@nilesoftdemo.com',
                pass: 'samisams@123',
            },
            // Add the following options for enhanced email deliverability
            tls: {
                rejectUnauthorized: false
            },
            envelope: {
                from: 'yosis@nilesoftdemo.com',
            },
            // Enable DMARC (Domain-based Message Authentication, Reporting, and Conformance)
            // Add the DMARC record in your DNS settings for improved deliverability
        });
    }
    async sendVerificationEmail(email, verificationUrl, username, password, firstName, lastName) {
        const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', '1708721484772-kotari.jpeg');
        const mailOptions = {
            from: 'yosis@nilesoftdemo.com',
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: ${verificationUrl}`,
            html: `
      <div style="background-color: #f3f3f3; padding: 20px; font-family: Arial, sans-serif;">
      <div>
        <p>Welcome to etprofoma.com, your all-in-one platform for easy online product purchasing. Feel free to send your requests based on your requirements. For more information, please read our guideline on how to create requests.</p>
        <p>By clicking the verification button, you will be redirected to the login page where you can enter your username and password to access your dashboard.</p>
        <p><strong>Attention:</strong> In order to protect your account, please do not allow others to access your email unless authorized by a sales or purchaser who can access your company's account profile on etproforma.com.</p>
      </div>
      <div style="background-color: #00b0ad; padding: 10px; color: #ffffff;">
        <h4 style="margin: 0; font-size: 20px;">Thank you for registering for etproforma.com</h4>
      </div>
      <div style="margin-top: 20px;">
        <h4 style="margin: 0; font-size: 18px;">Dear ${firstName} ${lastName},</h4>
        <p style="margin-top: 10px; font-size: 16px;">To verify your email address, please click the verification link below.</p>
      </div>
      <div style="background-color: #ffffff; padding: 20px; margin-top: 20px;">
        <a href="${verificationUrl}" style="background-color: #00b0ad; color: #ffffff; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; margin-top: 10px; font-size: 16px;">Verify Your Account</a>
      </div>
      <div style="margin-top: 20px;">
        <p style="margin: 0; font-size: 16px;">Here are the login details for your Nile Soft account:</p>
        <p style="margin-top: 10px; font-size: 16px;"><strong>User-Name:</strong> ${username}</p>
        <p style="margin-top: 10px; font-size: 16px;"><strong>Password:</strong> ${password.replace(/^(...)/, "***")}</p>
      </div>
      <div style="margin-top: 20px;">
        <p style="margin: 0; font-size: 16px;">Regards,</p>
      </div>
      <div style="background-color: #f3f3f3; padding: 10px; text-align: center; margin-top: 20px;">
        <img src="${imagePath}" alt="Company Logo" style="max-width: 200px; display: block; margin: 0 auto;">
        <p style="color: #808080; font-size: 12px; margin-top: 10px;">&#169; 2024 Nile Soft. All rights reserved.</p>
      </div>
    </div>
    `,
            headers: {
                'X-Priority': '1', // Set the email priority to high
            },
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendNewEmail(email, verificationUrl) {
        const mailOptions = {
            from: 'yosis@nilesoftdemo.com',
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: ${verificationUrl}`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    /* async sendPasswordResetEmail(email: string, token: string): Promise<void> {
       const mailOptions: nodemailer.SendMailOptions = {
         from: 'forsamisams@gmail.com',
         to: email,
         subject: 'Password Reset',
         text: `Click the link to reset your password: http://localhost:3000/reset-password?token=${token}`,
       };
   
       await this.transporter.sendMail(mailOptions);
     }*/
    async sendPasswordResetEmail(email, token) {
        const resetPasswordLink = `https://et-proforma.netlify.app/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
        const mailOptions = {
            /*
            // Read the image file from the local file system
        const imageBuffer = fs.readFileSync('/path/to/your/image */
            from: 'yosis@nilesoftdemo.com',
            to: email,
            subject: 'Password Reset',
            html: `
      <div style="background-color: #f3f3f3; padding: 20px;">
        <div style="background-color: #00b0ad; padding: 10px; color: #ffffff;">
          <h2>Password Reset</h2>
        </div>
        <div style="background-color: #ffffff; padding: 20px;">
          <p>Click the link below to reset your password:</p>
          <a href="${resetPasswordLink}" style="background-color: #00b0ad; color: #ffffff; padding: 10px 20px; text-decoration: none; display: inline-block;">
            Reset Password
          </a>
        </div>
        <div style="background-color: #f3f3f3; padding: 10px; text-align: center;">
          <img src="https://example.com/logo.png" alt="Company Logo" style="max-width: 200px;" />
          <p style="color: #808080; font-size: 12px;">© 2022 Your Company. All rights reserved.</p>
        </div>
      </div>
    `,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendNotificationEmail(email, token, purchaseRequestId) {
        const imagePath = path.join(__dirname, '..', '..', '..', 'uploads', '1708721484772-kotari.jpeg');
        const mailOptions = {
            from: 'yosis@nilesoftdemo.com',
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email:`,
            html: `
      <div style="background-color: #f3f3f3; padding: 20px; font-family: Arial, sans-serif;">
  <div style="background-color: #00b0ad; padding: 10px; color: #ffffff;">
    <h4 style="margin: 0; font-size: 20px;">VERIFY YOUR NileSoft EMAIL</h4>
  </div>
  <div style="margin-top: 20px;">
    <h4 style="margin: 0; font-size: 18px;">Dear ,</h4>
    <p style="margin-top: 10px; font-size: 16px;">To verify your email address, please click the verification link below.</p>
  </div>
  <div style="background-color: #ffffff; padding: 20px; margin-top: 20px;">
    <a href="" style="background-color: #00b0ad; color: #ffffff; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px; margin-top: 10px; font-size: 16px;">Verify Your Account</a>
  </div>
  <div style="margin-top: 20px;">
    <p style="margin: 0; font-size: 16px;">Here are the login details for your Nile Soft account:</p>
  </div>
  <div style="margin-top: 20px;">
    <p style="margin: 0; font-size: 16px;">Regards,</p>
  </div>
  <div style="background-color: #f3f3f3; padding: 10px; text-align: center; margin-top: 20px;">
  <img src="${imagePath}" alt="Company Logo" style="max-width: 200px; display: block; margin: 0 auto;">
    <p style="color: #808080; font-size: 12px; margin-top: 10px;">&#169; 2024 Nile Soft. All rights reserved.</p>
  </div>
</div>
    `,
        };
        await this.transporter.sendMail(mailOptions);
    }
    /*async sendNotificationEmail(email: string, token: string,purchaseRequestId:number): Promise<void> {
      const purchaseRequestLink = `https://et-proforma.netlify.app/purchaseRequest/${encodeURIComponent(purchaseRequestId)}`;
    
      const mailOptions: nodemailer.SendMailOptions = {
    from: 'yosis@nilesoftdemo.com',
        to: email,
        subject: 'New Purchase Request is Created',
        html: `
        <div style="background-color: #f3f3f3; padding: 20px;">
          <div style="background-color: #00b0ad; padding: 10px; color: #ffffff;">
            <h2>Password Reset</h2>
          </div>
          <div style="background-color: #ffffff; padding: 20px;">
            <p>Click the link below to reset your password:</p>
            <a href="${purchaseRequestLink}" style="background-color: #00b0ad; color: #ffffff; padding: 10px 20px; text-decoration: none; display: inline-block;">
            New Request
            </a>
          </div>
          <div style="background-color: #f3f3f3; padding: 10px; text-align: center;">
            <img src="https://et-proforma.netlify.app/uploads/1708721484772-kotari.jpeg" alt="Company Logo" style="max-width: 200px;" />
            <p style="color: #808080; font-size: 12px;">© 2022 Your Company. All rights reserved.</p>
          </div>
        </div>
      `,
      };
    
      await this.transporter.sendMail(mailOptions);
    } */
    async sendEmail({ to, subject, body }) {
        const mailOptions = {
            from: 'yosis@nilesoftdemo.com',
            to,
            subject,
            text: body,
        };
        await this.transporter.sendMail(mailOptions);
    }
}
exports.MailerService = MailerService;
