import { User  } from '../models';
import { USER_CONTRACT_ADDR } from '../config';
import { execute, SigningClient} from '../../common';
import { getCreateUserFee } from './query';
import { COLLECTION_CONTRACT_ADDR } from '../../collection/config';

export const USE_NFT_AS_PROFILE_IMG = 1;


export const defaultedToCollectionContractAddr = (user : User) => {


    if (user.profile_image !== undefined && user.profile_image.pic_type === USE_NFT_AS_PROFILE_IMG) {

        if ( user.profile_image.contract_addr === undefined) {

            user.profile_image.contract_addr = COLLECTION_CONTRACT_ADDR;
        }   
    }

}

export const createUser = async ( user : User, walletAddress : string,
    client : SigningClient, queryHandler? : any   ) : Promise<string|Error> =>{

    try {

        let fee = await getCreateUserFee(queryHandler);

        defaultedToCollectionContractAddr(user);

        const msg = {
            create_user: { user_name : user.user_name,
                first_name : user.first_name,
                last_name : user.last_name,
                email : user.email,
                mobile : user.mobile,
                bio : user.bio, 
                profile_image : user.profile_image,
                preferences : user.preferences,
                status : user.status, 
            },
        };

        const tx = await execute(msg, walletAddress, client, fee , USER_CONTRACT_ADDR, "Create User" );
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}



export const updateUser = async ( user : User, walletAddress : string,
    client : SigningClient  ) : Promise<string|Error> =>{

    try {

        defaultedToCollectionContractAddr(user);

        const msg = {
            update_user: { 
                first_name : user.first_name,
                last_name : user.last_name,
                email : user.email,
                mobile : user.mobile,
                bio : user.bio, 
                profile_image : user.profile_image,
                preferences : user.preferences,
                status : user.status, 
            },
        };

        const tx = await execute(msg, walletAddress, client, undefined , USER_CONTRACT_ADDR, "Update User" );
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}


export const withdrawRewards = async ( walletAddress : string,
    client : SigningClient  ) : Promise<string|Error> =>{

    try {

        const msg = {
            withdraw_rewards: {}
        };

        const tx = await execute(msg, walletAddress, client, undefined , USER_CONTRACT_ADDR, "Withdraw Rewards" );
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}



export const withdrawTokenRewards = async ( walletAddress : string,
    client : SigningClient  ) : Promise<string|Error> =>{

    try {

        const msg = {
            withdraw_token_rewards: {}
        };

        const tx = await execute(msg, walletAddress, client, undefined , USER_CONTRACT_ADDR, 
            "Withdraw Token Rewards" );
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}
