export interface Task {
    id: number;
    title: string;
    description: string;
    completed?: boolean;
    status?: boolean;
    expiration_date: Date;
}
