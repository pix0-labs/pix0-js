export interface Attribute {

    name : string,

    value : string, 
}

export interface PriceType {

    price_type : number , 

    value : number , 

    denom? : string, 

    date_start? : number,

    date_end? : number,  
}


export interface Collection {

    owner? : string,

    name : string ,

    symbol : string, 

    description? :string ,

    treasuries?: Treasury[],

    attributes? : Attribute[],

    prices? : PriceType[],

    status?: number, 

    date_created? : number,

    date_updated? : number,
}


export interface Treasury {

    wallet : string , 

    percentage : number, 

    name? : string, 
}


export interface Link {

    link_type : number,

    value : string, 
}



