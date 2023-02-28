// npx ts-node src/tests/test_random_mint.ts

import { randomMintItem } from "../handlers/ins";
import { extractWallet} from "../utils";
import { walletFromMnemonic } from "../handlers/ins";

randomMint();

async function randomMint() {

    let wallet = extractWallet();

    let tx = await randomMintItem({
        collection_owner: "archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x", 
        collection_name: "Test NFT Collection 1",
        collection_symbol: "TNFT"
    }, await walletFromMnemonic(wallet.mnemonic), wallet.address);

    console.log("Item.minted.result::", tx);
}