const TYPE_RECT = 1;
const DEFAULT_POS = 0;
const DEFAULT_SIZE = 0;
const DEFAULT_COLOR = "rgb(0, 0, 0)";
class Item {
    name;
    x;
    y;
    type;
    _color;
    constructor(name, x, y, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this._color = color;
    }
    pos(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    setx(x) {
        this.x = x;
        return this;
    }
    sety(y) {
        this.y = y;
        return this;
    }
    addpos(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }
    addx(x) {
        this.x += x;
        return this;
    }
    addy(y) {
        this.y += y;
        return this;
    }
    subpos(x, y) {
        this.x -= x;
        this.y -= y;
        return this;
    }
    subx(x) {
        this.x -= x;
        return this;
    }
    suby(y) {
        this.y -= y;
        return this;
    }
    color(color) {
        this._color = color;
        return this;
    }
    rect(x, y, width, height) {
        if (this.type === TYPE_RECT) {
            return this;
        }
        if (this.type) {
            throw new Error("qanvas: Cannot convert Item to Rect as Item already has a type!");
        }
        const newRect = new Rect(this.name, x ?? this.x, y ?? this.y, width ?? DEFAULT_SIZE, height ?? DEFAULT_SIZE, this._color);
        qanvas.items.set(this.name, newRect);
        return newRect;
    }
    back() {
        return qanvas;
    }
}
class Rect extends Item {
    width;
    height;
    type = TYPE_RECT;
    constructor(name, x, y, width, height, color) {
        super(name, x, y, color);
        this.width = width;
        this.height = height;
    }
    size(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }
    setwidth(width) {
        this.width = width;
        return this;
    }
    setheight(height) {
        this.height = height;
        return this;
    }
    addsize(width, height) {
        this.width += width;
        this.height += height;
        return this;
    }
    addwidth(width) {
        this.width += width;
        return this;
    }
    addheight(height) {
        this.height += height;
        return this;
    }
    subsize(width, height) {
        this.width -= width;
        this.height -= height;
        return this;
    }
    subwidth(width) {
        this.width -= width;
        return this;
    }
    subheight(height) {
        this.height -= height;
        return this;
    }
    clear() {
        if (!qanvas.context) {
            throw new Error("qanvas: No context to use!");
        }
        qanvas.context.clearRect(this.x, this.y, this.width, this.height);
        return this;
    }
    draw() {
        if (!qanvas.context) {
            throw new Error("qanvas: No context to use!");
        }
        qanvas.context.fillStyle = this._color;
        qanvas.context.fillRect(this.x, this.y, this.width, this.height);
        return this;
    }
}
const qanvas = {
    items: new Map(),
    set(selector) {
        const canvas = document.querySelector(selector);
        this.context = canvas.getContext("2d");
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
};
function Q(...items) {
    if (items.length === 0) {
        return qanvas;
    }
    const qanvasItems = qanvas.items;
    let parsedItems = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const parsedItem = qanvasItems.get(item);
        if (!parsedItem) {
            const newItem = new Item(item, DEFAULT_POS, DEFAULT_POS, DEFAULT_COLOR);
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
