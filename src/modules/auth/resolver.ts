import jsonwebtoken from 'jsonwebtoken';
import { comparePassword } from '../../utils/authentication/comparePassword';
import { User } from '../user';

interface LoginArgs {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const authResolver = {
  Mutation: {
    async login(_: any, { username, password }: LoginArgs): Promise<LoginResponse> {
      username = username.toLowerCase();
      const user: User | null = await User.findOne({ where: { username } });

      if (!user || !(await comparePassword(password, user.password))) {
        throw new Error('Incorrect username or password');
      }

    /*  if (user.status !== 'ACTIVE') {
        throw new Error('User account is suspended');
      }*/
    /*  if (!user.isVerified) {
        throw new Error('The account is Not verified please check your email ');
      }*/
      const token = jsonwebtoken.sign(
        { email: user.email },
        'secretkey123',
        { expiresIn: '1d' }
      );

      return {
        token,
        user,
      };
    },
    
  },
  /*loginWithGoogle: (_:any, { input }) => {
    return new Promise((resolve, reject) => {
      // Authenticate the user with Google
      passport.authenticate('google', { session: false }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve({ token });
        }
      })(input);
    });
  },*/
};

export { authResolver };