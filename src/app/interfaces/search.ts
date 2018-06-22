import { History } from '@interfaces/history';

export interface Search extends History {
    id: number;
    name: string;
    owner: number;
    data: string;
}