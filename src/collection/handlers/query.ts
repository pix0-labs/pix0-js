import { COLLECTION_CONTRACT_ADDR} from '../config';
import { Collection, Item , Nft } from '../models';
import { query, LogInfo, getRequiredFee, Coin, 
getLogInfo as commonLogInfo, getContractInfo as commonContractInfo,
ContractInfo} from '../../common';

export const getCollection = async (msg : {owner : string, name : string, symbol : string}, 
    queryHandler? : any  ) :Promise<Collection> =>{

    const _msg = {
        get_collection: msg,
    };
    
    const res = await query(_msg, queryHandler, COLLECTION_CONTRACT_ADDR);

    return res.collection;
}



export const getCollections = async (msg : {owner : string, start_after? : string, limit? : number}, 
    queryHandler? : any  ) :Promise<Collection[]> =>{

    const _msg = {
        get_collections: {owner : msg.owner, start_after : msg.start_after, limit : msg.limit },
    };
    
    const collections = await query(_msg, queryHandler, COLLECTION_CONTRACT_ADDR);

    return collections.collections;
}



export const getItems = async (msg : {owner : string, collection_name : string, collection_symbol : string,
    start_after? : string, limit? : number}, queryHandler? : any ) :Promise<Item[]> =>{

    const _msg = {
        get_items: {owner : msg.owner, 
            collection_name : msg.collection_name, 
            collection_symbol: msg.collection_symbol,
            start_after : msg.start_after, limit : msg.limit  },
    };
    
    const items_res = await query(
        _msg, queryHandler , COLLECTION_CONTRACT_ADDR
    );

    return items_res.items;
}



export const getItemsCount = async (msg : {owner : string, collection_name : string, collection_symbol : string},
    queryHandler? : any ) :Promise<number> =>{

    const _msg = {
        get_items_count: {owner : msg.owner, 
        collection_name : msg.collection_name, 
        collection_symbol: msg.collection_symbol },
    };
    
    const itm_cnt_resp = await query(
        _msg, queryHandler , COLLECTION_CONTRACT_ADDR
    );

    return itm_cnt_resp.count;
}



export const getMintedTokensByOwner = async (msg : {owner : string,  start_after? : string, limit? : number},
    queryHandler? : any ) :Promise<string[]> =>{

    const _msg = {
        minted_tokens_by_owner: {owner : msg.owner , 
        start_after : msg.start_after, limit : msg.limit },
    };
    
    const tok_resp = await query(_msg, queryHandler,COLLECTION_CONTRACT_ADDR);

    return tok_resp.tokens;
}



export const getNftTokenInfo = async (token_id : string, queryHandler? : any ) :Promise<Nft> =>{

    const msg = {
        nft_token_info: {token_id : token_id },
    };
    
    const tok_resp = await query(msg, queryHandler,COLLECTION_CONTRACT_ADDR);

    return {token_uri : tok_resp.token_uri, extension : tok_resp.extension};
}





export const getCollectionLogInfo = async (queryHandler? : any  ) :Promise<LogInfo> =>{

    return await commonLogInfo(COLLECTION_CONTRACT_ADDR, queryHandler);
}



export const getCollectionContractInfo = async (queryHandler? : any  ) :Promise<ContractInfo> =>{

    return await commonContractInfo(COLLECTION_CONTRACT_ADDR, queryHandler);
 }
 
 


export const getCreateCollectionFee = async (queryHandler? : any) : Promise<Coin> =>{
    return await getRequiredFee("CREATE_COLLECTION_FEE", COLLECTION_CONTRACT_ADDR, queryHandler);
}



export const getCreateItemFee = async (queryHandler? : any) : Promise<Coin> =>{
    return await getRequiredFee("CREATE_ITEM_FEE", COLLECTION_CONTRACT_ADDR, queryHandler);
}


export const getNftMintingFee = async (queryHandler? : any) : Promise<Coin> =>{
    return await getRequiredFee("NFT_MINTING_FEE", COLLECTION_CONTRACT_ADDR, queryHandler);
}