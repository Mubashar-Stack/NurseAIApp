import { FavoriteHospital } from '..//types/hospital';
import axios from 'axios';

const BASE_URL = 'https://technlogics.co/api';

export const hospitalService = {
    getRecommendedHospitals: async (token: string): Promise<any[]> => {
        const response = await axios.get(`${BASE_URL}/hospitals/recommended`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    },

    getFavoriteHospitals: async (token: string): Promise<FavoriteHospital[]> => {
        const response = await axios.get(`${BASE_URL}/hospitals/favorites`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    },

    toggleFavorite: async (token: string, hospitalId: number): Promise<void> => {
        await axios.post(
            `${BASE_URL}/hospitals/favorites/toggle`,
            { hospital_id: hospitalId },
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    },

    getHospitals: async (token: string): Promise<any[]> => {
        const response = await axios.get(`${BASE_URL}/hospitals`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    },

    getCurrentHospitals: async (token: string): Promise<any[]> => {
        const response = await axios.get(`${BASE_URL}/hospitals/current`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    },

    getHistoricalHospitals: async (token: string): Promise<any[]> => {
        const response = await axios.get(`${BASE_URL}/bookings?status=completed`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    },

    getSpecialties: async (token: string): Promise<any> => {
        const response = await axios.get(`${BASE_URL}/specialities`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    },

    createBooking: async (token: string, userId: number, hospitalId: number, specialityId: number, bookingDate: string): Promise<any> => {
        const response = await axios.post(`${BASE_URL}/bookings`, {
            user: userId,
            hospital: hospitalId,
            speciality: specialityId,
            booking_date: bookingDate
        }, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    getBookings: async (token: string): Promise<any> => {
        const response = await axios.get(`${BASE_URL}/bookings`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    },


};

