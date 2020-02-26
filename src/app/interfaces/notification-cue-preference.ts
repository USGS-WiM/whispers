import { History } from '@interfaces/history';

export interface NotificationCuePreference {
    id: number;
    create_when_new: boolean;
    create_when_modified: boolean;
    send_email: boolean;
}
