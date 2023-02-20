export interface Collection {

    owner? : string,

    name : string ,

    symbol : string, 

    description? :string ,

    treasuries?: Treasury[],

    contract_instantiated? : Boolean,

    date_created? : number,

    date_updated? : number,
}


export interface Treasury {

    wallet : string , 

    percentage : number, 

    name? : string, 
}
