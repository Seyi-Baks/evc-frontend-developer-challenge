export interface CarbonIntensityResponse {
  data: CarbonIntensityData[];
}
export interface UserCarbonIntensityResponse {
  data: UserCarbonIntensityData;
}

export interface IntensityDetails {
  forecast: number;
  actual?: number;
  index: IntensityIndex;
}

export type IntensityIndex = "low" | "moderate" | "high" | "very high";

export interface GenerationMix {
  fuel: string;
  perc: number;
}

export interface Intensity {
  forecast: number;
  index: string;
}

export interface CarbonIntensityData {
  from: string;
  to: string;
  intensity: IntensityDetails;
  generationmix?: GenerationMix[];
}

export interface UserCarbonIntensityData {
    regionid: number,
    dnoregion: string,
    shortname: string,
    postcode: string,
    data: CarbonIntensityData[]
}