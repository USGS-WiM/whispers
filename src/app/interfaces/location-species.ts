import { History } from '@interfaces/history';
import { SpeciesDiagnosis } from '@interfaces/species-diagnosis';
export interface LocationSpecies extends History {
    event_location: number;
    species: number;
    species_string?: string;
    population_count: number;
    sick_count: number;
    dead_count: number;
    sick_count_estimated: number;
    dead_count_estimated: number;
    priority: number;
    captive: boolean;
    age_bias: number;
    sex_bias: number;
    species_diagnosis: SpeciesDiagnosis[];
    county_string?: string;
    state_string?: string;
    country_string?: string;
}
