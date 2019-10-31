import { EventSummary } from '@interfaces/event-summary';
export interface PageData {
    count: number;
    next: string;
    previous: string;
    results: EventSummary[];
}
