import {useContext} from "react";
import {Context} from "../context/Context";

const Clicker = () => {

    const {currentUser, currentAmount, setCurrentAmount, setCurrentUser, currentContract, currentAccount} = useContext(Context);

    const claim = async () => { // TODO: Check security
        const res = await currentContract.methods.addAmount(currentAmount)
            .send({from: currentAccount});
        setCurrentAmount(0);
        setCurrentUser(res.events.NewProfile.returnValues['profile']);
    }

    return (
        <div>
            <div>
                <p>Owned : {currentUser.amount} BTC</p>
                <p>Mined : {currentAmount} BTC</p>
                <button onClick={claim}>Claim</button>
            </div>
        </div>
    );
}

export default Clicker;