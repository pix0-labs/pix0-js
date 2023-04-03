import { query, Coin } from "../../common";
import { MARKET_CONTRACT_ADDR } from "../config";

export const getBalanceOfEscrow = async (denom : String,
    queryHandler? : any ) :Promise<Coin> =>{

    const _msg = {
       denom : denom ,
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);

    return resp.amount;
}
