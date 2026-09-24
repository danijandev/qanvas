const TYPE_NONE = 0
const TYPE_RECT = 1
const DEFAULT_POS = 0
const DEFAULT_SIZE = 0
const DEFAULT_COLOR = "black"

interface PrimitiveItem {
    name: string,
    type: string,
    x?: number,
    y?: number,
    color?: string,
    width?: number,
    height?: number
}

class Item {
    constructor(
        public parent: Qanvas,
        public type: number,
        public x: number,
        public y: number,
        public color: string
    ) {}
}

class Rect extends Item {
    constructor(
        parent: Qanvas,
        type: typeof TYPE_RECT,
        x: number,
        y: number,
        color: string,
        public width: number,
        public height: number
    ) {
        super(parent, type, x, y, color)
    }
    
    draw(): this {
        this.parent.context.fillStyle = this.color;
        this.parent.context.fillRect(this.x, this.y, this.width, this.height)
        
        return this;
    }
}

interface Qanvas {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    items: Map<string, Item>
    add(item: PrimitiveItem): Item
}

function convertTypeToNumber(type: string): number {
    switch (type) {
        case "rect":
            return TYPE_RECT
        
        default:
            throw new Error("qanvas: item.type is invalid!")
    }
}

function isHTMLCanvasElement(element: any): element is HTMLCanvasElement {
    return element instanceof HTMLCanvasElement
}

function newq(selector: string): Qanvas {
    const canvas = document.querySelector(selector) as HTMLCanvasElement
    
    if (!isHTMLCanvasElement(canvas)) {
        throw new Error("qanvas: newq(selector) is not a canvas element!")
    }
    
    const context = canvas.getContext("2d") as CanvasRenderingContext2D
    
    if (!context) {
        throw new Error("qanvas: unable to get context!")
    }
    
    const items: Map<string, Item> = new Map()
    
    return {
        canvas,
        context,
        items,
        add(item: PrimitiveItem) {
            const convertedType = convertTypeToNumber(item.type)
            
            switch (convertedType) {
                case TYPE_RECT:
                    const rect = new Rect(
                        this,
                        convertedType,
                        item.x ?? DEFAULT_POS,
                        item.y ?? DEFAULT_POS,
                        item.color ?? DEFAULT_COLOR,
                        item.width ?? DEFAULT_SIZE,
                        item.height ?? DEFAULT_SIZE
                    )
                    
                    this.items.set(item.name, rect)
                    
                    return rect
                    
                default:
                    throw new Error("qanvas: item.type is invalid!")
            }
        }
    }
}

export { newq }