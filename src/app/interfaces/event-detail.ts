
import { Event } from '@interfaces/event';
import { History } from '@interfaces/history';
import { EventLocation } from '@interfaces/event-location';
import { EventDiagnosis } from '@app/interfaces/event-diagnosis';
import { SuperEvent } from '@app/interfaces/super-event';

export interface EventDetail extends History {
    id: number;
    event_type: number;
    event_type_string: string;
    event_reference: string;
    complete: boolean;
    start_date: Date;
    end_date: Date;
    affected_count: number;
    staff: number;
    staff_string: string;
    event_status: number;
    event_status_string: string;
    legal_status: number;
    legal_status_string: string;
    legal_number: string;
    quality_check: boolean;
    public: boolean;
    superevents: SuperEvent[];
    eventdiagnoses: EventDiagnosis[];
    eventlocations: EventLocation[];
}
