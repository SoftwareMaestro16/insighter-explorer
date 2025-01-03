import styles from './Wallet.module.scss';
import AdditionalInfo from '../Templates/AdditionalInfo/AddtionalInfo';
import MainInfo from '../Templates/MainInfo/MainInfo';


function Wallet({ address, contractBalance, contractInterface, rawAddress, status, walletName }) {
    
    return (
        <>
          <div className={styles.interfaceBlock}>
            <MainInfo
              address={address}
              contractBalance={contractBalance}
              contractInterface={contractInterface}
              walletName={walletName || undefined}
            />
            {/* <h2 className={styles.test}>test</h2> */}
            <AdditionalInfo
              address={address}
              rawAddress={rawAddress}
              status={status}
            />    
          </div>

          
          
        </>
        
    );
}

export default Wallet;