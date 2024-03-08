import { Model } from 'sequelize';
import { User } from '../user';
declare class Verification extends Model {
    id: number;
    token: string;
    userId: number;
    user: User;
}
export { Verification };
