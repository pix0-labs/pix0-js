import { ArchwayClient } from '@archwayhq/arch3.js';
import { NETWORK , COLLECTION_CONTRACT_ADDR} from '../config';
import { Collection, Item , Nft } from '../models';
require('dotenv').config();

export const getCollections = async (owner : string, start_after? : string, limit? : number ) :Promise<Collection[]> =>{

    const client = await ArchwayClient.connect(NETWORK.endpoint);

    const contractAddress = COLLECTION_CONTRACT_ADDR;

    const msg = {
        get_collections: {owner : owner, start_after : start_after, limit : limit },
    };
    
    const collections = await client.queryContractSmart(
        contractAddress,
        msg
    );

    return collections.collections;
}



export const getItems = async (owner : string, collection_name : string, collection_symbol : string,
    start_after? : string, limit? : number) :Promise<Item[]> =>{

    const client = await ArchwayClient.connect(NETWORK.endpoint);

    const contractAddress = COLLECTION_CONTRACT_ADDR;

    const msg = {
        get_items: {owner : owner, collection_name : collection_name, collection_symbol: collection_symbol,start_after : start_after, limit : limit  },
    };
    
    const items_res = await client.queryContractSmart(
        contractAddress,
        msg
    );

    return items_res.items;
}



export const getItemsCount = async (owner : string, collection_name : string, collection_symbol : string) :Promise<number> =>{

    const client = await ArchwayClient.connect(NETWORK.endpoint);

    const contractAddress = COLLECTION_CONTRACT_ADDR;

    const msg = {
        get_items_count: {owner : owner, collection_name : collection_name, collection_symbol: collection_symbol },
    };
    
    const itm_cnt_resp = await client.queryContractSmart(
        contractAddress,
        msg
    );

    return itm_cnt_resp.count;
}



export const getMintedTokensByOwner = async (owner : string,  start_after? : string, limit? : number) :Promise<string[]> =>{

    const client = await ArchwayClient.connect(NETWORK.endpoint);

    const contractAddress = COLLECTION_CONTRACT_ADDR;

    const msg = {
        minted_tokens_by_owner: {owner : owner , start_after : start_after, limit : limit },
    };
    
    const tok_resp = await client.queryContractSmart(
        contractAddress,
        msg
    );

    return tok_resp.tokens;
}
