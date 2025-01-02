import styles from './Wallet.module.scss';
import { capitalizeWords } from '../../../../utils/capitalizeWords';
import { useState } from 'react';

function Wallet({ address, contractBalance, contractInterface, rawAddress, status }) {
    const [tokens, setTokens] = useState({});
    const [collectibles, setCollectibles] = useState({});

    const hrefTonCx = `https://ton.cx/address/${address}`;
    const hrefToncoinOrg = `https://explorer.toncoin.org/account?account=${address}`;

    return (
        <div className={styles.contractInfo}>
            <h2>Address: <span>{address}</span></h2>
            <h2>Balance: <span>{contractBalance}</span></h2>
            <h2>Contract Type: <span>{contractInterface}</span></h2>
            <div className={styles.additionalInfo}>
                <h3>{' • '}{capitalizeWords(status)}</h3>
                <h3>{rawAddress.substring(0, 4) + '...' + rawAddress.substring(rawAddress.length - 5)}</h3>
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