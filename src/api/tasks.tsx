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

export interface PatientData {
    age: number;
    created_at: string;
    created_by: number;
    gender: string;
    id: number;
    issue: string;
    medical_history: string[];
    medication: string;
    nurse: number;
    patient: number;
    patient_address: string;
    patient_name: string;
    status: string;
    task_details: string;
}

export interface Review {
    id: number;
    comment: string;
    rating: number;
    nurse: {
        id: number;
        name: string;
        user_photo: string | null;
    };
    patient: {
        id: number;
        name: string;
        user_photo: string;
    };
    created_at: string;
}

export interface SendMessageRequest {
    receiver_id: number;
    content: string;
    message_type: string;
}

export interface AddReviewRequest {
    patient: number;
    rating: number;
    comment: string;
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

export const fetchPatientData = async (token: string, taskId: string | undefined): Promise<PatientData> => {
    const response = await axios.get(`https://technlogics.co/api/task/${taskId}`, {
        headers: {
            'Authorization': `Token ${token}`,
        },
    });
    return response.data;
};

export const fetchReviews = async (token: string, nurseId: number): Promise<Review[]> => {
    console.log("🚀 ~ fetchReviews ~ token: string, nurseId: number:", token, nurseId, `https://technlogics.co/api/nurse/${nurseId}/reviews`)
    const response = await axios.get(`https://technlogics.co/api/nurse/${nurseId}/reviews`, {
        headers: {
            'Authorization': `Token ${token}`,
        },
    });
    return response.data;
};

export const sendMessage = async (token: string, messageData: SendMessageRequest): Promise<any> => {
    const response = await axios.post(`https://technlogics.co/api/send-message`, messageData, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const addReview = async (token: string, reviewData: AddReviewRequest): Promise<any> => {
    const response = await axios.post(`https://technlogics.co/api/add-review`, reviewData, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
