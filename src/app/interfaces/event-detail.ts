
import { Event } from '@interfaces/event';
import { History } from '@interfaces/history';
import { EventLocation } from '@interfaces/event-location';
import { EventDiagnosis } from '@app/interfaces/event-diagnosis';
import { Organization } from '@interfaces/organization';
import { EventGroup } from '@app/interfaces/event-group';

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
    legal_status: string;
    legal_status_string: string;
    legal_number: string;
    quality_check: string;
    public: boolean;
    eventgroups: EventGroup[];
    eventdiagnoses: EventDiagnosis[];
    eventlocations: EventLocation[];
    eventorganizations: Organization[];
}
