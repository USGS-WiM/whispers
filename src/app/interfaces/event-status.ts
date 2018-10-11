import { History } from '@interfaces/history';

export interface EventStatus extends History {
    id: number;
    name: string;
}