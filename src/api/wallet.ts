import axios from 'axios';
import { WalletResponse, TransactionResponse } from '../types/wallet';

const BASE_URL = 'https://technlogics.co/api';

export const walletService = {
    getWalletBalance: async (token: string): Promise<WalletResponse> => {
        const response = await axios.get(`${BASE_URL}/wallet`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    },

    getTransactions: async (token: string): Promise<TransactionResponse> => {
        const response = await axios.get(`${BASE_URL}/transactions`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    }
};

