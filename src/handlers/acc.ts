import {StargateClient } from "@cosmjs/stargate";
import { NETWORK } from "../config";

export const getAddressBalance = async  (address : string, coinMinimalDenom : string,
  client? : any )
: Promise<string|undefined> =>{
    try {

      if ( client !== undefined) {

          let balance = await client.getBalance(address, coinMinimalDenom);
      
          return balance;
  
      }
      else {

          let sClient = await StargateClient.connect(NETWORK.endpoint);
          return (await sClient.getBalance(address, coinMinimalDenom)).amount;

      }
    
    } 
    catch (e : any ) {
    
        console.warn('Error reading account balance', [e, address]);
    
    }
};