import {useContext} from "react";
import {Context} from "../context/Context";
import logo from "../images/logo.png";

const Popup = () => {
    const { closePopup } = useContext(Context);

    return (
        <div onClick={closePopup} className="absolute h-full w-full flex justify-center items-center z-40">
            <div className="relative bg-primary-800 rounded z-50 px-3.5">
                <div className="flex justify-end">
                    <span onClick={closePopup} className="text-4xl text-white cursor-pointer ">&times;</span>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <img className="h-8 w-auto my-5" src={logo} alt="logo" />
                    <span className="text-white font-bold my-2">Unlock Wallet</span>
                    <p className="text-white mb-5">Open your Metamask extension to connect.</p>
                </div>
            </div>
        </div>
    );
}

export default Popup;