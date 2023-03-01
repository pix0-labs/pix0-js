import * as ins from './handlers/ins';
import * as query from './handlers/query';

module.exports = {
    createCollection : ins.createCollection,
    createItem: ins.createItem,
    getCollections: query.getCollections,
    getItems: query.getItems,
    getItemsCount : query.getItemsCount,
};