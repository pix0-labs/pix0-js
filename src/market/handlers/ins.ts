import { Coin } from "../../common";
import { execute, SigningClient } from '../../common/';
import { MARKET_CONTRACT_ADDR } from "../config";
import { SellOffer, BuyOffer } from "../models";
import { getCreateSellOfferFee, getCreateBuyOfferFee } from "./query";

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


export const createSellOffer = async (sell_offer : SellOffer, 
    walletAddress : string, client : SigningClient,  queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        let fee = await getCreateSellOfferFee(queryHandler);

        const msg = {
            create_sell_offer: {offer :sell_offer},
        };

        const tx = await execute(msg, walletAddress, client, fee , MARKET_CONTRACT_ADDR, "Create Sell Offer");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}


export const updateSellOffer = async (sell_offer : SellOffer, 
    walletAddress : string, client : SigningClient) : Promise<string|Error> =>{

    try {
        const msg = {
            update_sell_offer: {offer :sell_offer},
        };

        const tx = await execute(msg, walletAddress, client, undefined , MARKET_CONTRACT_ADDR, "Update Sell Offer");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}


export const cancelSellOffer = async (token_id : string , 
    walletAddress : string, client : SigningClient  ) : Promise<string|Error> =>{

    try {

        const msg = {
            cancel_sell_offer: {token_id : token_id},
        };

        const tx = await execute(msg, walletAddress, client, undefined , MARKET_CONTRACT_ADDR, "Cancel Sell Offer");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}



export const createBuyOffer = async (
    buy_offer : BuyOffer, 
    sell_offer_id : string, 
    walletAddress : string, client : SigningClient,  queryHandler? : any  ) : Promise<string|Error> =>{

    try {

        let fee = await getCreateBuyOfferFee(queryHandler);

        const msg = {
            create_buy_offer: {buy_offer :buy_offer, sell_offer_id : sell_offer_id},
        };

        const tx = await execute(msg, walletAddress, client, fee , MARKET_CONTRACT_ADDR, "Create Buy Offer");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}



export const updateBuyOffer = async (
    buy_offer : BuyOffer, 
    sell_offer_id : string, 
    walletAddress : string, client : SigningClient ) : Promise<string|Error> =>{

    try {

        const msg = {
            update_buy_offer: {buy_offer :buy_offer, sell_offer_id : sell_offer_id},
        };

        const tx = await execute(msg, walletAddress, client, undefined , MARKET_CONTRACT_ADDR, "Update Buy Offer");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}


export const cancelBuyOffer = async (
    sell_offer_id : string, 
    walletAddress : string, client : SigningClient ) : Promise<string|Error> =>{

    try {

        const msg = {
            cancel_buy_offer: {sell_offer_id : sell_offer_id},
        };

        const tx = await execute(msg, walletAddress, client, undefined , MARKET_CONTRACT_ADDR, "Cancel Buy Offer");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}


export const acceptBuyOffer = async (
    sell_offer_id : string, 
    buy_offer_by : string, 
    walletAddress : string, client : SigningClient ) : Promise<string|Error> =>{

    try {

        const msg = {
            accept_buy_offer: {sell_offer_id : sell_offer_id, buy_offer_by : buy_offer_by},
        };

        const tx = await execute(msg, walletAddress, client, undefined , MARKET_CONTRACT_ADDR, "Accept Buy Offer");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}

export const directBuy = async (
    sell_offer_id : string, 
    walletAddress : string, client : SigningClient ) : Promise<string|Error> =>{

    try {

        const msg = {
            direct_buy: {sell_offer_id : sell_offer_id },
        };

        const tx = await execute(msg, walletAddress, client, undefined , MARKET_CONTRACT_ADDR, "Direct Buy");
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}
