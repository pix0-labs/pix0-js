// npx ts-node src/tests/test_update_collection.ts
import { updateCollection, walletFromMnemonic } from "../handlers/ins";
import { extractWallet} from "../utils";
import { COLLECTION_STATUS_DRAFT, COLLECTION_STATUS_ACTIVATED } from "../models";
import { TX_URL_PREFIX } from "../config";

testUpdateCollection();

async function testUpdateCollection() {

    let wallet = extractWallet();

    if (wallet) {

       
        let res = await updateCollection({
            name : "Test NFT Collection 2",
            symbol : "TNFT2",
            status : COLLECTION_STATUS_DRAFT, 
            }, await walletFromMnemonic(wallet.mnemonic), wallet.address );
        
        console.log("Collection updated with result:", `${TX_URL_PREFIX}${res}`);
    
    }
    else {

        console.error("Undefined wallet, please prepare a wallet.json file in your home directory!");

    }
}





