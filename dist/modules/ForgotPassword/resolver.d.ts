import User from "../user/model";
interface changePasswordInt {
    username: string;
    currentPassword: string;
    newPassword: string;
}
declare const forgotPasswordResolver: {
    Mutation: {
        forgotPassword(_: any, { email }: {
            email: string;
        }): Promise<boolean>;
        resetPassword: (_: any, { input }: any) => Promise<User>;
        changePassword: (_: any, { input }: {
            input: changePasswordInt;
        }) => Promise<{
            username: string;
        }>;
    };
};
export default forgotPasswordResolver;
