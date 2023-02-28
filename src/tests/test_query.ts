// npx ts-node src/tests/test_query.ts
import { getCollections } from "../handlers/query";

getCollections("archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x").then(c=>{
    
    console.log("Collections::",c);
})
