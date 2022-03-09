import logo from '../images/logo.png'
import { Popover } from '@headlessui/react'

const NavbarItem = ({title}) => {
    return (
        <a href="#" className="text-base font-bold text-white hover:text-primary-300">
            {title}
        </a>
    )
};

const Navbar = () => {
    return (
        <Popover className="relative bg-secondary-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div
                    className="flex justify-between items-center border-b-2 border-primary-300 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span className="sr-only">Workflow</span>
                            <img className="h-8 w-auto sm:h-10" src={logo} alt="logo"/>
                        </a>
                    </div>
                    <Popover.Group as="nav"  className="hidden md:flex space-x-10">
                        {["Clicker", "Dashboard", "Collection", "Shop"].map((item, index) => (
                            <NavbarItem key={item + index} title={item}/>
                        ))}
                    </Popover.Group>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <a href="#"
                           className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-primary-300 rounded-md shadow-sm text-base font-bold text-primary-300 bg-secondary-900 hover:bg-primary-300 hover:text-secondary-900">
                            Play
                        </a>
                    </div>
                </div>
            </div>
        </Popover>
    );
}

export default Navbar;