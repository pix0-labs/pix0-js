import { Coin as SCoin} from '@cosmjs/proto-signing';

export interface Coin extends SCoin {}

export interface Fee {

    name : string,

    value : Coin, 
}


export interface ContractInfo {
    
     allowed_admins? : string[],
 
     treasuries? : string[],
 
     fees? : Fee[], 
 
     contracts? : Contract[],
     
     date_created? : number ,
     
     date_updated? : number ,
      
 }


 export interface PaidAmount {

     wallet : string,
 
     amount : {amount : number, denom : string }, 
 
     message? : string , 
 
     date_updated? : number ,
 }


 export interface LogInfo {

     messages : PaidAmount[],
 }

 export interface Contract {

    name : string, 

    address : string, 
 }

