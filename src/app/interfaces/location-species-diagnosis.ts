import { Diagnosis } from '@interfaces/diagnosis';
import { OrganizationSummary } from '@interfaces/organization-summary';

export interface LocationSpeciesDiagnosis extends History {
    id: number;
    location_species: number;
    diagnosis: Diagnosis;
    suspect: boolean;
    major: boolean;
    priority: number;
    causal: boolean;
    tested_count: number;
    positive_count: number;
    suspect_count: number;
    pooled: boolean;
    diagnosis_organization: OrganizationSummary[];
}
