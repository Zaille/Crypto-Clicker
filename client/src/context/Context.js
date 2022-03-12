import React, {useEffect, useState} from "react";
import Web3 from 'web3';
import {Clicker, Dashboard, Collection, Shop, Welcome} from "../components";

export const Context = React.createContext(undefined, undefined);

export const ContextProvider = ({children}) => {
    const components = {
        clicker : <Clicker />,
        dashboard : <Dashboard />,
        collection : <Collection />,
        shop : <Shop />,
        welcome : <Welcome />
    }

    const [currentAccount, setCurrentAccount] = useState(undefined);
    const [bodyComponent, setBodyComponent] = useState(<Welcome />);
    const [showPopup, setShowPopup] = useState(false);

    const switchComponent = (e) => { setBodyComponent(components[e.target.name]); }
    const closePopup = () => { setShowPopup(false); }

    const loadWeb3 = async () => {
        if (window.ethereum) {
            console.log("la");
            window.Web3 = new Web3(window.ethereum);
        } else if (window.Web3) {
            console.log("ici");
            window.Web3 = new Web3(window.Web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying Metamask!');
        }

        const web3 = window.Web3;
        const accounts = await web3.eth.getAccounts();
        if(accounts.length) setCurrentAccount(accounts[0]);

        window.ethereum.on('accountsChanged', (accounts) => {
            if( !showPopup ) closePopup();
            loadBlockChainData(accounts);
        });
    }

    const loadBlockChainData = async (accounts) => {
        const web3 = window.Web3;

        // Load account
        setCurrentAccount(accounts[0]);

        /*if(accounts.length) {
            // Network ID
            const networkId = await web3.eth.net.getId();
            const networkData = SocialNetwork.networks[networkId];
            if (networkData) {
                const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address);
                this.setState({socialNetwork});
                const postCount = await socialNetwork.methods.postCount().call();
                this.setState({postCount});
                // Load posts
                for (let i = 0; i <= postCount; i++) {
                    const post = await socialNetwork.methods.posts(i).call();
                    this.setState({
                        posts: [...this.state.posts, post]
                    });
                }

                // Set loading to false
                this.setState({loading: false});
            } else {
                window.alert('SocialNetwork contract not deployed to detected network.');
            }
        }*/
    }

    const connectWallet = async () => {
        setShowPopup(true);
        await window.ethereum.enable();
    }

    useEffect(() => {
        loadWeb3();
    }, []);

    return (
        <Context.Provider value={{switchComponent, connectWallet, bodyComponent, currentAccount, showPopup, closePopup }}>
            {children}
        </Context.Provider>
    )
}