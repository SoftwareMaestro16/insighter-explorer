import CopyButton from '../../../CopyButton/CopyButton';
import styles from './Wallet.module.scss';
import { capitalizeWords } from '../../../../utils/capitalizeWords';

function Wallet({ address, contractBalance, contractInterface, rawAddress, status }) {
    const hrefTonCx = `https://ton.cx/address/${address}`;
    const hrefToncoinOrg = `https://explorer.toncoin.org/account?account=${address}`;

    return (
        <div className={styles.contractInfo}>
            <h2 className={styles.address}>
              Address:  
              <span className={styles.fullAddress}>{address}</span>
              <span className={styles.shortAddress}>{address.substring(0, 4) + '...' + address.substring(address.length - 4)}</span>
              <CopyButton textToCopy={address} />
            </h2>
            <h2>Balance: <span>{contractBalance}</span></h2>
            <h2>Contract Type: <span>{contractInterface}</span></h2>
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
    );
}

export default Wallet;