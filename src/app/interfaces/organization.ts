import { History } from '@interfaces/history';
export interface Organization extends History {
    id: number;
    name: string;
    private_name: string;
    address_one: string;
    address_two: string;
    city: string;
    zip_postal_code: number;
    state: number;
    country: number;
    phone: number;
    parent_organization: number;
    do_not_publish: boolean;
    organization?;
}

