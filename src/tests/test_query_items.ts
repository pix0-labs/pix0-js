// npx ts-node src/tests/test_query_items.ts
import { getItems } from "../handlers/query";

getItems("archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x", "Test NFT Collection 1", "TNFT").then(c=>{
    console.log("Items In Collections::",c);
})