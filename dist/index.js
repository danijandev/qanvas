const qanvas = {
    _items: new Map()
};
function Q(...items) {
    let parsedItems = [];
    if (items.length === 0) {
        return qanvas;
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const parsedItem = qanvas._items.get(item);
        if (!parsedItem) {
            throw new Error("qanvas: Cannot parse item!");
        }
        parsedItems.push(parsedItem);
    }
    if (parsedItems.length === 1) {
        return parsedItems[0];
    }
    else {
        return parsedItems;
    }
    return qanvas;
}
export default Q;
