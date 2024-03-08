import { User } from '../user';
import { Verification } from './model';

const verificationResolver = {
  Mutation: {
    async verifyUser(_: any, { token }: { token: string }): Promise<User> {
      const verification = await Verification.findOne({
        where: { token },
        include: { model: User, as: 'user' },
      });

      if (!verification) {
        throw new Error('Invalid verification token');
      }

      await User.update({ isVerified: true }, { where: { id: verification.userId } });
      await Verification.destroy({ where: { id: verification.id } });

      return verification.user;
    },
  },
};

export default verificationResolver;