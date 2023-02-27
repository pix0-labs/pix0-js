// npx ts-node src/tests/test_query.ts
import { getAllCollections } from "../handlers/query";

getAllCollections().then(c=>{
    
    console.log("Collections::",c);
})
