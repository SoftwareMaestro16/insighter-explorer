import styles from "./MainInfo.module.scss";
import CopyButton from "../../../../CopyButton/CopyButton";
import { toUserFriendlyAddress } from "@tonconnect/ui-react";

function MainInfo({ address, contractBalance, contractInterface, walletName }) {
    const isValidTonAddress = (addr) => addr.startsWith("0:");

    return (
        <>
            <div className={styles.contractInfo}>
                {walletName && <h2>Name: <span>{walletName}</span></h2>}
                <h2 className={styles.address}>
                    Address:
                    {isValidTonAddress(address) ? (
                        <>
                            <span className={styles.fullAddress}>{toUserFriendlyAddress(address)}</span>
                            <span className={styles.shortAddress}>
                                {`${toUserFriendlyAddress(address).substring(0, 4)}...${toUserFriendlyAddress(address).substring(toUserFriendlyAddress(address).length - 4)}`}
                            </span>
                            <CopyButton textToCopy={toUserFriendlyAddress(address)} />
                        </>
                    ) : (
                        <>
                            <span className={styles.fullAddress}>{address}</span>
                            <span className={styles.shortAddress}>
                                {`${address.substring(0, 4)}...${address.substring(address.length - 4)}`}
                            </span>
                            <CopyButton textToCopy={address} />
                        </>
                    )}
                </h2>
                <h2>Balance: <span>{contractBalance}</span> TON</h2>
                <h2>Contract Type: <span>{contractInterface || 'unknown'}</span></h2>
            </div>
        </>
    );
}

export default MainInfo;