import { USER_CONTRACT_ADDR} from '../config';
import { User  } from '../models';
import { query, LogInfo, getRequiredFee, 
    getLogInfo as commonLogInfo , Coin,
    getContractInfo as commonContractInfo, ContractInfo } from '../../common';

export const getUser = async (owner : string , queryHandler? : any  ) :Promise<User> =>{

    const _msg = {
        get_user: {address : owner},
    };
    
    const res = await query(_msg, queryHandler, USER_CONTRACT_ADDR);

    return res.user;
}

export const getUsers = async (queryHandler? : any  ) :Promise<User[]> =>{

    const _msg = {
        get_users: {},
    };
    
    const res = await query(_msg, queryHandler, USER_CONTRACT_ADDR);

    return res.users ;
}


export const getUserLogInfo = async (queryHandler? : any  ) :Promise<LogInfo> =>{

   return await commonLogInfo(USER_CONTRACT_ADDR, queryHandler);
}


export const getCreateUserFee = async (queryHandler? : any) : Promise<Coin> =>{
    return await getRequiredFee("CREATE_USER_FEE", USER_CONTRACT_ADDR, queryHandler);
}



export const getUserContractInfo = async (queryHandler? : any  ) :Promise<ContractInfo> =>{

    return await commonContractInfo(USER_CONTRACT_ADDR, queryHandler);
 }
 
 