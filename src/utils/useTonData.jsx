import axios from "axios";
import { useState, useEffect } from 'react';
import formatNumber from "./formatNumber";

export default function useTonData() {
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

    return { price, volume, totalSupply, marketCap };
};