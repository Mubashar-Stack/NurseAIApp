export interface CreditCard {
    id?: number;
    user?: number;
    cardholder_name: string;
    card_number: string;
    expiration_month: number;
    expiration_year: number;
    card_type: string;
    token: string;
    is_default: boolean;
    created_at?: string;
}

export interface CreditCardFormData {
    cardholder_name: string;
    card_number: string;
    expiration_month: number | null;
    expiration_year: number | null;
    card_type: string;
    token: string;
    is_default: boolean;
}

