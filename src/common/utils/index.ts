import { DENOM , COINS_MINIMAL_DENOM} from "../config"
import { coins as pCoins, coin as pCoin } from "@cosmjs/proto-signing";
import { Coin } from "../models";

export const toUcoin = (value : number, denom : string = DENOM, decimalPlaces : number = 6 ) : number =>{

    if ( denom === DENOM) {
        return value * Math.pow(10, 6);
    }
    else {
        return value * Math.pow(10,decimalPlaces);
    }
}


export const toCoin = (value : number, denom : string = COINS_MINIMAL_DENOM, decimalPlaces : number = 6) : number  =>{

    if ( denom === COINS_MINIMAL_DENOM) {

        return value / Math.pow(10, 6);
    }
    else {

        return value / Math.pow(10, decimalPlaces);
        
    }
}


export const toCoinStr = (value : number, displayDecimalPlaces : number = 3, 
    denom : string = COINS_MINIMAL_DENOM, decimalPlaces : number = 6) : string =>{


    return toCoin(value, denom, decimalPlaces).toFixed(displayDecimalPlaces);
}


/*
Wrapper function of coin
*/
export const coin = (amount : string|number, denom : string) : Coin =>{

    return pCoin(amount, denom);
}

/*
Wrapper function of coins
*/
export const coins = (amount : string|number, denom : string) : Coin[] =>{

    return pCoins(amount, denom);
}