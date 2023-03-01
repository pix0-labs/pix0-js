import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions } from '@cosmjs/proto-signing';
import { NETWORK, DENOM} from '../config';
import { getItemsCount } from './query';
import { Collection, Item, CollectionId  } from '../models';
import { COLLECTION_CONTRACT_ADDR } from '../config';
import { randomNumber } from '../utils';

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
            create_collection: { collection : collection},
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



export const updateCollection = async (collection : Collection, wallet : DirectSecp256k1HdWallet, walletAddress : string ) : Promise<string|Error> =>{

    try {

        const client = await SigningArchwayClient.connectWithSigner(NETWORK.endpoint, wallet, {
            ...defaultSigningClientOptions,
            prefix: NETWORK.prefix,
        });
    
        const contractAddress = COLLECTION_CONTRACT_ADDR;
        const msg = {
            update_collection: { collection : collection},
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


export const randomMintItem = async (collection_id : CollectionId, 
    wallet : DirectSecp256k1HdWallet, walletAddress : string,  price? : number ) : Promise<string|Error> =>{

    try {

        let gas : any = price ? { gasPrice: `${price}${DENOM}` } : defaultSigningClientOptions;

        const client = await SigningArchwayClient.connectWithSigner(NETWORK.endpoint, wallet, {
            ...gas,
            prefix: NETWORK.prefix,
        });
    
        const contractAddress = COLLECTION_CONTRACT_ADDR;

        let cnt = await getItemsCount(collection_id.collection_owner, collection_id.collection_name, collection_id.collection_symbol);

        if (cnt > 0) {

            let idx = randomNumber(0, (cnt - 1));
  
            const msg = {
                mint_item: {index: `${idx}`, owner: collection_id.collection_owner,
                collection_name : collection_id.collection_name, collection_symbol : collection_id.collection_symbol },
            };
    
            const { transactionHash } = await client.execute(
                walletAddress,
                contractAddress,
                msg,
                'auto'
            );
        
            return transactionHash;
        }
        else {
            return new Error("Collection has NO more items for minting");
        }
      
    }
    catch(e : any) {

        return e;
    }
}


export const mintItemByName = async (collection_id : CollectionId, name : string, 
    wallet : DirectSecp256k1HdWallet, walletAddress : string ) : Promise<string|Error> =>{

    try {

        const client = await SigningArchwayClient.connectWithSigner(NETWORK.endpoint, wallet, {
            ...defaultSigningClientOptions,
            prefix: NETWORK.prefix,
        });
    
        const contractAddress = COLLECTION_CONTRACT_ADDR;

        let cnt = await getItemsCount(collection_id.collection_owner, collection_id.collection_name, collection_id.collection_symbol);

        if (cnt > 0) {

            const msg = {
                mint_item_by_name: {name: name , owner: collection_id.collection_owner,
                collection_name : collection_id.collection_name, collection_symbol : collection_id.collection_symbol },
            };
    
            const { transactionHash } = await client.execute(
                walletAddress,
                contractAddress,
                msg,
                'auto'
            );
        
            return transactionHash;
        }
        else {
            return new Error("Collection has NO more items for minting");
        }
      
    }
    catch(e : any) {

        return e;
    }
}