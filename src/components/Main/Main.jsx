import { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import Header from '../Header/Header';
import axios from 'axios';
import useTonData from '../../utils/useTonData';

function Main() {
  const { price, volume, totalSupply, marketCap } = useTonData();
  const [inputValue, setInputValue] = useState(''); 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    console.log('Input Value:', inputValue); 
  };

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
        <input  
          type="text" 
          placeholder='Enter Address...'
          value={inputValue} 
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>
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
