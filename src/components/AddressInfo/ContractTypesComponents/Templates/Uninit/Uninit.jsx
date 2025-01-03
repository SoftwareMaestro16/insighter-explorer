import styles from "./Uninit.module.scss";
import CopyButton from "../../../../CopyButton/CopyButton";
import { toUserFriendlyAddress } from "@tonconnect/ui-react";
import { capitalizeWords } from "../../../../../utils/capitalizeWords";

function Uninit({ address, contractBalance, status, rawAddress }) {
    const isValidTonAddress = (addr) => addr.startsWith("0:");
    const hrefTonCx = `https://ton.cx/address/${address}`;
    const hrefToncoinOrg = `https://explorer.toncoin.org/account?account=${address}`;

    return (
        <>
            <div className={styles.container}>
            <div className={styles.contractInfo}>
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
            </div>

                <div className={styles.additionalInfoContainer}>
                    <div className={styles.additionalInfo}>
                        <h3>{' • '}{capitalizeWords(status)}</h3>
                        <h3 className={styles.rawAddress}>
                            {rawAddress.substring(0, 4) + '...' + rawAddress.substring(rawAddress.length - 4)}
                            <CopyButton textToCopy={rawAddress} />
                        </h3>
                        <div className={styles.linksExplorers}>
                        <h3>
                            <a href={hrefTonCx} target='_blank' rel='noopener noreferrer'>ton.cx</a>
                            {' • '}
                            <a href={hrefToncoinOrg} target='_blank' rel='noopener noreferrer'>toncoin.org</a>
                        </h3>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Uninit;