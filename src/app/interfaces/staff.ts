import { History } from '@interfaces/history';
export interface Staff extends History {
    id: number;
    first_name: string;
    last_name: string;
    role: number;
    active: boolean;
}
