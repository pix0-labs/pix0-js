import {COINS_MINIMAL_DENOM} from 'pix0-common-js';
import { getItemsCount, getCollection , getContractInfo} from './query';
import { Collection, Item, CollectionInfo, PriceType  } from '../models';
import { COLLECTION_CONTRACT_ADDR } from '../config';
import { randomNumber } from '../utils';
import { execute, SigningClient } from 'pix0-common-js';


export const getRequiredFee =async (feeName : string, queryHandler? : any) : Promise<{
    amount : number, denom : string, 
}> =>{

    let cinfo = await getContractInfo(queryHandler);

    let fee0 = cinfo.fees.filter(f=>{return f.name === feeName})[0];

    let fee = fee0 ?  {amount : parseInt(fee0.value.amount), denom : fee0.value.denom} : {amount : 10000, denom : "uconst"};

    return fee ;
}

export const createCollection = async (collection : Collection, walletAddress : string, client : SigningClient ,
    queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        let fee = await getRequiredFee("CREATE_COLLECTION_FEE", queryHandler);

        const msg = {
            create_collection: { collection : collection},
        };

        const tx = await execute(msg, walletAddress, client, fee, COLLECTION_CONTRACT_ADDR);
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

       const tx = await execute(msg, walletAddress, client, undefined, COLLECTION_CONTRACT_ADDR);
        
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

        const tx = await execute(msg, walletAddress, client, undefined, COLLECTION_CONTRACT_ADDR);
        
        return tx ;     
    }
    catch(e : any) {

        return e;
    }
}


export const createItem = async (item : Item , walletAddress : string, client : SigningClient,
    queryHandler? : any   ) : Promise<string|Error> =>{

    try {

        let fee = await getRequiredFee("CREATE_ITEM_FEE", queryHandler);

        const msg = {
            create_item: {item : item},
        };

        const tx = await execute(msg, walletAddress, client, fee, COLLECTION_CONTRACT_ADDR);
        return tx ;     
 
    }
    catch(e : any) {

        return e;
    }
}


export const randomMintItem = async (collection_info : CollectionInfo, 
walletAddress : string, client : SigningClient, queryHandler? : any  ) : Promise<string|Error> =>{

    try {


        let msg = { owner :
            collection_info.collection_owner, 
            name :
            collection_info.collection_name, 
            symbol :
            collection_info.collection_symbol};
        let coll = await getCollection(msg,queryHandler);
        
        if (coll === undefined || coll === null ) {
            return new Error(`Collection "${JSON.stringify(msg)}" NOT found!`);
        }

        let _price_type = collection_info.price_type ?? 1;

        let price : PriceType[]|undefined = coll.prices?.filter((p)=>{
            return p.price_type === _price_type;
        }) ;

       
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
            (price!== undefined  && price.length) > 0 ? {amount :price[0].value, denom : 
            price[0].denom ?? COINS_MINIMAL_DENOM
            } : undefined, COLLECTION_CONTRACT_ADDR );
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
    
            const tx = await execute(msg, walletAddress, client, undefined, 
                COLLECTION_CONTRACT_ADDR);
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


export const transferNft = async (recipient : string, token_id : string ,walletAddress : string,client : SigningClient  ) : Promise<string|Error> =>{

    try {

        const msg = {
            transfer_nft: {recipient : recipient, token_id : token_id},
        };

        const tx = await execute(msg, walletAddress, client, undefined, COLLECTION_CONTRACT_ADDR);
        return tx ;     
 
    }
    catch(e : any) {

        return e;
    }
}


export const burnNft = async (token_id : string ,walletAddress : string,client : SigningClient  ) : Promise<string|Error> =>{

    try {

        const msg = {
            burn_nft: {token_id : token_id},
        };

        const tx = await execute(msg, walletAddress, client, undefined, COLLECTION_CONTRACT_ADDR);
        return tx ;     
 
    }
    catch(e : any) {

        return e;
    }
}