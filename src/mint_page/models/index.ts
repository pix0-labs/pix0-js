import { Attribute } from "../../collection/models";

export interface MintPage {
    
     id? : string, 

     owner?: string,

     collection_name : string,

     collection_symbol : string, 

     description? :string,

     attributes? :Attribute[], 

     page_template? : number ,
    
     date_created? : number ,

     date_updated? : number ,
}

