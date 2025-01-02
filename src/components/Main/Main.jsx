import { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useTonData from '../../utils/useTonData';
import AddressInfo from '../AddressInfo/AddressInfo';

function Main() {
  const { price, volume, totalSupply, marketCap } = useTonData();
  const [address, setAddress] = useState(''); 
  const [submittedAddress, setSubmittedAddress] = useState('');
  const navigate = useNavigate(); 


  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  const handleButtonClick = () => {
    console.log('Submitted Address:', address);
    setSubmittedAddress(address); 
    if (address) {
      navigate(`/${address}`); 
    }
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
          value={address} 
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
