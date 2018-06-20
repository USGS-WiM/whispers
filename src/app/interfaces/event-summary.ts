import { History } from '@interfaces/history';

import { AdministrativeLevelOne } from '@interfaces/administrative-level-one';
import { AdministrativeLevelTwo } from '@interfaces/administrative-level-two';
import { Species } from '@interfaces/species';
import { EventDiagnosis } from '@interfaces/event-diagnosis';

export interface EventSummary extends History {
    id: number;
    affected_count: number;
    end_date: string;
    start_date: string;
    event_type_string: string;
    event_type: number;
    event_diagnoses: EventDiagnosis[];
    administrativelevelones: AdministrativeLevelOne[];
    administrativeleveltwos: AdministrativeLevelTwo[];
    species: Species[];
}
