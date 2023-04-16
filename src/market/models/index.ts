import { Coin } from "../../common";
import { Royalty } from "../../collection/models";

export const SELL_STATUS_NEW : number = 1;

export const SELL_STATUS_CLOSED : number = 2;

export const DEAL_CLOSED_OFFER_ACCEPTED : number = 1;

export const DEAL_CLOSED_AT_DIRECT_BUY : number = 2;


export interface SimpleCollectionInfo {

    owner : string,

    collection_name : string,

    collection_symbol : string, 

    category? : string,

    royalties? : Royalty[], 
}

export interface CollectionIndex {

    collection_info : SimpleCollectionInfo,

    id : string, 

    number_of_sell_offers : number, 

}


export interface SellOffer {

     token_id : string, 

     owner : string,

     offer_id? : string,

     collection_info? :SimpleCollectionInfo,

     price : Coin, 

     allowed_direct_buy : boolean,

     contract_addr : string, 

     status : number, 

     deal_close_type? : number , 

     date_created? : number,
    
     date_updated? : number,
}

export interface SellOffersWithParamsResponse {

    offers : SellOffer[],

    start? : number, 

    limit? : number,

    total? : number, 
}

export interface BuyOffer {

     owner : string,

     sell_offer_id : string,
    
     price : Coin, 

     accepted : boolean, 

     date_created? : number,
    
     date_updated? : number,
    
}


export interface BuyOffersWithParamsResponse {

    offers : BuyOffer[],

    start? : number, 

    limit? : number,

    total? : number, 
}


export interface CollectionIndexesWithParamsResponse {
    
    collection_indexes : CollectionIndex[],

    total? : number,

    start? : number,

    limit? : number,
}


export interface CollectionIndexResponse {

    collection_index? : CollectionIndex,
}