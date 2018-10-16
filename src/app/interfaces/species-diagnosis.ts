import { History } from '@interfaces/history';

export interface SpeciesDiagnosis {
    id?: number;
    location_species: number;
    diagnosis: number;
    diagnosis_string: string;
    cause: number;
    cause_string: number;
    basis: number;
    suspect: boolean;
    priority?: number;
    tested_count: number;
    diagnosis_count: number;
    positive_count?: number;
    suspect_count?: number;
    pooled?: boolean;
    organizations: object[];
    organizations_string: string[];
}
