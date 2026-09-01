interface Item {
    _type: number;
    _color: string;
    x: 0;
    y: 0;
}

interface Qanvas {
    _items: Map<string, Item>;
}

const qanvas: Qanvas = {
    _items: new Map()
}

function Q(...items: string[]): Item[] | Item | Qanvas {
    let parsedItems: Item[] = [];
    
    if (items.length === 0) {
        return qanvas;
    }
    
    for (let i: number = 0; i < items.length; i++) {
        const item: string = items[i];
        const parsedItem: Item | undefined = qanvas._items.get(item);
        
        if (!parsedItem) {
            throw new Error("qanvas: Cannot parse item!");
        }
        
        parsedItems.push(parsedItem);
    }
    
    if (parsedItems.length === 1) {
        return parsedItems[0];
    }
    
    return parsedItems;
}

export default Q;