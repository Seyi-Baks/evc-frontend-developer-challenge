import Logo from "../assets/images/evc-logo.png";

const Navbar = () => {
    return (
        <nav className="bg-white p-2">
            <div className="px-8 mx-auto">
                <div className="flex items-center h-16">
                    <div className=" flex items-center">
                        <a className="flex-shrink-0" href="/">
                            <img className="w-[6.5rem]" src={Logo} alt="Workflow" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;