import { query, Coin } from "../../common";
import { MARKET_CONTRACT_ADDR } from "../config";

export const getBalanceOfEscrow = async (denom : String,
    queryHandler? : any ) :Promise<Coin> =>{

    const _msg = {
        get_balance_of_escrow : { denom :denom} ,
    };
    
    const resp = await query(_msg, queryHandler,MARKET_CONTRACT_ADDR);

    return resp.amount;
}
