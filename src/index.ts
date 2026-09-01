interface Item {
    _type?: number;
    _color: string;
    x: number;
    y: number;
}

interface Qanvas {
    _items: Map<string, Item>;
    _defaultColor: string;
    _defaultPos: number;
}

const qanvas: Qanvas = {
    _items: new Map(),
    _defaultColor: "black",
    _defaultPos: 0
}

function Q(...items: string[]): Item[] | Item | Qanvas {
    const qanvasItems: Map<string, Item> = qanvas._items;
    
    let parsedItems: Item[] = [];
    
    if (items.length === 0) {
        return qanvas;
    }
    
    for (let i: number = 0; i < items.length; i++) {
        const item: string = items[i];
        const parsedItem: Item | undefined = qanvasItems.get(item);
        
        if (!parsedItem) {
            const newItem: Item = {
                _color: qanvas._defaultColor,
                x: qanvas._defaultPos,
                y: qanvas._defaultPos
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