import { History } from '@interfaces/history';
export interface Diagnosis extends History {
    id: number;
    diagnosis: string;
    diagnosis_type: number;
}
