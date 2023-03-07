import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions } from '@cosmjs/proto-signing';
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { NETWORK, DENOM, COINS_MINIMAL_DENOM} from '../config';
import { getItemsCount, getCollection } from './query';
import { Collection, Item, CollectionInfo  } from '../models';
import { COLLECTION_CONTRACT_ADDR } from '../config';
import { randomNumber } from '../utils';



export const walletFromMnemonic = async (mnemonic: string, options: Partial<DirectSecp256k1HdWalletOptions> =
    { prefix: NETWORK.prefix }) : Promise<DirectSecp256k1HdWallet>=>{

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, options);
    return wallet;
}

type SigningClient = SigningArchwayClient | SigningCosmWasmClient;

const execute = async (msg : any,  
    walletAddress : string , 
    client : SigningClient, 
    required_fund? : { amount: number, denom : string}, 
    contractAddress : string = COLLECTION_CONTRACT_ADDR  ) : Promise<string|Error> =>{

    let gasPrice :any = GasPrice.fromString('0.005' + COINS_MINIMAL_DENOM);
    
    let txFee = calculateFee(300_000, gasPrice);

    let _msg = required_fund ? {...msg, funds: [{
        denom: required_fund.denom,
        amount: required_fund.amount, 
      }]} : msg ;

    let tx = await client.execute(walletAddress, contractAddress, _msg, txFee);

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


export const randomMintItem = async (collection_info : CollectionInfo, 
walletAddress : string, client : SigningClient, queryHandler? : any  ) : Promise<string|Error> =>{

    try {


        let coll = await getCollection({ owner :
            collection_info.collection_owner, 
            name :
            collection_info.collection_name, 
            symbol :
            collection_info.collection_symbol},queryHandler);
        
        if (coll === undefined) {
            return new Error("Collection NOT found!");
        }

        let price_type = collection_info.price_type ?? 1;

        let price = coll.prices.filter((p)=>{
            p.price_type === price_type;
        });

        console.log("price.for.item:", price);

        let cnt = await getItemsCount({
            owner :
            collection_info.collection_owner, 
            collection_name :
            collection_info.collection_name, 
            collection_symbol :
            collection_info.collection_symbol}, queryHandler);

        if (cnt > 0) {

            let seed = randomNumber(0, 248000);
  
            const msg = {
                mint_item: {seed: `${seed}`, owner: collection_info.collection_owner,
                collection_name : collection_info.collection_name, collection_symbol : 
                collection_info.collection_symbol },
            };

            const tx = await execute(msg, walletAddress, client, 
            price.length > 0 ? {amount :price[0].value, denom : 
            price[0].denom ?? COINS_MINIMAL_DENOM
            } : undefined, );
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


export const mintItemByName = async (colection_info : CollectionInfo, name : string, 
    walletAddress : string, client : SigningClient, queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        let cnt = await getItemsCount({
            owner :
            colection_info.collection_owner, 
            collection_name :
            colection_info.collection_name, 
            collection_symbol :
            colection_info.collection_symbol}, queryHandler);

        if (cnt > 0) {

            const msg = {
                mint_item_by_name: {name: name , owner: colection_info.collection_owner,
                collection_name : colection_info.collection_name, collection_symbol : colection_info.collection_symbol },
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