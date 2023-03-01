// npx ts-node src/tests/test_remove_collection.ts
import { removeCollection, walletFromMnemonic } from "../handlers/ins";
import { extractWallet} from "../utils";
import { TX_URL_PREFIX } from "../config";

testRemoveCollection();

async function testRemoveCollection() {

    let wallet = extractWallet();

    if (wallet) {
       
        let res = await removeCollection({
            name : "Test NFT Collection 2",
            symbol : "TNFT2" }, await walletFromMnemonic(wallet.mnemonic), wallet.address );
        
        console.log("Collection removed with result:", `${TX_URL_PREFIX}${res}`);
    
    }
    else {

        console.error("Undefined wallet, please prepare a wallet.json file in your home directory!");

    }
}





