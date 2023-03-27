import { User  } from '../models';
import { USER_CONTRACT_ADDR } from '../config';
import { execute, SigningClient} from '../../common';
import { getCreateUserFee } from './query';

export const createUser = async ( user : User, walletAddress : string,
    client : SigningClient, queryHandler? : any   ) : Promise<string|Error> =>{

    try {

        let fee = await getCreateUserFee(queryHandler);

        const msg = {
            create_user: { user_name : user.user_name,
                first_name : user.first_name,
                last_name : user.last_name,
                email : user.email,
                mobile : user.mobile,
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

        const msg = {
            update_user: { 
                first_name : user.first_name,
                last_name : user.last_name,
                email : user.email,
                mobile : user.mobile,
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
