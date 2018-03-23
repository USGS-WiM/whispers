import { History } from '@interfaces/history';

export interface Event extends History {
    superevent: string;
    legal_number: number;
    legal_status: string;
    event_status_string: string;
    event_status: number;
    epi_staff: string;
    affected_count: number;
    end_date: string;
    start_date: string;
    complete: boolean;
    event_reference: string;
    event_type_string: string;
    event_type: number;
    id: number;
}
