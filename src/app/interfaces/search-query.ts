export interface SearchQuery {
    id?: number;
    name?: string;
    event_type: number[];
    diagnosis: number[];
    diagnosis_type: number[];
    species: number[];
    administrative_level_one: number[];
    administrative_level_two: number[];
    affected_count: number;
    affected_count_operator: string;
    start_date: string;
    end_date: string;
    diagnosis_type_includes_all: boolean;
    diagnosis_includes_all: boolean;
    species_includes_all: boolean;
    administrative_level_one_includes_all: boolean;
    administrative_level_two_includes_all: boolean;
    and_params: string[];
    complete: boolean;
}
