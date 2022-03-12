import coin from '../images/bitcoin.png'

const Clicker = () => {
    return (
        <div>
            <div>
                <p>0.000000001 BTC</p>
            </div>
            <div>
                <img className="h-64 w-64" src={coin} alt="coin" />
            </div>
        </div>
    );
}

export default Clicker;