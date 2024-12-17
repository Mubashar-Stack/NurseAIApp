import axios from 'axios';

export interface Task {
    id: string;
    patient_name: string;
    medication: string;
    status: string;
    created_at: string;
}

export interface TasksResponse {
    status: boolean;
    message: string;
    data: Task[];
}

export interface CreateTaskRequest {
    patient: number;
    patient_name: string;
    gender: string;
    issue: string;
    age: number;
    medication: string;
    task_details: string;
    nurse: number;
}

export interface CreateTaskResponse {
    status: boolean;
    message: string;
    data: any;
}

export const fetchCompletedTasks = async (token: string): Promise<TasksResponse> => {
    const response = await axios.get('https://technlogics.co/api/completed-tasks', {
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
        },
    });
    return response.data;
};

export const fetchTodaysTasks = async (token: string): Promise<TasksResponse> => {
    const response = await axios.get('https://technlogics.co/api/todays-tasks', {
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
        },
    });
    return response.data;
};

export const createTask = async (token: string, data: CreateTaskRequest): Promise<CreateTaskResponse> => {
    const response = await axios.post(
        'https://technlogics.co/api/create-task',
        data,
        {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json',
            },
        }
    );
    return response.data;
};