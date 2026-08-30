const DEFAULT_POS = 0;
const DEFAULT_SIZE = 0;
const TYPE_RECT = 1;

interface Qanvas {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    items: Map<string, Item>;
    set(selector: string): Qanvas;
    get(name: string): Item;
    rect(name: string, x?: number, y?: number, width?: number, height?: number): Item | undefined;
}

interface Item {
    type: number;
    x: number;
    y: number;
    width: number;
    height: number;
    pos(x: number, y: number): Item;
}

interface Rect extends Item {
    type: typeof TYPE_RECT;
    size(width: number, height: number): Rect;
}

const qanvas: Qanvas = {
    items: new Map(),
    set(selector: string) {
        const canvas = document.querySelector(selector) as HTMLCanvasElement;
        
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.canvas = canvas;
        
        return this;
    },
    get(name: string) {
        const item: Item | undefined = this.items.get(name);
        
        if (!item) {
            throw new Error(`qanvas: ${name} does not exist!`);
        }
        
        return item;
    },
    rect(name: string, x?: number, y?: number, width?: number, height?: number) {
        const rect: Item | undefined = this.items.get(name);
        
        if (!rect) {
            const newRect = {
                type: TYPE_RECT,
                x: x ?? DEFAULT_POS,
                y: y ?? DEFAULT_POS,
                width: width ?? DEFAULT_SIZE,
                height: height ?? DEFAULT_SIZE,
                pos(x: number, y: number) {
                    this.x = x;
                    this.y = y;
                    
                    return this;
                },
                size(width: number, height: number) {
                    this.width = width;
                    this.height = height;
                    
                    return this;
                }
            }
            
            this.items.set(name, newRect);
            
            return newRect;
        }
        
        if (rect.type !== TYPE_RECT) {
            throw new Error(`qanvas: ${name} is not a rect!`);
        }
        
        return rect;
    }
};

export default qanvas;