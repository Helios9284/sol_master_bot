const isWalletAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };
  
  const getPairAddress = async (tokenAddress, chainId) => {
    const response = await fetch(
      `https://api.dexscreener.com/token-pairs/v1/${chainId}/${tokenAddress}`,
      {
        method: "GET",
        headers: {},
      }
    );
    const data = await response.json();
    console.log("data:", data.length);
    console.log("quoteToken:", process.env.BNB_NATIVE_TOKEN_ADDRESS);
  
    if (chainId === "bsc") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].quoteToken.address === process.env.BNB_NATIVE_TOKEN_ADDRESS) {
          console.log("matched")
          return {
            name: data[i].baseToken.name,
            symbol: data[i].baseToken.symbol,
            pairAddress: data[i].pairAddress,
            priceNative: data[i].priceNative,
            priceUsd: data[i].priceUsd,
            market_cap: data[i].marketCap,
          };
        }
      }
    }
  };
  
  const getEthPairAddress = async (tokenAddress, chainId) => {
    const response = await fetch(
      `https://api.dexscreener.com/token-pairs/v1/${chainId}/${tokenAddress}`,
      {
        method: "GET",
        headers: {},
      }
    );
    const data = await response.json();
    console.log("data:", data.length);
    console.log("quoteToken:", process.env.ETH_NATIVE_TOKEN_ADDRESS);
  
    if (chainId === "eth") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].quoteToken.address === process.env.ETH_NATIVE_TOKEN_ADDRESS) {
          console.log("matched")
          return {
            name: data[i].baseToken.name,
            symbol: data[i].baseToken.symbol,
            pairAddress: data[i].pairAddress,
            priceNative: data[i].priceNative,
            priceUsd: data[i].priceUsd,
            market_cap: data[i].marketCap,
          };
        }
      }
    }
  };
  
  const getSuiPairAddress = async (tokenAddress, chainId) => {
    const response = await fetch(
      `https://api.dexscreener.com/token-pairs/v1/${chainId}/${tokenAddress}`,
      {
        method: "GET",
        headers: {},
      }
    );
    const data = await response.json();
    console.log("data:", data.length);
    console.log("quoteToken:", process.env.SUI_NATIVE_TOKEN_ADDRESS);
  
    if (chainId === "sui") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].quoteToken.address === process.env.SUI_NATIVE_TOKEN_ADDRESS) {
          console.log("matched")
          return {
            name: data[i].baseToken.name,
            symbol: data[i].baseToken.symbol,
            pairAddress: data[i].pairAddress,
            priceNative: data[i].priceNative,
            priceUsd: data[i].priceUsd,
            market_cap: data[i].marketCap,
          };
        }
      }
    }
  };
  
  module.exports = {
    isWalletAddress,
    getPairAddress,
    getEthPairAddress,
    getSuiPairAddress
  };
  