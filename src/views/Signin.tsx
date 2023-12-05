import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleSignIn } from "../features/auth/authThunks";
import { AppDispatch, RootState } from '../redux/store';

const SigninPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const authError = useSelector((state: RootState) => state.auth.error);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        dispatch(googleSignIn());
    };


    useEffect(() => {
        if (user != null) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <>
            <section className="flex justify-center">
                {authError && (
                    <div className="text-red-500 text-center">
                        Error signing in: {authError.message}
                    </div>
                )}
                <div className="md:w-[30%]">
                    <div className={'md:p-10 p-4 mx-auto mt-20'}>
                        <h1 className='text-2xl mb-6 text-center'>Log in to your account</h1>
                        <>
                            <button type="button" onClick={handleGoogleSignIn} className="text-white bg-red-500 w-full hover:bg-red-400 font-bold mt-4 rounded-md text-sm py-3 text-center inline-flex items-center justify-center">
                                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                </svg>
                                Sign in with Google
                            </button>
                        </>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SigninPage;


