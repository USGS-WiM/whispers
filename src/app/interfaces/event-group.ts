import { History } from '@interfaces/history';
import { Event } from '@interfaces/event';

export interface EventGroup extends History {
    id: number;
    category: number;
    events: Event[];
}
