import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { extractTimeFromISOString, getGreetingBasedOnTime } from "../utils/date";
import CarbonIntensityCard from "../components/CarbonIntensityCard";
import { ErrorMessage } from 'formik';
import Input from "../components/Input";
import * as yup from 'yup';
import Form from "../components/Form";
import LeafIcon from "../assets/icons/svg/LeafIcon";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { fetchCarbonIntensityData } from "../features/national-carbon-intensity/carbon-intensityThunks";
import { selectFirstModerateIntensitySlot } from "../features/user-carbon-intensity/user-carbon-intensitySlice";
import { fetchUserCarbonIntensityData } from "../features/user-carbon-intensity/user-carbon-intensityThunks";

interface FormValues {
  postcode: string;
  date: string;
}

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch: AppDispatch = useDispatch();
  const carbonIntensityData = useSelector((state: RootState) => state.carbonIntensity);
  const userCarbonIntensityData = useSelector((state: RootState) => selectFirstModerateIntensitySlot(state, selectedDate!));
  const isCarbonIntensityDataLoading = useSelector((state: RootState) => state.carbonIntensity.isLoading);
  const isUserCarbonIntensityDataLoading = useSelector((state: RootState) => state.userCarbonIntensity.isLoading);

  useEffect(() => {
    dispatch(fetchCarbonIntensityData());
  }, [dispatch]);

  if (isCarbonIntensityDataLoading) {
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

  return (
    <div className="flex flex-col mx-24 mt-12">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{getGreetingBasedOnTime()}, {user?.displayName}!</h1>
        {carbonIntensityData.nationalData && (
          <div className="ml-auto">
            <CarbonIntensityCard intensityData={carbonIntensityData.nationalData?.data[0]} />
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
                  disabled={isUserCarbonIntensityDataLoading}
                >
                  Submit
                </button>
              </div>
            </div>
            <div>
              {userCarbonIntensityData && (
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
                        {userCarbonIntensityData.intensity.forecast}
                        <span className='text-sm ml-2'>gCO<sub>2</sub>/kWh</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 text-center mt-2 mx-4">Charging your EV during these times would result in a lower carbon footprint.</div>
                    <div className="flex justify-between px-4 mt-2 text-gray-400 font-semibold text-sm space-x-4">
                      <p>From: {extractTimeFromISOString(userCarbonIntensityData.from)}</p>
                      <p>To: {extractTimeFromISOString(userCarbonIntensityData.to)}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            {isUserCarbonIntensityDataLoading && <div> <Loading message="Fetching Data.." className="h-auto" /></div>}
          </>
        )}
      </Form>
    </div>
  );
}

export default Dashboard;
