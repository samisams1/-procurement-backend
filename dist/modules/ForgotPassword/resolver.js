"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const mailerService_1 = require("../mailer/mailerService");
const model_2 = __importDefault(require("../user/model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailerService = new mailerService_1.MailerService();
function generateRandomToken(length = 16) {
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
        async forgotPassword(_, { email }) {
            const user = await model_2.default.findOne({ where: { email } });
            if (!user) {
                throw new Error('User not found');
            }
            const token = generateRandomToken();
            await model_1.default.create({
                email,
                token,
                createdAt: new Date(), // Set the createdAt property to the current date
            });
            await mailerService.sendPasswordResetEmail(user.email, token);
            return true;
        },
        resetPassword: async (_, { input }) => {
            const { email, password, token } = input;
            try {
                // Validate the reset token in ForgotPassword table
                const forgotPasswordInfo = await model_1.default.findOne({
                    where: { email, token },
                });
                if (!forgotPasswordInfo) {
                    throw new Error('Invalid reset token');
                }
                const hashedPassword = await bcrypt_1.default.hash(password, 10);
                // Update the user's password in the User table
                const user = await model_2.default.findOne({ where: { email } });
                if (!user) {
                    throw new Error('User not foutokennd');
                }
                user.password = hashedPassword;
                await user.save();
                // Remove the ForgotPassword record
                await forgotPasswordInfo.destroy();
                return user;
            }
            catch (error) {
                console.error('Failed to reset password:', error);
                throw error;
            }
        },
        changePassword: async (_, { input }) => {
            const { newPassword, currentPassword, username } = input;
            try {
                // Find the user by username
                const user = await model_2.default.findOne({ where: { username: username } });
                if (!user) {
                    throw new Error('User not found');
                }
                // Check if the current password matches the user's password
                const passwordMatch = await bcrypt_1.default.compare(currentPassword, user.password);
                if (!passwordMatch) {
                    throw new Error('Invalid current password');
                }
                // Hash the new password
                const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
                // Update the user's password in the User table
                user.password = hashedPassword;
                await user.save();
                return { username: user.username };
            }
            catch (error) {
                console.error('Failed to reset password:', error);
                throw error;
            }
        },
    }
};
exports.default = forgotPasswordResolver;
