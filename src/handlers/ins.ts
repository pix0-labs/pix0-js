import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions } from '@cosmjs/proto-signing';
import { NETWORK, DENOM} from '../config';
import { Collection, Item  } from '../models';
import { COLLECTION_CONTRACT_ADDR } from '../config';

let defaultSigningClientOptions : any =  { gasPrice: `0.005${DENOM}` };

export const walletFromMnemonic = async (mnemonic: string, options: Partial<DirectSecp256k1HdWalletOptions> =
    { prefix: NETWORK.prefix }) : Promise<DirectSecp256k1HdWallet>=>{

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, options);
    return wallet;
}

export const createCollection = async (collection : Collection, wallet : DirectSecp256k1HdWallet, walletAddress : string ) : Promise<string|Error> =>{

    try {

        const client = await SigningArchwayClient.connectWithSigner(NETWORK.endpoint, wallet, {
            ...defaultSigningClientOptions,
            prefix: NETWORK.prefix,
        });
    
        const contractAddress = COLLECTION_CONTRACT_ADDR;
        const msg = {
            create_collection: {name : collection.name, symbol: collection.symbol,
                description : collection.description, 
                treasuries : collection.treasuries,
                attributes : collection.attributes,
                prices : collection.prices, 
                status : collection.status, 
            },
        };

    
        const { transactionHash } = await client.execute(
            walletAddress,
            contractAddress,
            msg,
            'auto'
        );
    
        return transactionHash;
    }
    catch(e : any) {

        return e;
    }
}


export const createItem = async (item : Item , wallet : DirectSecp256k1HdWallet, walletAddress : string ) : Promise<string|Error> =>{

    try {

        const client = await SigningArchwayClient.connectWithSigner(NETWORK.endpoint, wallet, {
            ...defaultSigningClientOptions,
            prefix: NETWORK.prefix,
        });
    
        const contractAddress = COLLECTION_CONTRACT_ADDR;

        const msg = {
            create_item: {item : item},
        };

        

        const { transactionHash } = await client.execute(
            walletAddress,
            contractAddress,
            msg,
            'auto'
        );
    
        return transactionHash;
    }
    catch(e : any) {

        return e;
    }
}