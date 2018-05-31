import { History } from '@interfaces/history';
export interface Contact extends History {
    first_name: string;
    last_name: string;
    phone_number: string;
    email_address: string;
    title: string;
    position: string;
    type: number;
    org_id: number;
    owner_ord_id: number;
    affiliation: string;
}
