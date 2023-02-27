import { ArchwayClient } from '@archwayhq/arch3.js';
import { NETWORK , COLLECTION_CONTRACT_ADDR} from '../config';
import { Collection } from '../models';
require('dotenv').config();

export const getAllCollections = async () :Promise<Collection[]> =>{

    const client = await ArchwayClient.connect(NETWORK.endpoint);

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

