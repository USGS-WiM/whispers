"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=event-submission.js.map