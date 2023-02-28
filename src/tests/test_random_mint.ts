// npx ts-node src/tests/test_random_mint.ts

import { randomMintItem } from "../handlers/ins";
import { extractWallet} from "../utils";
import { walletFromMnemonic } from "../handlers/ins";
import { TX_URL_PREFIX } from "../config";

randomMint();

async function randomMint() {

    let wallet = extractWallet();

    let tx = await randomMintItem({
        collection_owner: "archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x", 
        collection_name: "Test NFT Collection 2",
        collection_symbol: "TNFT2"
    }, await walletFromMnemonic(wallet.mnemonic), wallet.address);

    if (tx instanceof Error){
        console.log("Error@Item.minted@::", (tx as Error).message);
    }
    else {
        console.log("Item.minted@::", `${TX_URL_PREFIX}${tx}` );
    }
}