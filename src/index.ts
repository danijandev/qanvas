const TYPE_RECT: number = 1;

interface Item {
    _type?: number;
    _color: string;
    x: number;
    y: number;
    rect?(): Rect;
}

interface Rect extends Item {
    _type?: typeof TYPE_RECT;
    width: number;
    height: number;
    draw(): Rect;
}

interface Qanvas {
    _canvas?: HTMLCanvasElement;
    _context?: CanvasRenderingContext2D;
    _items: Map<string, Item>;
    _defaultColor: string;
    _defaultPos: number;
    _defaultSize: number;
    set(selector: string): Qanvas;
}

const qanvas: Qanvas = {
    _items: new Map(),
    _defaultColor: "black",
    _defaultPos: 0,
    _defaultSize: 0,
    set(selector: string) {
        const canvas = document.querySelector(selector) as HTMLCanvasElement;
        
        this._context = canvas.getContext("2d") as CanvasRenderingContext2D;
        this._canvas = canvas;
        
        return this;
    }
}

function Q(...items: string[]): Item[] | Item | Qanvas {
    const qanvasItems: Map<string, Item> = qanvas._items;
    const qanvasContext: CanvasRenderingContext2D | undefined = qanvas._context;
    
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
                y: qanvas._defaultPos,
                rect() {
                    if (this._type) {
                        throw new Error ("qanvas: Item already has a type!");
                    }
                    
                    const newRect: Rect = {
                        ...this,
                        _type: TYPE_RECT,
                        width: qanvas._defaultSize,
                        height: qanvas._defaultSize,
                        draw() {
                            if (!qanvasContext) {
                                throw new Error("qanvas: No context to use!");
                            }
                            
                            qanvasContext.fillStyle = this._color;
                            qanvasContext.fillRect(this.x, this.y, this.width, this.height);
                            
                            return this;
                        }
                    }
                    
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