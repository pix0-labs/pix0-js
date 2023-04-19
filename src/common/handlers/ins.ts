import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions } from '@cosmjs/proto-signing';
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { NETWORK, DENOM, COINS_MINIMAL_DENOM} from '../config';
import { Coin } from '../models';


export const walletFromMnemonic = async (mnemonic: string, options: Partial<DirectSecp256k1HdWalletOptions> =
    { prefix: NETWORK.prefix }) : Promise<DirectSecp256k1HdWallet>=>{

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, options);
    return wallet;
}

export type SigningClient = SigningArchwayClient | SigningCosmWasmClient;


const convertToCoins = (fees :Coin|Coin[]|undefined ) : Coin[] => {

    if (fees !== undefined) {

        if (Array.isArray(fees)) {

            return fees ;
        }
        else {

            return [fees];
        }
    }
    else {

        return undefined;
    }
}

export const execute = async (msg : any,  
    walletAddress : string , 
    client : SigningClient, 
    fees? : Coin|Coin[]|undefined, 
    contractAddress : string = "",
    memo? : string,
    gasValue? : number   ) : Promise<string|Error> =>{

    let gasPrice :any = GasPrice.fromString('0.02' + COINS_MINIMAL_DENOM);

    //GasPrice.fromString('0.005' + COINS_MINIMAL_DENOM);

    let txFee = calculateFee( gasValue ?? 400_000, gasPrice);

    let coins : Coin[]|undefined =  convertToCoins(fees);

    //console.log("converted.coins:::", coins, "txFee:", txFee);

    let tx = await client.execute(walletAddress, contractAddress, msg, 
        txFee, memo, coins );

    return tx.transactionHash; 

}

let defaultSigningClientOptions : any =  { gasPrice: `0.005${DENOM}` };

export const createSigningArchwayClient = async ( wallet : DirectSecp256k1HdWallet,
    endpoint : string = NETWORK.endpoint, prefix : string = NETWORK.prefix ) : Promise<SigningArchwayClient> => {

    const client = await SigningArchwayClient.connectWithSigner(endpoint, wallet, {
        ...defaultSigningClientOptions,
        prefix: prefix,
    });

    return client;
}

export const createSigningClient = async ( mnemonic : string, endpoint : string = NETWORK.endpoint, prefix : string = NETWORK.prefix   ) : Promise<SigningArchwayClient> => {

    let wallet = await walletFromMnemonic(mnemonic);
    return createSigningArchwayClient(wallet, endpoint, prefix);
}

