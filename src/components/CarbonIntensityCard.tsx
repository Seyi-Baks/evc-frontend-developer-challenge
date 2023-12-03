import LeafIcon from '../assets/icons/svg/LeafIcon';
import { CarbonIntensityData } from '../types/carbonIntensityTypes';
import { capitalizeFirstLetter } from '../utils/util';

type Props = {
  intensityData: CarbonIntensityData;
};

const CarbonIntensityCard = ({ intensityData }: Props) => {
  console.log("INTENSITY DATA ", intensityData)
  const index = intensityData.intensity.index;
  let arrowColor = '';
  let arrowDirection = '';

  if (index === 'low') {
    arrowColor = 'text-green-600';
    arrowDirection = 'rotate-180'; 
  } else if (index === 'high') {
    arrowColor = 'text-red-600';
  } else if (index === 'moderate') {
    arrowColor = 'text-orange-600'; 
  }

  return (
    <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      <div className="flex items-center mb-2">
        <LeafIcon />
        <span className="text-sm font-semibold text-gray-700 ml-2">National Carbon Intensity</span>
      </div>
      <div className="flex items-center justify-center">
        { index !== 'moderate' && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`h-6 w-6 mr-2 ${arrowColor} ${arrowDirection}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        )}
        <div className={`text-4xl ${arrowColor} font-bold mb-1`}>
          {intensityData.intensity.actual ?? capitalizeFirstLetter(intensityData.intensity.index)}
          <span className='text-sm ml-2'>gCO<sub>2</sub>/kWh</span>
        </div>
      </div>
      {index !== 'low' && index !== 'moderate' ? (
        <div className="text-sm text-gray-600 text-center mt-2 mx-4">High CO2 emissions. Avoid charging during these periods if possible.</div>
      ) : (
        <div className="text-sm text-gray-600 text-center mt-2 mx-4">Low to moderate CO2 emissions. More environmentally friendly for charging.</div>
      )}
      <p className='text-gray-400 text-[0.7rem] italic font-medium mt-2'>updates every 30 minutes</p>
    </div>
  );
};

export default CarbonIntensityCard;
