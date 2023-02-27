const fs = require('fs');
const os = require('os');
require('dotenv').config();

export interface Wallet {

    mnemonic : string, 
    address : string, 
}

export const extractWallet = () : Wallet|undefined =>{

    const homeDir = os.homedir();
    const filePath = `${homeDir}/wallet.json`;
    

    let data = fs.readFileSync(filePath);

    let wallet : Wallet|undefined = JSON.parse(data.toString());


    return wallet;
}

export const extractWalletFromEnv = () : Wallet =>{

    return { mnemonic : process.env.WALLET_MNEMONIC, address : process.env.WALLET_ADDRESS};
}