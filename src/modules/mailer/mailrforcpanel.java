"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailerService {
    constructor() {
        nodemailer_1.default.createTransport({
            // ...
            debug: true,
            // ...
        });
        // Initialize the nodemailer transporter
        this.transporter = nodemailer_1.default.createTransport({
            // Configure your email transport options (SMTP, SendGrid, etc.)
          host: 'mail.nilesoftdemo.com',
    port: 465,
    secure: true,
    auth: {
      user: '_mainaccount@nilesoftdemo.com',
      pass: 'samisams@123',
    },
        });
    }
    async sendVerificationEmail(email, verificationUrl) {
        const mailOptions = {
            from: '_mainaccount@nilesoftdemo.com',
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: ${verificationUrl}`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendNewEmail(email, verificationUrl) {
        const mailOptions = {
           from: '_mainaccount@nilesoftdemo.com',
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
        const resetPasswordLink = `http://localhost:3000/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
        const mailOptions = {
            from: '_mainaccount@nilesoftdemo.com',
            to: email,
            subject: 'Password Reset',
            text: `Click the link to reset your password: ${resetPasswordLink}`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendEmail({ to, subject, body }) {
        const mailOptions = {
            from: '_mainaccount@nilesoftdemo.com',
            to,
            subject,
            text: body,
        };
        await this.transporter.sendMail(mailOptions);
    }
}
exports.MailerService = MailerService;
