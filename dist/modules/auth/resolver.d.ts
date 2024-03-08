import { User } from '../user';
interface LoginArgs {
    username: string;
    password: string;
}
interface LoginResponse {
    token: string;
    user: User;
}
declare const authResolver: {
    Mutation: {
        login(_: any, { username, password }: LoginArgs): Promise<LoginResponse>;
    };
};
export { authResolver };
