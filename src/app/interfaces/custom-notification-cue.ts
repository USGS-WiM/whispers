
import { History } from '@interfaces/history';
import { NotificationCuePreference } from '@interfaces/notification-cue-preference';

export interface CustomNotificationCue  {
    id: number;
    new_notification_cue_preference?: number;
    event?: number;
    cue_string: string;
    event_affected_count?: number;
    event_location_land_ownership?: Object;
    event_location_administrative_level_one?: Object;
    species?: Object;
    species_diagnosis_diagnosis?: Object;
    notification_cue_preference?: NotificationCuePreference;
}
