import axios from 'axios';
import { CreditCard, CreditCardFormData } from '../types/credit-card';

const BASE_URL = 'https://technlogics.co/api';

export const creditCardService = {
    getCreditCards: async (token: string) => {
        const response = await axios.get(`${BASE_URL}/credit-cards`, {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json'
            }
        });
        return response.data;
    },

    addCreditCard: async (token: string, data: CreditCardFormData) => {
        const response = await axios.post(`${BASE_URL}/credit-cards/add`, data, {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json'
            }
        });
        return response.data;
    },

    updateCreditCard: async (token: string, id: number, data: CreditCardFormData) => {
        const response = await axios.patch(`${BASE_URL}/credit-cards/update/${id}`, data, {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json'
            }
        });
        return response.data;
    },

    deleteCreditCard: async (token: string, id: number) => {
        const response = await axios.delete(`${BASE_URL}/credit-cards/delete/${id}`, {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json'
            }
        });
        return response.data;
    }
};

