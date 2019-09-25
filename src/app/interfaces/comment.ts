import { History } from '@interfaces/history';
export interface Comment extends History {
    id?: number;
    comment: string;
    comment_type: number;
    object_id?: number;
    object_name?: string;
    content_type_string?: string;
    created_by_organization_string?: string;
}
