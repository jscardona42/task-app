export interface Task {
    id: number;
    title: string;
    description: string;
    completed?: boolean;
    status?: boolean;
    expiration_date: Date;
    user_id?: number;
    user_name?: string;
    role_name?: string;
    role_id?: number;
}
