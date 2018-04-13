import { History } from '@interfaces/history';
export interface DiagnosisType extends History {
    id: number;
    name: string;
    color: string;
}
