import { History } from '@interfaces/history';
import { Event } from '@interfaces/event';

export interface SuperEvent extends History {
    id: number;
    category: number;
    events: Event[];
}
