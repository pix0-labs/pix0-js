// npx ts-node src/tests/test_loop_create_items.ts

import { createItem } from "../handlers/ins";
import { walletFromMnemonic } from "../handlers/ins";
import { LINK_TYPE_IMAGE_URL } from "../models";
import { extractWallet} from "../utils";

loopCreateItems();

async function loopCreateItems() {

    const images = [
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg",
        "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=",
        "https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCQwn4a_TR68qjoCIrzfFtBnUmnd0KvnsG7A&usqp=CAU",
    ];
    

    let wallet = extractWallet();


    for ( var r= 0; r < images.length; r++){

        let name = `TNFT2 Item #00${r}`;
        let desc = `Test NFT Item #00${r} with beautiful image`;

        let links = [{
            link_type : LINK_TYPE_IMAGE_URL,
            value : images[r]
        }];

        let tx = await createItem({
            name : name,
            collection_name : "Test NFT Collection 2",
            collection_symbol: "TNFT2",
            collection_owner : wallet.address,
            description : desc,
            links: links,
            traits: [],
        }, await walletFromMnemonic(wallet.mnemonic), wallet.address);

        if (tx instanceof Error){

            console.log(r, "Errot@Items.created::", (tx as Error).message);
   
        }
        else {
            console.log(r, "Items.created:: tx:", tx);
        }
    }

}