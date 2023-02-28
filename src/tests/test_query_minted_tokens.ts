// npx ts-node src/tests/test_query_minted_tokens.ts
import { getMintedTokensByOwner } from "../handlers/query";

getMintedTokensByOwner("archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x").then(c=>{
    console.log("Minted Tokens By Owner::", c);
})
