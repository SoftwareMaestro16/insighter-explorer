import styles from "./MainInfo.module.scss";
import CopyButton from "../../../../CopyButton/CopyButton";

function MainInfo({ address, contractBalance, contractInterface, walletName }) {

    return (
        <>
          <div className={styles.contractInfo}>
            {walletName && 
            <h2>Name: <span>{walletName}</span></h2>
            }
            <h2 className={styles.address}>Address:  
              <span className={styles.fullAddress}>{address}</span>
              <span className={styles.shortAddress}>{address.substring(0, 4) + '...' + address.substring(address.length - 4)}</span>
              <CopyButton textToCopy={address} />
            </h2>
            <h2>Balance: <span>{contractBalance}</span> TON</h2>
            <h2>Contract Type: <span>{contractInterface}</span></h2>
          </div>
        </>
    );
}

export default MainInfo;