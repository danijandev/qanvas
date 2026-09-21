const TYPE_RECT = 1;
const DEFAULT_POS = 0;
const DEFAULT_SIZE = 0;
const DEFAULT_COLOR = "rgb(0, 0, 0)";

interface Qanvas {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    width?: number;
    height?: number;
    items: Map<string, Item>;
    set(selector: string): Qanvas;
    clear(): Qanvas;
}

class Item {
    protected type?: number;
    protected _color: string;
    
    constructor(protected name: string, public x: number, public y: number, color: string) {
        this._color = color;
    }
    
    pos(x: number, y: number): this {
        this.x = x;
        this.y = y;
        
        return this;
    }
    
    setx(x: number): this {
        this.x = x;
        
        return this;
    }
    
    sety(y: number): this {
        this.y = y;
        
        return this;
    }
    
    addpos(x: number, y: number): this {
        this.x += x;
        this.y += y;
        
        return this;
    }
    
    addx(x: number): this {
        this.x += x;
        
        return this;
    }
    
    addy(y: number): this {
        this.y += y;
        
        return this;
    }
    
    subpos(x: number, y: number): this {
        this.x -= x;
        this.y -= y;
        
        return this;
    }
    
    subx(x: number): this {
        this.x -= x;
        
        return this;
    }
    
    suby(y: number): this {
        this.y -= y;
        
        return this;
    }
    
    color(color: string): this {
        this._color = color;
        
        return this;
    }
    
    rect(x?: number, y?: number, width?: number, height?: number): Rect {
        if (this.type) {
            throw new Error("qanvas: Cannot convert Item to Rect as Item already has a type!");
        }
        
        const newRect: Rect = new Rect(this.name, x ?? this.x, y ?? this.y, width ?? DEFAULT_SIZE, height ?? DEFAULT_SIZE, this._color);
        
        qanvas.items.set(this.name, newRect);
        
        return newRect;
    }
    
    back(): Qanvas {
        return qanvas;
    }
}

class Rect extends Item {
    type = TYPE_RECT;
    
    constructor(name: string, x: number, y: number, public width: number, public height: number, color: string) {
        super(name, x, y, color);
    }
    
    size(width: number, height: number): this {
        this.width = width;
        this.height = height;
        
        return this;
    }
    
    setwidth(width: number): this {
        this.width = width;
        
        return this;
    }
    
    setheight(height: number): this {
        this.height = height;
        
        return this;
    }
    
    addsize(width: number, height: number): this {
        this.width += width;
        this.height += height;
        
        return this;
    }
    
    addwidth(width: number): this {
        this.width += width;
        
        return this;
    }
    
    addheight(height: number): this {
        this.height += height;
        
        return this;
    }
    
    subsize(width: number, height: number): this {
        this.width -= width;
        this.height -= height;
        
        return this;
    }
    
    subwidth(width: number): this {
        this.width -= width;
        
        return this;
    }
    
    subheight(height: number): this {
        this.height -= height;
        
        return this;
    }
    
    clear(): this {
        if (!qanvas.context) {
            throw new Error("qanvas: No context to use!");
        }
        
        qanvas.context.clearRect(this.x, this.y, this.width, this.height);
        
        return this;
    }
    
    draw(): this {
        if (!qanvas.context) {
            throw new Error("qanvas: No context to use!");
        }
        
        qanvas.context.fillStyle = this._color;
        qanvas.context.fillRect(this.x, this.y, this.width, this.height);
        
        return this;
    }
}

const qanvas: Qanvas = {
    items: new Map(),
    set(selector: string) {
        const canvas = document.querySelector(selector) as HTMLCanvasElement;
        
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.width = canvas.width;
        this.height = canvas.height;
        this.canvas = canvas;
        
        return this;
    },
    clear() {
        if (!this.context) {
            throw new Error("qanvas: No context to use!");
        }
        
        if (this.width === undefined || this.height === undefined) {
            throw new Error("qanvas: No width and height to use!");
        }
        
        this.context.clearRect(0, 0, this.width, this.height);
        
        return this;
    }
}

function Q(...items: string[]): Item[] | Item | Qanvas {
    if (items.length === 0) {
        return qanvas;
    }
    
    const qanvasItems: Map<string, Item> = qanvas.items;
    let parsedItems: Item[] = [];
    
    for (let i: number = 0; i < items.length; i++) {
        const item: string = items[i];
        const parsedItem: Item | undefined = qanvasItems.get(item);
        
        if (!parsedItem) {
            const newItem: Item = new Item(item, DEFAULT_POS, DEFAULT_POS, DEFAULT_COLOR);
            
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