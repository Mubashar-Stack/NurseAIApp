import axios from 'axios';

export interface User {
    id: number;
    name: string;
    email: string;
    mobile_no: string;
    user_photo: string;
    status: boolean;
    gender: string;
    address: string;
    mrn: string | null;
}

export interface Message {
    id: number;
    message_type: string;
    content: string;
    voice_note: string | null;
    document: string | null;
    photo: string | null;
    created_at: string;
}

export interface ChatRoom {
    id: number;
    first_user: number;
    second_user: number;
    created_at: string;
    other_user: User;
    latest_message: Message;
    read_status: boolean;
    unread_count: number;
}

export interface ChatsResponse {
    status: boolean;
    message: string;
    data: Array<{ chatroom: ChatRoom }>;
}

export interface ChatMessage {
    id: number;
    chatroom: number;
    message_type: string;
    content: string;
    voice_note: string | null;
    document: string | null;
    photo: string | null;
    created_at: string;
    sender: User;
    receiver: User;
    read_by: number[];
    deleted_by: number[];
}

export interface ChatMessagesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        status: boolean;
        message: string;
        data: ChatMessage[];
    };
}

export interface SendMessageRequest {
    receiver_id: number;
    content: string;
    message_type: string;
}

export const fetchChats = async (token: string): Promise<ChatsResponse> => {
    const response = await axios.get('https://technlogics.co/api/chats', {
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
        },
    });
    return response.data;
};

export const fetchChatMessages = async (token: string, chatId: number): Promise<ChatMessagesResponse> => {
    const response = await axios.get(`https://technlogics.co/api/chat/${chatId}`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
        },
    });
    return response.data;
};


export const sendMessage = async (token: string, messageData: SendMessageRequest): Promise<any> => {
    const response = await axios.post('https://technlogics.co/api/send-message', messageData, {
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
        },
    });
    return response.data;
};


export const deleteMessage = async (token: string, messageId: number) => {
    try {
        const response = await axios.post(
            `https://technlogics.co/api/delete/${messageId}`,
            {},
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const markAsUnread = async (token: string, messageId: number) => {
    try {
        const response = await axios.post(
            `https://technlogics.co/api/read/${messageId}`,
            {},
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
