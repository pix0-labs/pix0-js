import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { NETWORK, DENOM } from './config';
import { Collection } from './models';
import { COLLECTION_CONTRACT_ADDR } from './query';
require('dotenv').config();

let defaultSigningClientOptions : any =  { gasPrice: `0.005${DENOM}` };

export const createCollection = async (collection : Collection) =>{

    try {

        const wallet_param = {
            mnemonic: process.env.WALLET_MNEMONIC,
            address: process.env.WALLET_ADDRESS,
        };
       
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(wallet_param.mnemonic, { prefix: NETWORK.prefix });
        const client = await SigningArchwayClient.connectWithSigner(NETWORK.endpoint, wallet, {
            ...defaultSigningClientOptions,
            prefix: NETWORK.prefix,
        });
    
        const contractAddress = COLLECTION_CONTRACT_ADDR;
        const msg = {
            create_collection: {name : collection.name, symbol: collection.symbol},
        };
        const { transactionHash } = await client.execute(
            wallet_param.address,
            contractAddress,
            msg,
            'auto'
        );
    
        console.log("tx.hash::", transactionHash);
    
    }
    catch(e : any) {

        console.error("Error@createCollection\n", e.message);
    }
}