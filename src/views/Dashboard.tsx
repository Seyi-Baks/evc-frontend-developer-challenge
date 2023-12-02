import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { getCarbonIntensityData } from "../api";
import { CarbonIntensityData } from "../types/carbonIntensityTypes";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [intensityData, setIntensityData] = useState<CarbonIntensityData[] | null>(null);


  useEffect(() => {
    const fetchCarbonIntensityData = async () => {
      const { data } = await getCarbonIntensityData();
      setIntensityData(data);
      setLoading(false);
    }

    fetchCarbonIntensityData();
  }, [])

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>Dashboard</div>
      {intensityData && intensityData.map((item, index) => (
        <div key={index}>
            <p>From: {item.from}</p>
            <p>To: {item.to}</p>
            <p>Forecast: {item.intensity.forecast}</p>
            <p>Actual: {item.intensity.actual}</p>
            <p>Index: {item.intensity.index}</p>
        </div>
      ))}
    </>
  )
}

export default Dashboard