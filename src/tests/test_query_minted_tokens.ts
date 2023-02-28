// npx ts-node src/tests/test_query_minted_tokens.ts
import { getMintedTokensByOwner, getNftTokenInfo } from "../handlers/query";

mintedTokens();

async function mintedTokens() {

    getMintedTokensByOwner("archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x").then(toks=>{
   
        toks.forEach(async (t,i)=>{
            
            let nft = await getNftTokenInfo(t);
            console.log(i,t, nft );
        });
    });
    
}
