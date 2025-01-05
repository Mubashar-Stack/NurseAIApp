export interface WalletResponse {
    status: boolean;
    message: string;
    data: WalletData[];
}

export interface WalletData {
    id: number;
    user: number;
    transaction_type: string;
    amount: string;
    balance_after_transaction: string;
    transaction_date: string;
    transaction_id: string;
    created_by: number;
    created_at: string;
}

export interface TransactionResponse {
    status: boolean;
    message: string;
    data: TransactionData[];
}

export interface TransactionData {
    id: number;
    payment_type: string;
    payment_id: string;
    amount: string;
    transaction_date: string;
    is_active: boolean;
    created_at: string;
    user: number;
    booking: number;
    created_by: number | null;
}

