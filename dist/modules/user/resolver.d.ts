import User from './model';
import { Request, Response, NextFunction } from 'express';
interface CreateUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: string;
        companyName?: string;
        phoneNumber: string;
        category: string;
        country: string;
        city: string;
        profilepicture?: string;
    };
}
declare const userResolver: {
    Query: {
        users: () => Promise<User[]>;
    };
    Mutation: {
        createUser: (_: any, { input }: CreateUserArgs) => Promise<User>;
        uploadProfilePicture: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    };
};
export default userResolver;
