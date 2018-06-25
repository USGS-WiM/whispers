export interface SearchQuery {
    event_type: number[];
    diagnosis: number[];
    diagnosis_type: number[];
    species: number[];
    administrative_level_one: number[];
    administrative_level_two: number[];
    affected_count: number;
    start_date: number;
    end_date: number;
    diagnosis_type_includes_all: boolean;
    diagnosis_includes_all: boolean;
    species_includes_all: boolean;
    administrative_level_one_includes_all: boolean;
    administrative_level_two_includes_all: boolean;
    openEventsOnly: boolean;
}
