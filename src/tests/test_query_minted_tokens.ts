// npx ts-node src/tests/test_query_minted_tokens.ts
import { getMintedTokensByOwner, getNftTokenInfo } from "../handlers/query";
import { extractWallet } from "../utils";

mintedTokens();

async function mintedTokens() {

    let wallet = extractWallet();

    getMintedTokensByOwner(wallet.address).then(toks=>{
   
        toks.forEach(async (t,i)=>{
            
            let nft = await getNftTokenInfo(t);
            console.log(i,t, nft );
        });
    });
    
}
