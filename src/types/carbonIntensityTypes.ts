export interface CarbonIntensityResponse {
    data: CarbonIntensityData[];
}

export interface CarbonIntensityData {
    from: string;
    to: string;
    intensity: IntensityDetails;
}

export interface IntensityDetails {
    forecast: number;
    actual: number;
    index: IntensityIndex;
}

export type IntensityIndex = 'low' | 'moderate' | 'high' | 'very high';
