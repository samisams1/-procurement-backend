import crypto from 'crypto';
import { User } from '../user';
import { Verification } from './model';

export class VerificationService {
  async createVerificationToken(userId: number): Promise<string> {
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const verification = await Verification.create({ token: verificationToken, userId });
    return verificationToken;
  }

  /*async verifyToken(token: string): Promise<User> {
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
  }*/
}