import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { getCarbonIntensityData, getUserCarbonIntensityData } from "../api";
import { FormikHelpers } from 'formik';
import { CarbonIntensityData } from "../types/carbonIntensityTypes";
import { UserAuth } from "../context/AuthContext";
import { getGreetingBasedOnTime } from "../utils/date";
import CarbonIntensityCard from "../components/CarbonIntensityCard";
import { ErrorMessage } from 'formik';
import Input from "../components/Input";
import * as yup from 'yup';
import Form from "../components/Form";
import { capitalizeFirstLetter } from "../utils/util";

interface FormValues {
  postcode: string;
  date: string;
}

const Dashboard = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [intensityData, setIntensityData] = useState<CarbonIntensityData | null>(null);
  const [userCarbonIntensityData, setUserCarbonIntensityData] = useState<CarbonIntensityData[] | null>(null);

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

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      const response = await getUserCarbonIntensityData(values.date, values.postcode);
      setUserCarbonIntensityData(response.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }

  }

  const validationSchema = yup.object({
    postcode: yup
      .string()
      .required('Postcode is required')
      .max(4)
      .matches(/^[A-Z0-9 ]+$/i, 'Invalid postcode format'),
    date: yup
      .string()
      .required('Date is required')
  });

  const initialValues: FormValues = {
    postcode: "",
    date: ""
  }

  const formattedDate = new Date().toISOString();

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
      <Form<FormValues> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <>
            <div className="flex flex-col md:flex-row items-center space-x-4 mt-9">
              <div className="flex-grow relative">
                <Input label="Post Code" name="postcode" placeholder="Post code e.g. NW11" />
                <ErrorMessage className="absolute text-red-500 text-xs left-0" component="p" name="postcode" />
              </div>
              <div className="flex-grow relative">
                <Input label="Date" name="date" type="datetime-local" min={formattedDate} />
                <ErrorMessage className="absolute text-red-500 text-xs left-0" component="p" name="date" />
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
            <div>
              <p className="font-semibold">Next best available slot: </p>
              {userCarbonIntensityData && userCarbonIntensityData.map(data => (
                <div className="flex items-center space-x-2">
                  <p className="text-gray-500">{capitalizeFirstLetter(data.intensity.index)}</p>
                  <p className="text-gray-500">{data.from}</p>
                  <p className="text-gray-500">{data.to}</p>
                  <p className="text-gray-500">{data.intensity.forecast}</p>
                </div>

              ))}
            </div>
            {isSubmitting && <div> <Loading message="Fetching Data.." className="h-auto" /></div>}
          </>
        )}
      </Form>
    </div>
  );
}

export default Dashboard;
