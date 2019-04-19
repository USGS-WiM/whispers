import { History } from '@interfaces/history';
export interface Circle extends History {
    id: number;
    name: string;
    description: string;
    users: number[];
}
