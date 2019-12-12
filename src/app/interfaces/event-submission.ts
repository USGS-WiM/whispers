
import { Contact } from '@interfaces/contact';
import { Organization } from '@interfaces/organization';
import { Comment } from '@interfaces/comment';
import { EventLocation } from '@interfaces/event-location';

export interface EventDiagnosisSubmission {
    diagnosis: number;
}

export interface NewEventLocation {
    name: string;
    // event: number;
    start_date: string;
    end_date: string;
    country: number;
    administrative_level_one: number;
    administrative_level_two: number;
    latitude: string;
    longitude: string;
    land_ownership: number;
    comment: string;
    new_location_species: NewLocationSpecies[];
}

export interface NewLocationSpecies {
    species: number;
    population_count: number;
    sick_count: number;
    dead_count: number;
    sick_count_estimated: number;
    dead_count_estimated: number;
    captive: boolean;
    new_species_diagnoses?: NewSpeciesDiagnosis[];
}

export interface NewSpeciesDiagnosis {
    diagnosis: number;
    cause: number;
    basis: number;
    suspect: boolean;
    tested_count: number;
    diagnosis_count: number;
    new_species_diagnosis_organizations?: number[];
}

export interface EventSubmission {
    event_reference: string;
    event_type: number;
    public: boolean;
    event_status: number;
    new_event_diagnoses: EventDiagnosisSubmission[];
    new_event_locations: NewEventLocation[];
}

// nested event submission structure (old way)
 // new_event_locations: [
    //     {
    //         name: string;
    //         // event: number;
    //         start_date: string;
    //         end_date: string;
    //         country: number;
    //         administrative_level_one: number;
    //         administrative_level_two: number;
    //         latitude: string;
    //         longitude: string;
    //         land_ownership: number;
    //         comment: string
    //         new_location_species: [
    //             {
    //                 species: number;
    //                 population_count: number;
    //                 sick_count: number;
    //                 dead_count: number;
    //                 sick_count_estimated: number;
    //                 dead_count_estimated: number;
    //                 captive: boolean;
    //                 new_species_diagnoses: [
    //                     {
    //                         // locationspecies: number;
    //                         diagnosis: number;
    //                         cause: number;
    //                         basis: number;
    //                         suspect: boolean;
    //                         tested_count: number;
    //                         diagnosis_count: number;
    //                         new_species_diagnosis_organizations: number[]
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]
