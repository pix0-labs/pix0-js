export const getAddressBalance = async  (address : string, client : any, coinMinimalDenom : string )
: Promise<number|undefined> =>{
    try {
      let balance = await client.getBalance(address, coinMinimalDenom);
     
      return balance;

    } 
    catch (e : any ) {
    
        console.warn('Error reading account balance', [e, address]);
    
    }
};