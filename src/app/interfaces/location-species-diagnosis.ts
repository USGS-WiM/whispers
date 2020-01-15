import { Diagnosis } from '@interfaces/diagnosis';
import { OrganizationSummary } from '@interfaces/organization-summary';

export interface LocationSpeciesDiagnosis extends History {
    id: number;
    locationspecies: number;
    diagnosis: Diagnosis;
    diagnosis_string: string;
    suspect: boolean;
    major: boolean;
    priority: number;
    cause: boolean;
    tested_count: number;
    positive_count: number;
    suspect_count: number;
    pooled: boolean;
    diagnosis_organization: OrganizationSummary[];
    organizations_string: string;
}
