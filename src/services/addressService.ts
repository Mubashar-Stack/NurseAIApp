import axios from 'axios';
import { Address, AddressFormData } from '../types/address';

const BASE_URL = 'https://technlogics.co/api';

export const addressService = {
    getAddresses: async (token: string) => {
        const response = await axios.get(`${BASE_URL}/addresses`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data;
    },

    addAddress: async (token: string, data: AddressFormData) => {
        const response = await axios.post(`${BASE_URL}/addresses/add`, data, {
            headers: {
                Authorization: `Token ${token}`,
                Accept: 'application/json'
            }
        });
        return response.data;
    },

    updateAddress: async (token: string, id: number, data: Partial<AddressFormData>) => {
        const response = await axios.patch(`${BASE_URL}/addresses/update/${id}`, data, {
            headers: {
                Authorization: `Token ${token}`,
                Accept: 'application/json'
            }
        });
        return response.data;
    },

    deleteAddress: async (token: string, id: number) => {
        const response = await axios.delete(`${BASE_URL}/addresses/delete/${id}`, {
            headers: {
                Authorization: `Token ${token}`,
                Accept: 'application/json'
            }
        });
        return response.data;
    }
};