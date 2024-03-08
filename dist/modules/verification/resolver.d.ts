import { User } from '../user';
declare const verificationResolver: {
    Mutation: {
        verifyUser(_: any, { token }: {
            token: string;
        }): Promise<User>;
    };
};
export default verificationResolver;
