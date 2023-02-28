// npx ts-node src/tests/test_mint_item_by_name.ts
import { mintItemByName } from "../handlers/ins";
import { extractWallet} from "../utils";
import { walletFromMnemonic } from "../handlers/ins";

mint();

async function mint() {

    let wallet = extractWallet();

    let tx = await mintItemByName({
        collection_owner: "archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x", 
        collection_name: "Test NFT Collection 1",
        collection_symbol: "TNFT"
    }, "Item #002", await walletFromMnemonic(wallet.mnemonic), wallet.address);

    console.log("Item.minted.result::", tx);
}