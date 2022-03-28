import { Navbar, Popup, Footer } from "./components";
import { Context } from "./context/Context";
import { useContext } from "react";

function App() {
    const { bodyComponent, showPopup } = useContext(Context);

    return (
        <div>
            { showPopup && <Popup /> }
            <div className={`z-0${ showPopup ? " blur-md" : ""}`}>
                <Navbar />
                { bodyComponent }
                {/*<Footer />*/}
            </div>
        </div>
    );
}

export default App;
