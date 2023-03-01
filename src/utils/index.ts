export interface Wallet {
    
    mnemonic : string, 

    address : string, 
}



export const randomNumber = (min : number, max : number ): number =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}