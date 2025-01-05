

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

export interface FavoriteHospital {
    id: number;
    user: number;
    hospital: Hospital;
    created_at: string;
}
