import Input from '../components/Input';
import Navbar from '../components/NavBar';

const LoginPage = () => {
    return (
        <>
                        <Navbar />
            <section className="flex justify-center">
                <div className="md:w-[25%]">
                    <div className={'md:p-10 p-4 mx-auto mt-20'}>
                        <h1 className='text-2xl mb-6 text-center'>Log in to your account</h1>
                        <form>
                            <>
                                <Input label="Email" name="email" placeholder='Email address' />
                                <Input label="Password" type='password' placeholder='Password' name="password" />


                                <div className="mt-8 items-center gap-8">
                                    <button
                                        type="submit"
                                        className={`rounded-md bg-green-500 w-full font-bold text-white py-3 text-center hover:bg-pink-500 mb-6 hover:text-white text-sm`}
                                    > Log in
                                    </button>
                                </div>
                            </>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}

export default LoginPage;


