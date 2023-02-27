// npx ts-node src/tests/test_create.ts
import { createCollection, walletFromMnemonic } from "../handlers/ins";
import { extractWallet, extractWalletFromEnv } from "../utils";

testCreateCollection();

async function testCreateCollection() {

    let wallet = extractWalletFromEnv();

    if (wallet) {

        let res = await createCollection({
            name : "Test NFT Collection 1",
            symbol : "TNFT",
            }, await walletFromMnemonic(wallet.mnemomic), wallet.address );
        
        console.log("Collection created with result:", res);
    
    }
    else {

        console.error("Undefined wallet, please prepare a wallet.json file in your home directory!");

    }
}





