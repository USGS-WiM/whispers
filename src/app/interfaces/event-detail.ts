
import { Event } from '@interfaces/event';
import { EventLocation } from '@interfaces/event-location';

export interface EventDetail extends Event {
    event_status_string: string;
    legal_status_string: string;
    event_locations: EventLocation[];
}
