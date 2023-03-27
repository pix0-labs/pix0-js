import { MintPage  } from '../models';
import { MINT_PAGE_CONTRACT_ADDR } from '../config';
import { execute, SigningClient, Coin  } from '../../common';
import { getCreateMintPageFee } from './query';

export const createMintPage = async (mint_page : MintPage, walletAddress : string,
    client : SigningClient, queryHandler? : any   ) : Promise<string|Error> =>{

    try {

        let fee = await getCreateMintPageFee(queryHandler);

        const msg = {
            create_mint_page: { collection_name : mint_page.collection_name,
            collection_symbol : mint_page.collection_symbol, page_template : mint_page.page_template,
            description : mint_page.description, logo_url : mint_page.logo_url},
        };

        const tx = await execute(msg, walletAddress, client, fee , MINT_PAGE_CONTRACT_ADDR, "Create Mint Page" );
        return tx ; 

    }
    catch(e : any) {

        return e;
    }
}



export const updateMintPage = async (mint_page : MintPage, walletAddress : string,
    client : SigningClient  ) : Promise<string|Error> =>{

    try {
        const msg = {
            update_mint_page: { collection_name : mint_page.collection_name,
                collection_symbol : mint_page.collection_symbol, page_template : mint_page.page_template,
                description : mint_page.description, logo_url : mint_page.logo_url},
        };

       const tx = await execute(msg, walletAddress, client, undefined, MINT_PAGE_CONTRACT_ADDR, "Update Mint Page");
        
       return tx ; 
        
    }
    catch(e : any) {

        return e;
    }
}


export const testPayWallets = async (
    wallets : string[], 
    amount : Coin ,

    walletAddress : string,
    client : SigningClient ) : Promise<string|Error> =>{

    try {
        const msg = {
            test_pay_wallets: {wallets: wallets, 
                fee : {amount : `${amount.amount}`, denom : amount.denom} },
        };

       const tx = await execute(msg, walletAddress, client, amount, MINT_PAGE_CONTRACT_ADDR, "Test Pay Wallets");
        
       return tx ; 
        
    }
    catch(e : any) {

        return e;
    }
}

export const testPayTreasuries = async (walletAddress : string,
    client : SigningClient , queryHandler? : any ) : Promise<string|Error> =>{

    try {

       let fee = await getCreateMintPageFee(queryHandler);

       const msg = {
            test_pay_treasuries: {},
       };

       const tx = await execute(msg, walletAddress, client, fee , 
       MINT_PAGE_CONTRACT_ADDR, "Test Pay Treasuries");
        
       return tx ; 
        
    }
    catch(e : any) {

        return e;
    }
}

