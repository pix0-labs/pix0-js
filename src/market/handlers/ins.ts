import { Coin } from "../../common";
import { execute, SigningClient } from '../../common/';
import { MARKET_CONTRACT_ADDR } from "../config";

export const testTransferToEscrow = async (amount : Coin, walletAddress : string, client : SigningClient ) : Promise<string|Error> =>{

    try {

        const msg = {
            test_transfer_to_escrow: { coin : amount },
        };

        const tx = await execute(msg, walletAddress, client, amount , MARKET_CONTRACT_ADDR, "Test Transfer To Escrow");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}


export const testTransferFromEscrow = async (recipient :string,
     amount : Coin, walletAddress : string, client : SigningClient ) : Promise<string|Error> =>{

    try {

        const msg = {
            test_transfer_from_escrow: {recipient :recipient, coin : amount },
        };

        const tx = await execute(msg, walletAddress, client, amount , MARKET_CONTRACT_ADDR, "Test Transfer From Escrow");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}