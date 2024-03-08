import ForgotPassword from "./model";
import { MailerService } from '../mailer/mailerService';
import User from "../user/model";
import bcrypt from 'bcrypt';

const mailerService = new MailerService();
interface changePasswordInt {
  username: string;
  currentPassword: string;
  newPassword: string;

}
function generateRandomToken(length: number = 16): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

const forgotPasswordResolver = {
  Mutation: {
    async forgotPassword(_: any, { email }: { email: string }): Promise<boolean> {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('User not found');
      }

      const token = generateRandomToken();

      await ForgotPassword.create({
        email,
        token,
        createdAt: new Date(), // Set the createdAt property to the current date
      });

      await mailerService.sendPasswordResetEmail(user.email, token);
      return true;
    },
    resetPassword: async (_: any, { input }: any) => {
        const { email, password, token } = input;
  
        try {
          // Validate the reset token in ForgotPassword table
          const forgotPasswordInfo = await ForgotPassword.findOne({
            where: { email, token},
          });
          if (!forgotPasswordInfo) {
            throw new Error('Invalid reset token');
          }
             const hashedPassword = await bcrypt.hash(password, 10);
          // Update the user's password in the User table
          const user = await User.findOne({ where: { email } });
          if (!user) {
            throw new Error('User not foutokennd');
          }
          user.password = hashedPassword;
          await user.save();
  
          // Remove the ForgotPassword record
          await forgotPasswordInfo.destroy();
  
          return user;
        } catch (error) {
          console.error('Failed to reset password:', error);
          throw error;
        }
      },
      changePassword: async (_:any, {input }:{input:changePasswordInt}) => {
        const { newPassword, currentPassword,username } = input;
  
        try {
          // Find the user by username
          const user = await User.findOne({ where: { username: username } });
          if (!user) {
            throw new Error('User not found');
          }
  
          // Check if the current password matches the user's password
          const passwordMatch = await bcrypt.compare(currentPassword, user.password);
          if (!passwordMatch) {
            throw new Error('Invalid current password');
          }
  
          // Hash the new password
          const hashedPassword = await bcrypt.hash(newPassword, 10);
  
          // Update the user's password in the User table
          user.password = hashedPassword;
          await user.save();
  
          return { username: user.username };
        } catch (error) {
          console.error('Failed to reset password:', error);
          throw error;
        }
      },
  }
};

export default forgotPasswordResolver;