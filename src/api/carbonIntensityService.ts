import axios from 'axios';
import { CarbonIntensityResponse } from '../types/carbonIntensityTypes';

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