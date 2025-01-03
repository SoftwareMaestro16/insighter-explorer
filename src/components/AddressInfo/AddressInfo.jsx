import styles from "./AddressInfo.module.scss";
import { useParams } from "react-router-dom";
import { getClosestContractType } from "./helpers/getContractType";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { ContractComponents } from "./ContractTypesComponents/ContractComponent";
import { use } from "react";
import History from "./ContractTypesComponents/Templates/History/History";
import Tokens from "./ContractTypesComponents/Templates/Tokens/Tokens";
import Collectibles from "./ContractTypesComponents/Templates/Collectibles/Collectibles";
import Methods from "./ContractTypesComponents/Templates/Methods/Methods";
import ContractMenu from "./ContractTypesComponents/Templates/ContractMenu/ContractMenu";

function AddressInfo() {
    const { address } = useParams();
    const [contractInterface, setContractInterface] = useState([]);
    const [contractType, setContractType] = useState("unknown");
    const [contractBalance, setContractBalance] = useState(0);
    const [rawAddress, setRawAddress] = useState('0:00a...bc000');
    const [status, setStatus] = useState('Nonexist');
    const [walletName, setWalletName] = useState('');
    const [activeTab, setActiveTab] = useState("History"); 


    useEffect(() => {
        if (!address) return;

        axios
            .get(`https://tonapi.io/v2/accounts/${address}`)
            .then((response) => {
                const balance = response.data.balance / 10**9;
                setContractBalance(balance);

                const parsedRawAddress = response.data.address;
                setRawAddress(parsedRawAddress);

                const parsedStatus = response.data.status;
                setStatus(parsedStatus);

                const name = response.data.name || '';
                setWalletName(name);

                const interfaces = response.data.interfaces || [];
                
                const processedInterfaces = interfaces.flatMap((iface) =>
                    iface.match(/[a-zA-Z0-9_]+/g)
                );
                setContractInterface(processedInterfaces);

                const type = getClosestContractType(processedInterfaces);
                setContractType(type);

            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setContractType("unknown"); 
            });
    }, [address]);

    const ComponentToRender = contractType !== "unknown" ? ContractComponents[contractType] : null;
    
    return (
        <>
            <Header />

            <div className={styles.blockInfo}>
                {ComponentToRender && contractInterface.length > 0 && (
                    <ComponentToRender 
                        address={address}
                        contractBalance={contractBalance}
                        contractInterface={contractInterface.join(", ")}
                        rawAddress={rawAddress}
                        status={status}
                        walletName={walletName || undefined}
                    />
                )}
            </div>

            <ContractMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "History" && <History rawAddress={rawAddress} />}
            {activeTab === "Tokens" && <Tokens rawAddress={rawAddress} />}
            {activeTab === "Collectibles" && <Collectibles rawAddress={rawAddress} />}
            {activeTab === "Methods" && <Methods rawAddress={rawAddress} />}
        </>
    );
}

export default AddressInfo;