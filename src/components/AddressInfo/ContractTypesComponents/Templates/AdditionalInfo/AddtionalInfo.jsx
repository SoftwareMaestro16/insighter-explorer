import styles from "./additionalInfo.module.scss";
import CopyButton from "../../../../CopyButton/CopyButton";
import { capitalizeWords } from "../../../../../utils/capitalizeWords";

function AdditionalInfo({ address, rawAddress, status }) {
    const hrefTonCx = `https://ton.cx/address/${address}`;
    const hrefToncoinOrg = `https://explorer.toncoin.org/account?account=${address}`;

    return (
        <>
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
        </>
    );
}

export default AdditionalInfo;