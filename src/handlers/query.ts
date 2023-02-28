import { ArchwayClient } from '@archwayhq/arch3.js';
import { NETWORK , COLLECTION_CONTRACT_ADDR} from '../config';
import { Collection } from '../models';
require('dotenv').config();

export const getCollections = async (owner : string) :Promise<Collection[]> =>{

    const client = await ArchwayClient.connect(NETWORK.endpoint);

    const contractAddress = COLLECTION_CONTRACT_ADDR;

    const msg = {
        get_collections: {owner : owner},
    };
    
    const collections = await client.queryContractSmart(
        contractAddress,
        msg
    );

    return collections.collections;
}

