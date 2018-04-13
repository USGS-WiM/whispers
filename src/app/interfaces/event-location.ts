import { History } from '@interfaces/history';
import { LocationSpecies } from '@interfaces/location-species';
export interface EventLocation extends History {
    id: number;
    name: string;
    event: number;
    start_date: string;
    end_date: string;
    country: number;
    state: number;
    county: number;
    county_multiple: boolean;
    county_unknown: boolean;
    latitude: number;
    longitude: number;
    priority: number;
    land_ownership: number;
    flyway: string;
    gnis_name: number;
    location_species: LocationSpecies[];
}
