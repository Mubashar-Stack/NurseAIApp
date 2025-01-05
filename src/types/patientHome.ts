import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export interface Address {
    id: number;
    title: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}

export interface UserProfile {
    user_id: number;
    email: string;
    user_photo: string | null;
    role: string;
    name: string;
}

export interface Hospital {
    id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    photo: string | null;
    rating: number;
    is_active: boolean;
    created_at: string;
    description: string;
}

