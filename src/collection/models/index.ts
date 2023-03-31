import { Coin } from "../../common";

export interface Attribute {

    name : string,

    value : string, 
}

export const PRICE_TYPE_STANDARD : number = 1;

export const PRICE_TYPE_WL : number = 2;

export const PRICE_TYPE_OG : number = 3;

export interface PriceType {

    price_type : number , 

    value : Coin , 

    date_start? : number,

    date_end? : number,  
}

export interface CollectionInfo {

    collection_owner : string,
    
    collection_name: string, 
    
    collection_symbol: string,

    price_type? : number, 

}

export interface Royalty{

    wallet : string, 

    percentage : number, 

    name? : string,
}



export const COLLECTION_STATUS_DRAFT : number = 0;

export const COLLECTION_STATUS_ACTIVATED : number = 1;

export const COLLECTION_STATUS_DEACTIVATED : number = 2;



export interface Collection {

    owner? : string,

    name : string ,

    symbol : string, 

    description? :string ,

    treasuries?: Treasury[],

    attributes? : Attribute[],

    prices? : PriceType[],

    royalties? : Royalty[],

    status?: number, 

    date_created? : number,

    date_updated? : number,
}


export interface Treasury {

    wallet : string , 

    percentage : number, 

    name? : string, 
}


export const LINK_TYPE_IMAGE_URL : number = 1;
 
export const LINK_TYPE_EXTERNAL_LINK : number = 2;

export const LINK_TYPE_VIDEO_URL : number = 3;

export const LINK_TYPE_ANIMATION_URL : number = 4;


export interface Link {

    link_type : number,

    value : string, 
}


export interface Item {
   
    collection_owner : string,

    collection_name : string, 

    collection_symbol : string, 
    
    name : string,

    description? : string,

    links : Link[],

    traits : Trait[],

    background_color? : string,

    date_created? : number,

    date_updated? : number,

}


export interface Trait {
    
    display_type?: string,

    trait_type: string,

    value: string,
}

export interface Metadata {
    
    image? : string ,
    
    image_data?: string,

    external_url?: string,

    description? : string ,

    name?: string ,

    attributes?: Trait[],

    background_color?: string,

    animation_url?: string,

    youtube_url?: string,
}

export interface Nft {

    token_uri? : string,

    extension : Metadata,
}


export interface CollectionsWithParamsResponse {

    collections : Collection[],

    start? : number, 

    limit? : number,

    total? : number, 
}