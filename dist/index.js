const defaultPos = 0;
const defaultSize = 0;
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
    rect(name, x, y, width, height) {
        let rect = this.items.get(name);
        if (!rect) {
            rect = {
                type: 1,
                x: x ?? defaultPos,
                y: y ?? defaultPos,
                width: width ?? defaultSize,
                height: height ?? defaultSize,
                pos(x, y) {
                    this.x = x;
                    this.y = y;
                    return this;
                },
                size(width, height) {
                    this.width = width;
                    this.height = height;
                    return this;
                }
            };
            this.items.set(name, rect);
        }
        return rect;
    }
};
export default qanvas;
