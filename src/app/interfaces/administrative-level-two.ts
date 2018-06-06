import { History } from '@interfaces/history';

export interface AdministrativeLevelTwo extends History {
    id: number;
    points: string;
    centroid_latitude: string;
    centroid_longitude: string;
    fips_code: string;
}
