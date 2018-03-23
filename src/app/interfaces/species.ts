import { History } from '@interfaces/history';

export interface Species extends History {
    id: number;
    class_name: string;
    order_name: string;
    family_name: string;
    sub_family_name: string;
    genus_name: string;
    species_latin_name: string;
    subspecies_latin_name: string;
    tsn: number;
}
