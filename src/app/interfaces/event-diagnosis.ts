import { History } from '@interfaces/history';

export interface EventDiagnosis extends History {
    id: number;
    diagnosis: number;
    diagnosis_string?: string;
    suspect: boolean;
    major: boolean;
    priority: number;
}
