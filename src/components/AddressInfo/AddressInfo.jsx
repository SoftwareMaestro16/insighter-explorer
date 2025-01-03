import styles from "./AddressInfo.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { getClosestContractType } from "./helpers/getContractType";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { ContractComponents } from "./ContractTypesComponents/ContractComponent";
import History from "./ContractTypesComponents/Templates/History/History";
import Tokens from "./ContractTypesComponents/Templates/Tokens/Tokens";
import Collectibles from "./ContractTypesComponents/Templates/Collectibles/Collectibles";
import Methods from "./ContractTypesComponents/Templates/Methods/Methods";
import ContractMenu from "./ContractTypesComponents/Templates/ContractMenu/ContractMenu";
import ErrorPage from "./ContractTypesComponents/Templates/Error/ErrorPage";
import Uninit from "./ContractTypesComponents/Templates/Uninit/Uninit";

function AddressInfo() {
    const { address } = useParams();
    const [contractInterface, setContractInterface] = useState("unknown");
    const [contractType, setContractType] = useState("unknown");
    const [contractBalance, setContractBalance] = useState(0);
    const [rawAddress, setRawAddress] = useState("");
    const [status, setStatus] = useState("Nonexist");
    const [walletName, setWalletName] = useState("");
    const [activeTab, setActiveTab] = useState("History");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    useEffect(() => {
        if (!address) {
            setIsError(true);
            return;
        }

        axios
            .get(`https://tonapi.io/v2/accounts/${address}`)
            .then((response) => {
                const balance = response.data.balance / 10 ** 9;
                setContractBalance(balance);

                const parsedRawAddress = response.data.address;
                setRawAddress(parsedRawAddress);

                const parsedStatus = response.data.status;
                setStatus(parsedStatus);

                if (parsedStatus === "nonexist" || parsedStatus === "uninit") {
                    setWalletName(response.data.is_wallet ? "Wallet" : "");
                    setContractInterface([]);
                    setContractType("unknown");
                    setIsError(false);
                    return;
                }

                const name = response.data.name || '';
                setWalletName(name);

                const interfaces = response.data.interfaces || [];
                const processedInterfaces = interfaces.flatMap((iface) =>
                    iface.match(/[a-zA-Z0-9_]+/g)
                );
                setContractInterface(processedInterfaces);

                const type = getClosestContractType(processedInterfaces);
                setContractType(type);

                setIsError(false);

            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsError(true);
            });
    }, [address]);

    if (isError) {
        return (
            <>
                <Header />
                <ErrorPage />
            </>
        );
    }

    const ComponentToRender = contractType !== "unknown" ? ContractComponents[contractType] : null;

    return (
        <>
            <Header />

            {status === "nonexist" && contractBalance === 0 ? (
                <ErrorPage />
            ) : (
                <>
                    <div className={styles.blockInfo}>
                        {status === "uninit" ? (
                            <Uninit 
                                address={address}
                                contractBalance={contractBalance}
                                status={status}
                                rawAddress={rawAddress}
                            />
                        ) : (
                            ComponentToRender && contractInterface.length > 0 && (
                                <ComponentToRender 
                                    address={address}
                                    contractBalance={contractBalance}
                                    contractInterface={contractInterface.join(", ") || undefined}
                                    rawAddress={rawAddress}
                                    status={status}
                                    walletName={walletName || undefined}
                                />
                            )
                        )}
                    </div>

                    <ContractMenu activeTab={activeTab} setActiveTab={setActiveTab} />
                    {activeTab === "History" && <History rawAddress={rawAddress} />}
                    {activeTab === "Tokens" && <Tokens rawAddress={rawAddress} />}
                    {activeTab === "Collectibles" && <Collectibles rawAddress={rawAddress} />}
                    {activeTab === "Methods" && <Methods rawAddress={rawAddress} />}
                </>
            )}
        </>
    );
}

export default AddressInfo;