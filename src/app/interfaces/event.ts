import { History } from '@interfaces/history';
import { Contact } from '@interfaces/contact';
import { Organization } from '@interfaces/organization';
import { Comment } from '@interfaces/comment';

export interface Event extends History {
    legal_number: string;
    legal_status: string;
    event_status_string: string;
    event_status: number;
    epi_staff: string;
    affected_count: number;
    end_date: string;
    start_date: string;
    complete: boolean;
    event_reference: string;
    event_type_string: string;
    event_type: number;
    id: number;
    permission_source: string;
    organizations: Organization[];
    contacts: Contact[];
    comments: Comment[];
}
