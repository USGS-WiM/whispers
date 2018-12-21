import { History } from '@interfaces/history';
export interface Comment extends History {
    id?: number;
    comment: string;
    comment_type: number;
}
