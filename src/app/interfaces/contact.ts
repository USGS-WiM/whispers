import { History } from '@interfaces/history';
export interface Contact extends History {
    id?: number;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email: string;
    title: string;
    position: string;
    organization: number;
    owner_organization: number;
    affiliation: string;
    permission_source: string;
}
