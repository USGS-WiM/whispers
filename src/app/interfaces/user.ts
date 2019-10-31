export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_superuser?: boolean;
    is_staff?: boolean;
    is_active?: boolean;
    role?: number;
    organization?: number;
    circles?: number[];
    last_login?: string;
    active_key?: string;
    user_status?: string;
}
