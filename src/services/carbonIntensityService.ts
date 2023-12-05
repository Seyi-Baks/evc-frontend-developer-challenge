import axios from 'axios';
import { CarbonIntensityResponse, RegionalCarbonIntensityResponse } from '../types/carbonIntensityTypes';

const API_BASE_URL = 'https://api.carbonintensity.org.uk';

export const getCarbonIntensityData = async (): Promise<CarbonIntensityResponse> => {
    try {
        const response = await axios.get<CarbonIntensityResponse>(`${API_BASE_URL}/intensity`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export const getUserCarbonIntensityData = async (date: string, postCode: string): Promise<RegionalCarbonIntensityResponse> => {
    try {
        const response = await axios.get<RegionalCarbonIntensityResponse>(`${API_BASE_URL}/regional/intensity/${date}Z/fw24h/postcode/${postCode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}