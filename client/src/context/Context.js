import React, {useEffect, useState} from "react";
import Web3 from 'web3';
import {Clicker, Dashboard, Collection, Shop, Welcome} from "../components";
import Profiles from '../abis/Profiles.json'

export const Context = React.createContext(undefined, undefined);

export const ContextProvider = ({children}) => {
    const components = {
        clicker: <Clicker/>,
        dashboard: <Dashboard/>,
        collection: <Collection/>,
        shop: <Shop/>,
        welcome: <Welcome/>
    }

    const [currentAccount, setCurrentAccount] = useState(undefined);
    const [currentAmount, setCurrentAmount] = useState(undefined);
    const [currentContract, setCurrentContract] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [bodyComponent, setBodyComponent] = useState(<Welcome/>);
    const [showPopup, setShowPopup] = useState(false);

    const switchComponent = (e) => {
        setBodyComponent(components[e.target.name]);
    }
    const closePopup = () => {
        setShowPopup(false);
    }

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.Web3 = new Web3(window.ethereum);
        } else if (window.Web3) {
            window.Web3 = new Web3(window.Web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying Metamask!');
        }

        const web3 = window.Web3;
        const accounts = await web3.eth.getAccounts();
        if (accounts.length) {
            loadBlockChainData(accounts)
        }

        window.ethereum.on('accountsChanged', (accounts) => {
            if (!showPopup) closePopup();
            loadBlockChainData(accounts);
        });
    }

    const loadBlockChainData = async (accounts) => {
        const web3 = window.Web3;

        setCurrentAccount(accounts[0]);

        if (accounts.length) {
            const networkId = await web3.eth.net.getId();
            const networkData = Profiles.networks[networkId];
            if (networkData) {
                const profiles = new web3.eth.Contract(Profiles.abi, networkData.address);
                setCurrentContract(profiles);
                let profile;
                if (await profiles.methods.checkProfile().call({from: accounts[0]})) {
                    profile = await profiles.methods.profileMap(accounts[0])
                        .call();
                } else { // TODO : Create Component to create a new profile
                    const res = await profiles.methods.createProfile()
                        .send({from: accounts[0]});
                    profile = res.events.NewProfile.returnValues['profile'];
                }
                setCurrentUser(profile);
                setCurrentAmount(0);
            } else {
                window.alert('SocialNetwork contract not deployed to detected network.');
            }
        }
    }

    const connectWallet = async () => {
        setShowPopup(true);
        await window.ethereum.enable();
    }

    useEffect(() => {
        loadWeb3();
    }, []);

    return (
        <Context.Provider
            value={{switchComponent, connectWallet, bodyComponent, currentContract, currentAccount, currentUser,
                setCurrentUser, currentAmount, setCurrentAmount, showPopup, closePopup}}>
            {children}
        </Context.Provider>
    )
}