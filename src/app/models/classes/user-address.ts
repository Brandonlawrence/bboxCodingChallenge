import { Location } from './user-location';

export class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    location: Location
}
const address: Address = new Address();
