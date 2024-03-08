import { Model } from 'sequelize';
declare class Company extends Model {
    id: number;
    name: string;
    userId: number;
    email: string | null;
    address: string | null;
    phonenumber: string | null;
    createdAt: Date;
    updatedAt: Date;
    country: string | null;
    city: string | null;
    houseNumber: string | null;
    contactNumber: string | null;
    specificName: string | null;
    subCity: string | null;
    isVerified: boolean | null;
}
export default Company;
