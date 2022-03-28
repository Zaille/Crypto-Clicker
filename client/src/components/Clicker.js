import coin from '../images/bitcoin.png'
import {useContext} from "react";
import {Context} from "../context/Context";

const Clicker = () => {

    const {currentUser, currentAmount, setCurrentAmount, currentContract, currentAccount, setCurrentUser} = useContext(Context);

    const click = async () => {
        setCurrentAmount(currentAmount + parseInt(currentUser.earnClick));
    }

    return (
        <div>
            <div>
                <p>{currentAmount} BTC</p>
            </div>
            <div>
                <img className="h-64 w-64" src={coin} onClick={click} alt="coin" />
            </div>
        </div>
    );
}

export default Clicker;