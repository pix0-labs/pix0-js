import { MintPage  } from '../models';
import { MINT_PAGE_CONTRACT_ADDR } from '../config';
import { execute, SigningClient } from '../../common';
import { getCreateMintPageFee } from './query';

export const createMintPage = async (mint_page : MintPage, walletAddress : string,
    client : SigningClient, queryHandler? : any   ) : Promise<string|Error> =>{

    try {

        let fee = await getCreateMintPageFee(queryHandler);

        const msg = {
            create_mint_page: { collection_name : mint_page.collection_name,
            collection_symbol : mint_page.collection_symbol, page_template : mint_page.page_template,
            description : mint_page.description, attributes : mint_page.attributes},
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
                description : mint_page.description, attributes : mint_page.attributes},
        };

       const tx = await execute(msg, walletAddress, client, undefined, MINT_PAGE_CONTRACT_ADDR, "Update Mint Page");
        
       return tx ; 
        
    }
    catch(e : any) {

        return e;
    }
}



