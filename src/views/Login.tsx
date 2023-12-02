import { useEffect } from 'react';
import Input from '../components/Input';
import Navbar from '../components/NavBar';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"

const handleGoogleSignIn = () => {
    try {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    } catch (error) {
        console.log(error);
    }
}

const LoginPage = () => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                // User is signed in
                // Navigate to home or dashboard page, or set user state
                console.log('User signed in: ', user);
            } else {
                // User is signed out
                // Handle accordingly, maybe stay on the login page or show message
                console.log('User is signed out');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    
    return (
        <>
            <Navbar />
            <section className="flex justify-center">
                <div className="md:w-[30%]">
                    <div className={'md:p-10 p-4 mx-auto mt-20'}>
                        <h1 className='text-2xl mb-6 text-center'>Log in to your account</h1>
                        <form>
                            <>
                                <Input label="Email" name="email" placeholder='Email address' />
                                <Input label="Password" type='password' placeholder='Password' name="password" />


                                <div className="mt-8 items-center">
                                    <button
                                        type="submit"
                                        className={`rounded-md bg-green-500 w-full font-bold text-white py-3 text-center hover:bg-green-400 mb-4 hover:text-white text-sm`}
                                    > Log in
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink mx-4 text-gray-500">or</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                                <button type="button" onClick={handleGoogleSignIn} className="text-white bg-red-500 w-full hover:bg-red-400 font-bold mt-4 rounded-md text-sm py-3 text-center inline-flex items-center justify-center">
                                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                        <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                                    </svg>
                                    Sign in with Google
                                </button>
                            </>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage;


