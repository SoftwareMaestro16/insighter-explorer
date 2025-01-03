import styles from "./History.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { toUserFriendlyAddress } from "@tonconnect/ui-react";
import CopyButton from "../../../../CopyButton/CopyButton";

function History({ rawAddress }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!rawAddress) return;

        axios
            .get(`https://tonapi.io/v2/accounts/${rawAddress}/events?limit=25`)
            .then((response) => setHistory(response.data.events))
            .catch((error) => console.error("Error fetching data:", error));
    }, [rawAddress]);

    if (!history) {
        return (
            <h3>History is Emppy.</h3>
        );
    }

    const formatAddress = (address) =>
        `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;

    const formatNumber = (number) => {
        if (number > 0) {
            const truncated = Math.trunc(number * 100) / 100;
            const formatted = truncated.toFixed(2);
            return formatted.endsWith(".00") ? parseInt(formatted, 10) : formatted;
        }
        return number;
    };

    const renderActionDetails = (action, timestamp) => {
        const { type, simple_preview } = action;

        if (type === "JettonSwap" && simple_preview.accounts?.length > 0) {
            const account = simple_preview.accounts[0];
            const isAmountOut = action.JettonSwap.amount_out;

            return (
                <div className={styles.block}>
                    <h3 className={styles.time}>{new Date(timestamp * 1000).toLocaleString()}</h3>
                
                    <h3 className={styles.address}>
                        {formatAddress(toUserFriendlyAddress(account.address))}
                        <CopyButton textToCopy={toUserFriendlyAddress(account.address)} />
                    </h3>
                    <h3 className={styles.value}>
                        {isAmountOut
                            ? `TON ${formatNumber(action.JettonSwap.ton_in / 10 ** 9)} > ${
                                  formatNumber(
                                      action.JettonSwap.amount_out /
                                      (action.JettonSwap.jetton_master_out?.decimals
                                          ? 10 ** action.JettonSwap.jetton_master_out.decimals
                                          : 1)
                                  )
                              } ${action.JettonSwap.jetton_master_out.symbol}`
                            : `${action.JettonSwap.jetton_master_in.symbol} ${
                                  formatNumber(
                                      action.JettonSwap.amount_in /
                                      (action.JettonSwap.jetton_master_in?.decimals
                                          ? 10 ** action.JettonSwap.jetton_master_in.decimals
                                          : 1)
                                  )
                              } > ${formatNumber(action.JettonSwap.ton_out / 10 ** 9)} TON`}
                    </h3>
                </div>
            );
        }

        if (type === "TonTransfer" && simple_preview) {
            const { sender, recipient } = action.TonTransfer;
            const isSender = sender.address === rawAddress; 
            const address = isSender ? recipient.address : sender.address;
        
            return (
                <div className={styles.block}>
                    <h3 className={styles.time}>{new Date(timestamp * 1000).toLocaleString()}</h3>
                    <h3 className={styles.address}>
                        {formatAddress(toUserFriendlyAddress(address))}
                        <CopyButton textToCopy={toUserFriendlyAddress(address)} />
                    </h3>
                    <h3 className={styles.value}>
                        {isSender ? '-' : '+'} 
                        {formatNumber(simple_preview.value)}
                    </h3>
                </div>
            );
        }

        return null;
    };

    return (
        <div className={styles.historyContainer}>
            {history.map((event) => (
                <div key={event.event_id} className={styles.historyBlock}>
                    {event.actions.map((action, index) =>
                        <div key={index} className={styles.blocks}>
                            {renderActionDetails(action, event.timestamp)}
                        </div>
                        
                    )}
                </div>
            ))}
        </div>
    );
}

export default History;