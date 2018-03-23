import { History } from '@interfaces/history';

import { State } from '@interfaces/state';
import { County } from '@interfaces/county';
import { Species } from '@interfaces/species';
import { EventDiagnosis } from '@interfaces/event-diagnosis';

export interface EventSummary extends History {
    id: number;
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
    event_diagnosis: EventDiagnosis;
    states: State[];
    counties: County[];
    species: Species[];
}
