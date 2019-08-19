import { Address } from './user-address';
import { Company } from './company';

export class User {
    id: string;
    name: string;
    username: string;
    email: string;
    website: string;
    phone: string;
    address: Address;
    company: Company;

}
const user: User = new User();


