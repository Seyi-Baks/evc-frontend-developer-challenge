import { CarbonIntensityData } from '../types/carbonIntensityTypes';

type Props = {
  intensityData: CarbonIntensityData;
};

const CarbonIntensityCard = ({ intensityData }: Props) => {
  const { forecast, actual, index } = intensityData.intensity;
  const indexColor = index === 'low' ? 'text-green-600' :'text-red-600'; 

  return (
    <div className={`max-w-sm rounded overflow-hidden shadow-lg p-5 m-5 bg-white`}>
      <div className="font-bold text-xl mb-2 text-gray-700">Current National Carbon Intensity</div>
      <div className='flex justify-end items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`h-6 w-6 ${indexColor}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>

        <div className={`text-5xl ${indexColor} font-bold mb-1 ml-2`}>{actual}</div>
      </div>
      <p className="text-gray-400 font-medium text-base text-right">Forecast: {forecast} gCO<sub>2</sub>/kWh</p>
    </div>
  );
};

export default CarbonIntensityCard;
