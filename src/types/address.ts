export interface Address {
    id?: number;
    user?: number;
    title: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface AddressFormData {
    title: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}