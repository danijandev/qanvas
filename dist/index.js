const TYPE_NONE = 0;
const TYPE_RECT = 1;
const DEFAULT_POS = 0;
const DEFAULT_SIZE = 0;
const DEFAULT_COLOR = "black";
class Item {
    parent;
    type;
    x;
    y;
    color;
    constructor(parent, type, x, y, color) {
        this.parent = parent;
        this.type = type;
        this.x = x;
        this.y = y;
        this.color = color;
    }
}
class Rect extends Item {
    width;
    height;
    constructor(parent, type, x, y, color, width, height) {
        super(parent, type, x, y, color);
        this.width = width;
        this.height = height;
    }
    draw() {
        this.parent.context.fillStyle = this.color;
        this.parent.context.fillRect(this.x, this.y, this.width, this.height);
        return this;
    }
}
function convertTypeToNumber(type) {
    switch (type) {
        case "rect":
            return TYPE_RECT;
        default:
            throw new Error("qanvas: item.type is invalid!");
    }
}
function isHTMLCanvasElement(element) {
    return element instanceof HTMLCanvasElement;
}
function newq(selector) {
    const canvas = document.querySelector(selector);
    if (!isHTMLCanvasElement(canvas)) {
        throw new Error("qanvas: newq(selector) is not a canvas element!");
    }
    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error("qanvas: unable to get context!");
    }
    const items = new Map();
    return {
        canvas,
        context,
        items,
        add(item) {
            const convertedType = convertTypeToNumber(item.type);
            switch (convertedType) {
                case TYPE_RECT:
                    const rect = new Rect(this, convertedType, item.x ?? DEFAULT_POS, item.y ?? DEFAULT_POS, item.color ?? DEFAULT_COLOR, item.width ?? DEFAULT_SIZE, item.height ?? DEFAULT_SIZE);
                    this.items.set(item.name, rect);
                    return rect;
                default:
                    throw new Error("qanvas: item.type is invalid!");
            }
        }
    };
}
export { newq };
