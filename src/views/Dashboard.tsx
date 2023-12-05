import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { getGreetingBasedOnTime } from "../utils/date";
import { ErrorMessage } from 'formik';
import Input from "../components/Input";
import * as yup from 'yup';
import Form from "../components/Form";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { fetchCarbonIntensityData } from "../features/nationalCarbonIntensity/nationalCarbonIntensityThunks";
import { fetchUserCarbonIntensityData } from "../features/regionalCarbonIntensity/regionalCarbonIntensityThunks";
import NationalCarbonIntensityCard from "../components/NationalCarbonIntensityCard";
import RegionalCarbonIntensityCard from "../components/RegionalCarbonIntensityCard";

interface FormValues {
  postcode: string;
  date: string;
}

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();
  const nationalCarbonIntensityData = useSelector((state: RootState) => state.nationalCarbonIntensity);
  const regionalCarbonIntensityData = useSelector((state: RootState) => state.regionalCarbonIntensity.data);
  const isNationalCarbonIntensityDataLoading = useSelector((state: RootState) => state.nationalCarbonIntensity.isLoading);
  const isRegionalCarbonIntensityDataLoading = useSelector((state: RootState) => state.regionalCarbonIntensity.isLoading);

  useEffect(() => {
    dispatch(fetchCarbonIntensityData());
  }, [dispatch]);

  if (isNationalCarbonIntensityDataLoading) {
    return <Loading />;
  }


  const onSubmit = async (values: FormValues) => {
    setSelectedDate(new Date(values.date))
    dispatch(fetchUserCarbonIntensityData({ date: values.date, postCode: values.postcode }));
  };

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

  const renderRegionalCarbonIntensity = () => {
    if (isRegionalCarbonIntensityDataLoading) {
      return <Loading message="Fetching Data.." className="h-auto" />;
    }
  
    if (regionalCarbonIntensityData?.data?.data) {
      return (
        <RegionalCarbonIntensityCard
          selectedDate={selectedDate}
          intensityData={regionalCarbonIntensityData.data.data}
        />
      );
    }
  
    return null;
  };

  return (
    <div className="flex flex-col mx-24 mt-12">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{getGreetingBasedOnTime()}, {user?.displayName}!</h1>
        {nationalCarbonIntensityData.data && (
          <div className="ml-auto">
            <NationalCarbonIntensityCard intensityData={nationalCarbonIntensityData.data?.data[0]} />
          </div>
        )}

      </div>
      <Form<FormValues> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {() => (
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
                  disabled={isRegionalCarbonIntensityDataLoading}
                >
                  Submit
                </button>
              </div>
            </div>
            {renderRegionalCarbonIntensity()}
          </>
        )}
      </Form>
    </div>
  );
}

export default Dashboard;
