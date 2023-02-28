// npx ts-node src/tests/test_query_items.ts
import { getItems, getItemsCount } from "../handlers/query";
import { extractWallet } from "../utils";

let wallet = extractWallet();

getItemsCount(wallet.address, "Test NFT Collection 2", "TNFT2").then(c=>{
    console.log("Number of Items In Collections::", c);
})

getItems(wallet.address, "Test NFT Collection 2", "TNFT2").then(itms=>{
    console.log("Items In Collections::");
    itms.forEach((i,idx)=>{
        console.log(idx, "Item:::", i);
    })
})