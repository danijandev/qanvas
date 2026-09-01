const TYPE_RECT = 1;
const qanvas = {
    _items: new Map(),
    _defaultColor: "black",
    _defaultPos: 0,
    _defaultSize: 0
};
function Q(...items) {
    const qanvasItems = qanvas._items;
    let parsedItems = [];
    if (items.length === 0) {
        return qanvas;
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const parsedItem = qanvasItems.get(item);
        if (!parsedItem) {
            const newItem = {
                _color: qanvas._defaultColor,
                x: qanvas._defaultPos,
                y: qanvas._defaultPos,
                rect() {
                    if (this._type) {
                        throw new Error("qanvas: Item already has a type!");
                    }
                    const newRect = {
                        ...this,
                        _type: TYPE_RECT,
                        width: qanvas._defaultSize,
                        height: qanvas._defaultSize
                    };
                    qanvasItems.set(item, newRect);
                    return newRect;
                }
            };
            qanvasItems.set(item, newItem);
            parsedItems.push(newItem);
            continue;
        }
        parsedItems.push(parsedItem);
    }
    if (parsedItems.length === 1) {
        return parsedItems[0];
    }
    return parsedItems;
}
export default Q;
