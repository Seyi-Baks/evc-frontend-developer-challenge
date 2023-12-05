import { useState, useEffect } from 'react';
import LeafIcon from '../assets/icons/svg/LeafIcon';
import { CarbonIntensityData } from '../types/carbonIntensityTypes';
import { extractTimeFromISOString } from '../utils/date';
import Loading from './Loading';

type Props = {
    intensityData: CarbonIntensityData[];
    selectedDate: Date;
};

const RegionalCarbonIntensityCard = ({ intensityData, selectedDate }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [regionalCarbonIntensityData, setregionalCarbonIntensityData] = useState<CarbonIntensityData>();

    useEffect(() => {
        const foundData = intensityData.find(slot => {
            const toDate = new Date(slot.to);
            return slot.intensity.index === "moderate" && toDate > selectedDate;
        });

        setregionalCarbonIntensityData(prevData => {
            if (prevData === foundData) return prevData;
            return foundData;
        });

        setIsLoading(false);
    }, [intensityData, selectedDate]);

    if (isLoading) {
        return <Loading message="Fetching Data.." className="h-auto" />;
    }

    return (
        <>
            <p className="font-semibold">Next best available slot: </p>
            <div className="mx-auto bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
                <div className="flex items-center mb-1">
                    <LeafIcon />
                    <span className="text-sm font-semibold text-gray-700 ml-2">Carbon Intensity</span>
                </div>
                <p className="text-sm mb-2 text-orange-600 text-bold">Moderate </p>
                <div className="flex items-center justify-center">
                    <div className={`text-4xl text-orange-600 font-bold mb-1`}>
                        {regionalCarbonIntensityData?.intensity.forecast}
                        <span className='text-sm ml-2'>gCO<sub>2</sub>/kWh</span>
                    </div>
                </div>
                <div className="text-sm text-gray-600 text-center mt-2 mx-4">Charging your EV during these times would result in a lower carbon footprint.</div>
                <div className="flex justify-between px-4 mt-2 text-gray-400 font-semibold text-sm space-x-4">
                    <p>From: {extractTimeFromISOString(regionalCarbonIntensityData?.from!)}</p>
                    <p>To: {extractTimeFromISOString(regionalCarbonIntensityData?.to!)}</p>
                </div>
            </div>
        </>
    );
};

export default RegionalCarbonIntensityCard;
