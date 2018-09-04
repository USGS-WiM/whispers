import { History } from '@interfaces/history';

export interface AdministrativeLevelTwo extends History {
    id: number;
    name: string;
    administrative_level_one?: number;
    administrative_level_one_string?: string;
    points: string;
    centroid_latitude: string;
    centroid_longitude: string;
    fips_code: string;
}
