const defaultPos = 0;
const defaultSize = 0;

interface Qanvas {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    items: Map<string, Rect>;
    set(selector: string): Qanvas;
    get(name: string): Item;
    rect(name: string, x?: number, y?: number, width?: number, height?: number): Rect;
}

interface Item {
    x: number;
    y: number;
    width: number;
    height: number;
    pos(x: number, y: number): Item;
}

interface Rect extends Item {
    type: 1;
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
        let rect: Rect | undefined = this.items.get(name);
        
        if (!rect) {
            rect = {
                type: 1,
                x: x ?? defaultPos,
                y: y ?? defaultPos,
                width: width ?? defaultSize,
                height: height ?? defaultSize,
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
            
            this.items.set(name, rect);
        }
        
        return rect;
    }
};

export default qanvas;