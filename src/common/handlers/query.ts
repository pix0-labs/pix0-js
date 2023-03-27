import { ArchwayClient } from '@archwayhq/arch3.js';
import { NETWORK} from '../config';
import { ContractInfo, Coin, LogInfo } from '../models';

export const query = async (msg : any , queryHandler? : any, 
    contractAddress : string = "" ) : Promise<any> =>{
   
    if ( queryHandler ) {

        let result = await queryHandler(contractAddress, msg);
        return result;
    }
    else {

        const client = await ArchwayClient.connect(NETWORK.endpoint);

        const result = await client.queryContractSmart(
            contractAddress,
            msg
        );

        return result;
    }
}



export const getContractInfo = async (contract_address : string, queryHandler? : any ) :Promise<ContractInfo> =>{

    const _msg = {
        get_contract_info: {},
    };
    
    const res = await query(_msg, queryHandler, contract_address);

    return res.contract_info;
}



export const getRequiredFee = async (feeName : string, contract_address : string, queryHandler? : any) : Promise<Coin> =>{

    let cinfo = await getContractInfo(contract_address, queryHandler);

    let fee0 = cinfo.fees.filter(f=>{return f.name === feeName})[0];

    let fee  : Coin = fee0 ?  fee0.value : {amount : "10000", denom : "uconst"};

    return fee ;
}



export const getLogInfo = async (contract_address : string,queryHandler? : any  ) :Promise<LogInfo> =>{

    const _msg = {
        get_log_info: {},
    };
    
    const res = await query(_msg, queryHandler, contract_address);

    return res.info;
}