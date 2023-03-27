import { MINT_PAGE_CONTRACT_ADDR } from '../config';
import { MintPage } from '../models';
import {getRequiredFee, LogInfo, query, getLogInfo as commonLogInfo, 
    Coin, getContractInfo as commonContractInfo, ContractInfo } from '../../common';

export const getMintPage = async (msg : {owner : string, collection_name : string, 
    collection_symbol : string}, queryHandler? : any  ) :Promise<MintPage> =>{

    const _msg = {
        get_mint_page: msg,
    };
    
    const res = await query(_msg, queryHandler, MINT_PAGE_CONTRACT_ADDR);

    return res.mint_page;
}


export const getMintPageBy = async (id : string , queryHandler? : any  ) :Promise<MintPage> =>{

    const _msg = {
        get_mint_page_by: {id : id },
    };
    
    const res = await query(_msg, queryHandler, MINT_PAGE_CONTRACT_ADDR);

    return res.mint_page;
}


export const getCreateMintPageFee = async (queryHandler? : any) : Promise<Coin> =>{
    return await getRequiredFee("MINT_PAGE_FEE", MINT_PAGE_CONTRACT_ADDR, queryHandler);
}




export const getMintPageLogInfo = async (queryHandler? : any  ) :Promise<LogInfo> =>{

    return await commonLogInfo(MINT_PAGE_CONTRACT_ADDR, queryHandler);
}



export const getMintPageContractInfo = async (queryHandler? : any  ) :Promise<ContractInfo> =>{

    return await commonContractInfo(MINT_PAGE_CONTRACT_ADDR, queryHandler);
 }
 
 