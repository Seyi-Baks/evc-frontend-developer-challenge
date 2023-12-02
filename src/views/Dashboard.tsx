import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { getCarbonIntensityData } from "../api";
import { CarbonIntensityData } from "../types/carbonIntensityTypes";
import { UserAuth } from "../context/AuthContext";
import { getGreetingBasedOnTime } from "../utils/date";
import CarbonIntensityCard from "../components/CarbonIntensityCard";
import { ErrorMessage } from 'formik';
import Input from "../components/Input";
import * as yup from 'yup';
import Form from "../components/Form";

interface FormValues {
  postcode: string;
  date: string;
}

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

  const validationSchema = yup.object({
    postcode: yup
      .string()
      .required('Postcode is required')
      .matches(/^[A-Z0-9 ]+$/i, 'Invalid postcode format'),
    date: yup
      .string()
      .required('Date is required')
  });

  const initialValues: FormValues = {
    postcode: "",
    date: ""
  }

  const formattedDate = new Date().toISOString().split('T')[0];

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
      <Form<FormValues> initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => { }}>
        {({ isSubmitting, errors, touched }) => (
          <div className="flex flex-col md:flex-row items-center space-x-4 mt-9">
            <div className="flex-grow relative">
              <Input label="Post Code" name="postcode" placeholder="Post code e.g. NW11 2WR" />
              <ErrorMessage  className="absolute text-red-500 text-xs left-0" component="p" name="postcode" />
            </div>
            <div className="flex-grow relative">
              <Input label="Date" name="date" type="date" min={formattedDate} />
              <ErrorMessage  className="absolute text-red-500 text-xs left-0" component="p" name="date" />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Dashboard;
