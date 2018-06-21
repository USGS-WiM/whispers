import { History } from '@interfaces/history';
import { LocationSpecies } from '@interfaces/location-species';
export interface EventLocation extends History {
    id: number;
    name: string;
    event: number;
    start_date: string;
    end_date: string;
    country: number;
    administrative_level_one: number;
    administrative_level_two: number;
    // county_multiple: boolean;
    // county_unknown: boolean;
    latitude: number;
    longitude: number;
    priority: number;
    land_ownership: number;
    flyway: string;
    gnis_name: number;
    location_species: LocationSpecies[];
    administrative_level_two_string?: string;
    administrative_level_one_string?: string;
    country_string?: string;
}
