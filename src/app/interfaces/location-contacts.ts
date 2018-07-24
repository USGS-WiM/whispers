import { History } from '@interfaces/history';
export interface LocationContact extends History {
    event_location: number;
    contact: number;
    contact_type: number;
}