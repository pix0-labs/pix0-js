import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions } from '@cosmjs/proto-signing';
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { NETWORK, DENOM, COINS_MINIMAL_DENOM} from '../config';
import { getItemsCount } from './query';
import { Collection, Item, CollectionId  } from '../models';
import { COLLECTION_CONTRACT_ADDR } from '../config';
import { randomNumber } from '../utils';



export const walletFromMnemonic = async (mnemonic: string, options: Partial<DirectSecp256k1HdWalletOptions> =
    { prefix: NETWORK.prefix }) : Promise<DirectSecp256k1HdWallet>=>{

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, options);
    return wallet;
}

type SigningClient = SigningArchwayClient | SigningCosmWasmClient;

const execute = async (msg : any,  walletAddress : string , 
    client : SigningClient  ) : Promise<string|Error> =>{

    let gasPrice :any = GasPrice.fromString('0.002' + COINS_MINIMAL_DENOM);
    
    let txFee = calculateFee(300_000, gasPrice);

    const contractAddress = COLLECTION_CONTRACT_ADDR;

    let tx = await client.execute(walletAddress, contractAddress, msg, txFee);

    return tx.transactionHash; 

}

let defaultSigningClientOptions : any =  { gasPrice: `0.005${DENOM}` };

export const createSigningArchwayClient = async ( wallet : DirectSecp256k1HdWallet ) : Promise<SigningArchwayClient> => {


    const client = await SigningArchwayClient.connectWithSigner(NETWORK.endpoint, wallet, {
        ...defaultSigningClientOptions,
        prefix: NETWORK.prefix,
    });

    return client;
}

export const createSigningClient = async ( mnemonic : string  ) : Promise<SigningArchwayClient> => {

    let wallet = await walletFromMnemonic(mnemonic);
    return createSigningArchwayClient(wallet);
}


export const createCollection = async (collection : Collection, walletAddress : string, client : SigningClient  ) : Promise<string|Error> =>{

    try {

        const msg = {
            create_collection: { collection : collection},
        };

        const tx = await execute(msg, walletAddress, client);
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}



export const updateCollection = async (collection : Collection, walletAddress : string,
    client : SigningClient  ) : Promise<string|Error> =>{

    try {
        const msg = {
            update_collection: { collection : collection},
        };

       const tx = await execute(msg, walletAddress, client);
        
       return tx ; 
        
    }
    catch(e : any) {

        return e;
    }
}



export const removeCollection = async (collection : {name : string,
    symbol : string}, walletAddress : string, client : SigningClient  ) : Promise<string|Error> =>{

    try {

        const msg = {
            remove_collection: { name : collection.name, symbol : collection.symbol},
        };

        const tx = await execute(msg, walletAddress, client);
        
        return tx ;     
    }
    catch(e : any) {

        return e;
    }
}


export const createItem = async (item : Item , walletAddress : string, client : SigningClient  ) : Promise<string|Error> =>{

    try {

        const msg = {
            create_item: {item : item},
        };

        const tx = await execute(msg, walletAddress, client);
        return tx ;     
 
    }
    catch(e : any) {

        return e;
    }
}


export const randomMintItem = async (collection_id : CollectionId, 
walletAddress : string, client : SigningClient, queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        let cnt = await getItemsCount({
            owner :
            collection_id.collection_owner, 
            collection_name :
            collection_id.collection_name, 
            collection_symbol :
            collection_id.collection_symbol}, queryHandler);

        console.log("queryCollecitemItems.cnt::", cnt);
            
        if (cnt > 0) {

            let idx = randomNumber(0, (cnt - 1));
  
            const msg = {
                mint_item: {index: `${idx}`, owner: collection_id.collection_owner,
                collection_name : collection_id.collection_name, collection_symbol : collection_id.collection_symbol },
            };

            const tx = await execute(msg, walletAddress, client);
            return tx ;     
     
    
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
    walletAddress : string, client : SigningClient, queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        const contractAddress = COLLECTION_CONTRACT_ADDR;

        let cnt = await getItemsCount({
            owner :
            collection_id.collection_owner, 
            collection_name :
            collection_id.collection_name, 
            collection_symbol :
            collection_id.collection_symbol}, queryHandler);

        if (cnt > 0) {

            const msg = {
                mint_item_by_name: {name: name , owner: collection_id.collection_owner,
                collection_name : collection_id.collection_name, collection_symbol : collection_id.collection_symbol },
            };
    
            const tx = await execute(msg, walletAddress, client);
            return tx ;     
        }
        else {
            return new Error("Collection has NO more items for minting");
        }
      
    }
    catch(e : any) {

        return e;
    }
}