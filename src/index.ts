const TYPE_RECT: number = 1;

interface Item {
    _type?: number;
    _color: string;
    x: number;
    y: number;
    pos(x: number, y: number): Item;
    setx(x: number): Item;
    sety(y: number): Item;
    addpos(x: number, y: number): Item;
    addx(x: number): Item;
    addy(y: number): Item;
    subpos(x: number, y: number): Item;
    subx(x: number): Item;
    suby(y: number): Item;
    rect(x?: number, y?: number, width?: number, height?: number): Rect;
    back(): Qanvas;
}

interface Rect extends Item {
    _type?: typeof TYPE_RECT;
    width: number;
    height: number;
    size(width: number, height: number): Rect;
    setwidth(width: number): Rect;
    setheight(height: number): Rect;
    clear(): Rect;
    draw(): Rect;
}

interface Qanvas {
    _canvas?: HTMLCanvasElement;
    _context?: CanvasRenderingContext2D;
    width?: number;
    height?: number;
    _items: Map<string, Item>;
    _defaultColor: string;
    _defaultPos: number;
    _defaultSize: number;
    set(selector: string): Qanvas;
    clear(): Qanvas;
}

const qanvas: Qanvas = {
    _items: new Map(),
    _defaultColor: "black",
    _defaultPos: 0,
    _defaultSize: 0,
    set(selector: string) {
        const canvas = document.querySelector(selector) as HTMLCanvasElement;
        
        this._context = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.width = canvas.width;
        this.height = canvas.height;
        this._canvas = canvas;
        
        return this;
    },
    clear() {
        if (!this._context) {
            throw new Error("qanvas: No context to use!");
        }
        
        if (!this.width || !this.height) {
            throw new Error("qanvas: No set width and height!");
        }
        
        this._context.clearRect(0, 0, this.width, this.height);
        
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
                pos(x: number, y: number) {
                    this.x = x;
                    this.y = y;
                    
                    return this;
                },
                setx(x: number) {
                    this.x = x;
                    
                    return this;
                },
                sety(y: number) {
                    this.y = y;
                    
                    return this;
                },
                addpos(x: number, y: number) {
                    this.x = x;
                    this.y = y;
                    
                    return this;
                },
                addx(x: number) {
                    this.x += x;
                    
                    return this;
                },
                addy(y: number) {
                    this.y += y;
                    
                    return this;
                },
                subpos(x: number, y: number) {
                    this.x -= x;
                    this.y -= y;
                    
                    return this;
                },
                subx(x: number) {
                    this.x -= x;
                    
                    return this;
                },
                suby(y: number) {
                    this.y -= y;
                    
                    return this;
                },
                rect(x?: number, y?: number, width?: number, height?: number) {
                    if (this._type) {
                        throw new Error ("qanvas: Item already has a type!");
                    }
                    
                    if (x) {
                        this.x = x;
                    }
                    
                    if (y) {
                        this.y = y;
                    }
                    
                    const newRect: Rect = {
                        ...this,
                        _type: TYPE_RECT,
                        width: width ?? qanvas._defaultSize,
                        height: height ?? qanvas._defaultSize,
                        size(width: number, height: number) {
                            this.width = width;
                            this.height = height;
                            
                            return this;
                        },
                        setwidth(width: number) {
                            this.width = width;
                            
                            return this;
                        },
                        setheight(height: number) {
                            this.height = height;
                            
                            return this;
                        },
                        clear() {
                            if (!qanvasContext) {
                                throw new Error("qanvas: No context to use!")
                            }
                            
                            qanvasContext.clearRect(this.x, this.y, this.width, this.height);
                            
                            return this;
                        },
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
                },
                back() {
                    return qanvas;
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