import { query, Coin } from "../../common";
import { MARKET_CONTRACT_ADDR } from "../config";
import { SellOffersWithParamsResponse, SimpleCollectionInfo, 
    BuyOffersWithParamsResponse, SellOffer, 
    CollectionIndexesWithParamsResponse, CollectionIndexResponse} from "../models";
import { getRequiredFee } from "../../common";

export const getBalanceOfEscrow = async (denom : String,
    queryHandler? : any ) :Promise<Coin> =>{

    const _msg = {
        get_balance_of_escrow : { denom :denom} ,
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);

    return resp.amount;
}



export const getSellOffers = async (status?: number,
    collection_info? : SimpleCollectionInfo, start? : number, limit?: number, 
    queryHandler? : any ) :Promise<SellOffersWithParamsResponse> =>{

    const _msg = {
        get_sell_offers : { status : status, collection_info : collection_info,
        start : start, limit : limit } 
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);
    return resp;
}


export const getSellOffersOf = async (
    owner: string,
    status? : number,  
    start? : number, limit?: number, 
    queryHandler? : any ) :Promise<SellOffersWithParamsResponse> =>{

    const _msg = {
        get_sell_offers_of : { status : status, owner: owner,
            start : start, limit : limit } 
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);
    return resp;
}



export const getSellOfferById = async (
    offer_id : string , 
    queryHandler? : any ) :Promise<SellOffer|undefined> =>{

    const _msg = {
        get_sell_offer_by_id : { offer_id : offer_id} 
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);
    return resp.offer;
}



export const getBuyOffersOf = async (
    owner: string,
    accepted? : boolean,  
    start? : number, limit?: number, 
    queryHandler? : any ) :Promise<BuyOffersWithParamsResponse> =>{

    const _msg = {
        get_buy_offers_of : {accepted : accepted, owner: owner,
            start : start, limit : limit } 
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);
    return resp;
}


export const getBuyOffersBy = async (
    sell_offer_id: string,
    accepted? : boolean,  
    start? : number, limit?: number, 
    queryHandler? : any ) :Promise<BuyOffersWithParamsResponse> =>{

    const _msg = {
        get_buy_offers_by : {sell_offer_id : sell_offer_id, accepted : accepted, 
            start : start, limit : limit } 
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);
    return resp;
}




export const getCollectionIndexes = async (
    category? : string, 
    minNumOfSalesOffer? : number, 
    start? : number, limit?: number, 
    queryHandler? : any ) :Promise<CollectionIndexesWithParamsResponse> =>{

    const _msg = {
        get_collection_indexes : {category : category,
            min_num_of_sales_offer: minNumOfSalesOffer,
            start : start, limit : limit } 
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);
    return resp;
}


export const getCollectionIndex = async (id : string, 
    queryHandler? : any ) :Promise<CollectionIndexResponse> =>{

    const _msg = {
        get_collection_index : {id : id } 
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);
    return resp;
}



export const getCreateSellOfferFee = async (queryHandler? : any) : Promise<Coin> =>{
    return await getRequiredFee("CREATE_SELL_OFFER_FEE", MARKET_CONTRACT_ADDR, queryHandler);
}


export const getCreateBuyOfferFee = async (queryHandler? : any) : Promise<Coin> =>{
    return await getRequiredFee("CREATE_BUY_OFFER_FEE", MARKET_CONTRACT_ADDR, queryHandler);
}
