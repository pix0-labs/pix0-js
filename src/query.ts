import { ArchwayClient } from '@archwayhq/arch3.js';
import { RPC_URL } from './config';
import { Collection } from './models';
require('dotenv').config();

export const COLLECTION_CONTRACT_ADDR="archway1escrsledtwml55h23q6mewy52klrpl6ckktzucjg8qtefgmlrzfsp383uz";

export const getAllCollections = async () :Promise<Collection[]> =>{

    const client = await ArchwayClient.connect(RPC_URL);

    const contractAddress = COLLECTION_CONTRACT_ADDR;

    const msg = {
        get_all_collections: {},
    };
    
    const collections = await client.queryContractSmart(
        contractAddress,
        msg
    );

    return collections.collections;
}

