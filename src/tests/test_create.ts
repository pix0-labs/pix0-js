// npx ts-node src/tests/test_create.ts
import { createCollection, walletFromMnemonic } from "../handlers/ins";
import { extractWallet} from "../utils";
import { COLLECTION_STATUS_ACTIVATED , PriceType, PRICE_TYPE_STANDARD} from "../models";

testCreateCollection();

async function testCreateCollection() {

    let wallet = extractWallet();

    if (wallet) {

        let prices : PriceType[] = [{
            price_type : PRICE_TYPE_STANDARD, value : 125,
        }];

        let res = await createCollection({
            name : "Test NFT Collection 2",
            symbol : "TNFT2",
            prices : prices,
            status : COLLECTION_STATUS_ACTIVATED, 
            }, await walletFromMnemonic(wallet.mnemonic), wallet.address );
        
        console.log("Collection created with result:", res);
    
    }
    else {

        console.error("Undefined wallet, please prepare a wallet.json file in your home directory!");

    }
}





