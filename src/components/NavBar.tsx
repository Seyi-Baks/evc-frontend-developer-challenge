import Logo from "../assets/images/evc-logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { logOut } from "../features/auth/authThunks";

const Navbar = () => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleSignOut = async () => {
      try {
        dispatch(logOut());
      } catch (error) {
        console.log(error)
      }
    }
    return (
        <nav className="bg-white p-2">
            <div className="px-8 mx-auto">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <a className="flex-shrink-0" href="/">
                            <img className="w-[6.5rem]" src={Logo} alt="Workflow" />
                        </a>
                    </div>
                   {user?.email ?  <button className="px-8" onClick={handleSignOut}>Logout</button> : ''}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;