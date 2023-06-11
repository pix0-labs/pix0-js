import {StargateClient } from "@cosmjs/stargate";
import { NETWORK, COINS_MINIMAL_DENOM, PRECISION} from "../config";



export const getBalanceOf = async  (address : string, client? : any )
: Promise<{ balanceInCoin :number, balanceInUcoin : number} |undefined> =>{
  
    return await getAddressBalance(address, COINS_MINIMAL_DENOM, PRECISION, client);
}

export const getAddressBalance = async  (address : string, coinMinimalDenom : string,
  coinDecimals? : number, client? : any )
: Promise<{ balanceInCoin :number, balanceInUcoin : number} |undefined> =>{
    try {

      if ( client !== undefined) {

          let balance = await client.getBalance(address, coinMinimalDenom);
      
          return { balanceInCoin : (balance/ Math.pow(10, (coinDecimals ?? 0))) , balanceInUcoin : balance};
  
      }
      else {

          let sClient = await StargateClient.connect(NETWORK.endpoint);
          let b =  parseInt((await sClient.getBalance(address, coinMinimalDenom)).amount);

          return  { balanceInCoin :( b/ Math.pow(10, (coinDecimals ?? 0))), balanceInUcoin : b};

      }
    
    } 
    catch (e : any ) {
    
        console.warn('Error reading account balance', [e, address]);
    
    }
};