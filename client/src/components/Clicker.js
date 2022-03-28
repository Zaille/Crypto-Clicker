import coin from '../images/bitcoin.png'
import {useContext} from "react";
import {Context} from "../context/Context";

const Clicker = () => {

    const {currentUser, currentContract, currentAccount, setCurrentUser} = useContext(Context);

    const click = async () => {
        const res = await currentContract.methods.click().send({from: currentAccount});
        setCurrentUser(res.events.NewProfile.returnValues['profile']);
    }

    return (
        <div>
            <div>
                <p>{currentUser.amount} BTC</p>
            </div>
            <div>
                <img className="h-64 w-64" src={coin} onClick={click} alt="coin" />
            </div>
        </div>
    );
}

export default Clicker;