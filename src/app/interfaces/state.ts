import { History } from '@interfaces/history';

export interface State extends History {
    id: number;
    name: string;
    country: number;
    abbreviation: string;
}
