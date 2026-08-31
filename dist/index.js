const DEFAULT_POS = 0;
const DEFAULT_SIZE = 0;
const DEFAULT_COLOR = "rgb(0, 0, 0)";
const TYPE_RECT = 1;
const qanvas = {
    items: new Map(),
    set(selector) {
        const canvas = document.querySelector(selector);
        this.context = canvas.getContext("2d");
        this.canvas = canvas;
        return this;
    },
    get(name) {
        const item = this.items.get(name);
        if (!item) {
            throw new Error(`qanvas: ${name} does not exist!`);
        }
        return item;
    },
    rect(name, x, y, width, height, color) {
        const rect = this.items.get(name);
        if (!rect) {
            const newRect = {
                type: TYPE_RECT,
                x: x ?? DEFAULT_POS,
                y: y ?? DEFAULT_POS,
                width: width ?? DEFAULT_SIZE,
                height: height ?? DEFAULT_SIZE,
                color: color ?? DEFAULT_COLOR,
                setpos(x, y) {
                    this.x = x;
                    this.y = y;
                    return this;
                },
                setcolor(color) {
                    this.color = color;
                    return this;
                },
                setsize(width, height) {
                    this.width = width;
                    this.height = height;
                    return this;
                }
            };
            this.items.set(name, newRect);
            return newRect;
        }
        if (rect.type !== TYPE_RECT) {
            throw new Error(`qanvas: ${name} is not a rect!`);
        }
        return rect;
    },
    draw(name) {
        const item = this.items.get(name);
        if (!item) {
            throw new Error(`qanvas: ${name} is not an item!`);
        }
        if (!this.context) {
            throw new Error("qanvas: qanvas has no context!");
        }
        switch (item.type) {
            case TYPE_RECT:
                this.context.fillStyle = item.color;
                this.context.fillRect(item.x, item.y, item.width, item.height);
                break;
        }
        return this;
    }
};
export default qanvas;
