export declare class MailerService {
    private transporter;
    constructor();
    sendVerificationEmail(email: string, verificationUrl: string, username: string, password: string, firstName: string, lastName: string): Promise<void>;
    sendNewEmail(email: string, verificationUrl: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendNotificationEmail(email: string, token: string, purchaseRequestId: number): Promise<void>;
    sendEmail({ to, subject, body }: {
        to: string;
        subject: string;
        body: string;
    }): Promise<void>;
}
