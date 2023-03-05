import {StargateClient } from "@cosmjs/stargate";
import { NETWORK } from "../config";

export const getAddressBalance = async  (address : string, coinMinimalDenom : string,
  coinDecimals? : number, client? : any )
: Promise<number|undefined> =>{
    try {

      if ( client !== undefined) {

          let balance = await client.getBalance(address, coinMinimalDenom);
      
          return (balance/ (coinDecimals ?? 1));
  
      }
      else {

          let sClient = await StargateClient.connect(NETWORK.endpoint);
          let b =  parseInt((await sClient.getBalance(address, coinMinimalDenom)).amount);

          return (b/(coinDecimals ?? 1));

      }
    
    } 
    catch (e : any ) {
    
        console.warn('Error reading account balance', [e, address]);
    
    }
};