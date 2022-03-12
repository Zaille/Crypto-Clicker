import logo from '../images/logo.png'
import {useContext} from "react";
import {Context} from "../context/Context";
import {shortenAddress} from "../utils/shortenAddress";

const NavbarItem = ({name}) => {
    const {switchComponent} = useContext(Context);

    return (
        <a name={name.toLowerCase()} onClick={switchComponent}
           className="text-base font-bold text-white hover:text-primary-300 cursor-pointer">
            {name}
        </a>
    )
};

const Navbar = () => {
    const {connectWallet, currentAccount, switchComponent} = useContext(Context);

    return (
        <div className="relative bg-secondary-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div
                    className="flex justify-between items-center border-b-2 border-primary-300 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span className="sr-only">Workflow</span>
                            <img name="welcome" onClick={switchComponent} className="h-8 w-auto sm:h-10" src={logo} alt="logo"/>
                        </a>
                    </div>
                    {currentAccount !== undefined && (
                        <nav className="hidden md:flex space-x-10">
                            {["Clicker", "Dashboard", "Collection", "Shop"].map((item, index) => (
                                <NavbarItem key={item + index} name={item}/>
                            ))}
                        </nav>
                    )}
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        {currentAccount === undefined ? (
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-primary-300 rounded-md shadow-sm text-base font-bold text-primary-300 bg-secondary-900 hover:bg-primary-300 hover:text-secondary-900"
                                    onClick={connectWallet}>
                                Play
                            </button>
                        ) : (
                            <p className="text-white">{ shortenAddress(currentAccount) }</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;