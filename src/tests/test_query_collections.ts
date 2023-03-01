// npx ts-node src/tests/test_query_collections.ts
import { getCollections } from "../handlers/query";
import { extractWallet } from "../utils";

let wallet = extractWallet();

getCollections(wallet.address).then(c=>{
    
    console.log("Collections::");
    c.forEach((cc, idx)=>{

        console.log(idx, cc);
    })
})
