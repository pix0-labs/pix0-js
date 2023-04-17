
import { Coin } from '../../common/';
import { getItemsCount, getCollection } from './query';
import { Collection, Item, CollectionInfo, PriceType  } from '../models';
import { COLLECTION_CONTRACT_ADDR } from '../config';
import { randomNumber } from '../../utils';
import { execute, SigningClient } from '../../common/';
import { getCreateCollectionFee, getCreateItemFee, getNftMintingFee, getSimpleMintingFee} from './query';
import { obtainCollectionInfo } from '../../market/handlers/ins';
import { SellOffer } from '../../market/models';
import { getCreateSellOfferFee } from '../../market/handlers/query';
import { Nft } from '../models';

export const createCollection = async (collection : Collection, walletAddress : string, client : SigningClient ,
    queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        let fee = await getCreateCollectionFee(queryHandler);

        const msg = {
            create_collection: { collection : collection},
        };

        const tx = await execute(msg, walletAddress, client, fee, COLLECTION_CONTRACT_ADDR, "Create Collection");
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

       const tx = await execute(msg, walletAddress, client, undefined, COLLECTION_CONTRACT_ADDR, "Update Collection");
        
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

        const tx = await execute(msg, walletAddress, client, undefined, COLLECTION_CONTRACT_ADDR, "Remove Collection");
        
        return tx ;     
    }
    catch(e : any) {

        return e;
    }
}


export const createItem = async (item : Item , walletAddress : string, client : SigningClient,
    queryHandler? : any   ) : Promise<string|Error> =>{

    try {

        let fee = await getCreateItemFee(queryHandler);
        
        const msg = {
            create_item: {item : item},
        };

        const tx = await execute(msg, walletAddress, client, fee, COLLECTION_CONTRACT_ADDR, "Create Item");
        return tx ;     
 
    }
    catch(e : any) {

        return e;
    }
}



export const getFeesForMinting = async (priceType? : PriceType, queryHandler? : any) : Promise<Coin[]> =>{

    let mintingFee = await getNftMintingFee(queryHandler);;

    if (priceType) {
        let mintingPrice = priceType.value;
        let fees = [{ amount : `${parseInt(mintingPrice.amount) + 
            parseInt(mintingFee.amount)}`, denom : mintingPrice.denom}];
        
        return fees ;
    }
    else {
        return [mintingFee];
    }
 
}

export const randomMintItem = async (collection_info : CollectionInfo, 
walletAddress : string, client : SigningClient, queryHandler? : any  ) : Promise<string|Error> =>{

    try {


        let msg = { owner :collection_info.collection_owner, 
            name :collection_info.collection_name, 
            symbol :collection_info.collection_symbol};
        let coll = await getCollection(msg,queryHandler);
        
        if (coll === undefined || coll === null ) {
            return new Error(`Collection "${JSON.stringify(msg)}" NOT found!`);
        }

        let cnt = await getItemsCount({
        owner :
        collection_info.collection_owner, 
        collection_name :
        collection_info.collection_name, 
        collection_symbol :
        collection_info.collection_symbol}, queryHandler);

        if (cnt > 0) {

            let _price_type = collection_info.price_type ?? 1;

            let price : PriceType[]|undefined = coll.prices?.filter((p)=>{
                return p.price_type === _price_type;
            }) ;
        
            let fees = await getFeesForMinting(price[0], queryHandler);
    
            let seed = randomNumber(0, 256);

            const msg = {
                mint_item: {seed: `${seed}`, owner: collection_info.collection_owner,
                collection_name : collection_info.collection_name, collection_symbol : 
                collection_info.collection_symbol },
            };

            const tx = await execute(msg, walletAddress, client, fees, COLLECTION_CONTRACT_ADDR , "Mint NFT");
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


export const mintItemByName = async (collection_info : CollectionInfo, name : string, 
    walletAddress : string, client : SigningClient, queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        let msg = { owner :collection_info.collection_owner, 
            name :collection_info.collection_name, 
            symbol :collection_info.collection_symbol};
        let coll = await getCollection(msg,queryHandler);
        
        if (coll === undefined || coll === null ) {
            return new Error(`Collection "${JSON.stringify(msg)}" NOT found!`);
        }

        let cnt = await getItemsCount({
            owner :
            collection_info.collection_owner, 
            collection_name :
            collection_info.collection_name, 
            collection_symbol :
            collection_info.collection_symbol}, queryHandler);

        if (cnt > 0) {

            let _price_type = collection_info.price_type ?? 1;

            let price : PriceType[]|undefined = coll.prices?.filter((p)=>{
                return p.price_type === _price_type;
            }) ;
        
            let fees = await getFeesForMinting(price[0], queryHandler);
       

            const msg = {
                mint_item_by_name: {name: name , owner: collection_info.collection_owner,
                collection_name : collection_info.collection_name, collection_symbol : collection_info.collection_symbol },
            };
    
            const tx = await execute(msg, walletAddress, client, undefined, 
                COLLECTION_CONTRACT_ADDR, "Mint Item By Name");
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


export const simpleMint = async (item :{item : Item, token_uri? : string} , 
walletAddress : string, client : SigningClient, queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        let fee = await getSimpleMintingFee(queryHandler);
    
        const msg = {
            simple_mint: {item : item.item, token_uri : item.token_uri },
        };

        const tx = await execute(msg, walletAddress, client, fee, COLLECTION_CONTRACT_ADDR , "Simple Mint NFT");
        return tx ;       
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

        const tx = await execute(msg, walletAddress, client, undefined, COLLECTION_CONTRACT_ADDR, "Transfer NFT");
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

        const tx = await execute(msg, walletAddress, client, undefined, COLLECTION_CONTRACT_ADDR, "Burn NFT");
        return tx ;     
 
    }
    catch(e : any) {

        return e;
    }
}


export const createSellOfferFrom = async (param : {token_id : string, price : Coin, 
    allowed_direct_buy : boolean,  nft : Nft, contract_addr? : string},  
    walletAddress : string, client : SigningClient,  queryHandler? : any  ) =>{


    let sell_offer : SellOffer = {
        token_id : param.token_id,
        owner : walletAddress, 
        allowed_direct_buy : param.allowed_direct_buy,
        price : param.price,
        status : 0, 
        collection_info : obtainCollectionInfo(param.nft), 
        contract_addr : param.contract_addr ??  COLLECTION_CONTRACT_ADDR
    };

    return await createSellOffer(sell_offer, walletAddress, client, queryHandler);
}


export const createSellOffer = async (sell_offer : SellOffer, 
    walletAddress : string, client : SigningClient,  queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        let fee = await getCreateSellOfferFee(queryHandler);
        //let newFee = { amount : `${parseInt(fee.amount) * 1.2}`, denom : fee.denom} ; // try a mark up of 20%

        //console.log("fee::", fee, "newFee::", newFee);
        
        const msg = {
            create_sell_offer: {offer :sell_offer, create_sell_offer_fee : fee},
        };

        const tx = await execute(msg, walletAddress, client, fee , COLLECTION_CONTRACT_ADDR, "Create Sell Offer");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}

