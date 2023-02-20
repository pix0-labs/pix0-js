import { ArchwayClient } from '@archwayhq/arch3.js';
import { RPC_URL } from './config';
import { Collection } from './models';
require('dotenv').config();

const COLLECTION_CONTRACT_ADDR = process.env.COLLECTION_CONTRACT_ADDR;

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

