export interface DisplayQuery {
    event_type: string[];
    diagnosis: string[];
    diagnosis_type: string[];
    species: string[];
    administrative_level_one: string[];
    administrative_level_two: string[];
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
    openEventsOnly: boolean;
}
