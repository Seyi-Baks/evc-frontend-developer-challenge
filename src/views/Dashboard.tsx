import React, { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { getCarbonIntensityData } from "../api";
import { CarbonIntensityData } from "../types/carbonIntensityTypes";
import { UserAuth } from "../context/AuthContext";
import { getGreetingBasedOnTime } from "../utils/date";
import CarbonIntensityCard from "../components/CarbonIntensityCard";

const Dashboard = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [intensityData, setIntensityData] = useState<CarbonIntensityData | null>(null);

  useEffect(() => {
    const fetchCarbonIntensityData = async () => {
      const response = await getCarbonIntensityData();
      setIntensityData(response.data[0] as CarbonIntensityData);
      setLoading(false);
    }

    fetchCarbonIntensityData();
  }, [])

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col mx-24 mt-12">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{getGreetingBasedOnTime()}, {user?.displayName}!</h1>
        {intensityData && (
          <div className="ml-auto">
            <CarbonIntensityCard intensityData={intensityData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
