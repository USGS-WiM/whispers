import { History } from '@interfaces/history';
export interface Diagnosis extends History {
    id: number;
    name: string;
    diagnosis_type: number;
}
