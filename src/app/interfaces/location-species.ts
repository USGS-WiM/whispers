import { History } from '@interfaces/history';
import { LocationSpeciesDiagnosis } from '@interfaces/location-species-diagnosis';
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
    speciesdiagnoses: LocationSpeciesDiagnosis[];
    administrative_level_two_string?: string;
    administrative_level_one_string?: string;
    country_string?: string;
}
