import Logo from "../assets/images/evc-logo.png";
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logOut } = UserAuth();

    const handleSignOut = async () => {
      try {
        await logOut()
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