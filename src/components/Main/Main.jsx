import { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import Header from '../Header/Header';
import axios from 'axios';
import formatNumber from '../../utils/formatNumber';

function Main() {
  const [tonData, setTonData] = useState(null); 

  useEffect(() => {
    axios
      .get('https://api.geckoterminal.com/api/v2/networks/ton/tokens/EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c')
      .then((response) => {
        const attributes = response.data.data.attributes;
        setTonData({
          price_usd: attributes.price_usd,
          volume_usd_h24: attributes.volume_usd.h24,
          total_supply: attributes.total_supply,
          market_cap_usd: attributes.market_cap_usd,
        });
        console.log('Fetched Data:', attributes);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const price = tonData ? `${Number(tonData.price_usd).toFixed(2)}` : '~';
  const volume = tonData ? formatNumber(tonData.volume_usd_h24) : '~';
  const totalSupply = tonData ? formatNumber(tonData.total_supply) : '~';
  const marketCap = tonData ? formatNumber(tonData.market_cap_usd) : '~';

  return (
    <>
      <Header />

      <div className={styles.mainText}>
        <h1>
          <span className={styles.span1}>Insighter </span>
           - Explore, Learn, Connect with
          <span className={styles.span2}> The Open Network</span></h1>
      </div>
      <div className={styles.inputField}>
        <input type="text" placeholder='Enter Address...' />
        <button>
          <img src="/in-logo.png" alt="Insighter Search" />
        </button>
      </div>
      <div className={styles.statsBlocks}>
        <div className={styles.statsBlock}>
          <h1>TON Price</h1>
          <h2><span>$</span>{price}</h2>
        </div>
        <div className={styles.statsBlock}>
          <h1>Volume 24h</h1>
          <h2><span>$</span>{volume}</h2>
        </div>
        <div className={styles.statsBlock}>
          <h1>Market Cap</h1>
          <h2><span>$</span>{marketCap}</h2>
        </div>
        <div className={styles.statsBlock}>
          <h1>Total Supply</h1>
          <h2>{totalSupply}</h2>
        </div>
      </div>

      <br />
    </>
  )
}

export default Main;
