const TYPE_RECT = 1;
const qanvas = {
    _items: new Map(),
    _defaultColor: "black",
    _defaultPos: 0,
    _defaultSize: 0,
    set(selector) {
        const canvas = document.querySelector(selector);
        this._context = canvas.getContext("2d");
        this._canvas = canvas;
        return this;
    }
};
function Q(...items) {
    const qanvasItems = qanvas._items;
    const qanvasContext = qanvas._context;
    let parsedItems = [];
    if (items.length === 0) {
        return qanvas;
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const parsedItem = qanvasItems.get(item);
        if (!parsedItem) {
            const newItem = {
                _color: qanvas._defaultColor,
                x: qanvas._defaultPos,
                y: qanvas._defaultPos,
                pos(x, y) {
                    this.x = x;
                    this.y = y;
                    return this;
                },
                setx(x) {
                    this.x = x;
                    return this;
                },
                sety(y) {
                    this.y = y;
                    return this;
                },
                addx(x) {
                    this.x += x;
                    return this;
                },
                addy(y) {
                    this.y += y;
                    return this;
                },
                subx(x) {
                    this.x -= x;
                    return this;
                },
                suby(y) {
                    this.y -= y;
                    return this;
                },
                rect(x, y, width, height) {
                    if (this._type) {
                        throw new Error("qanvas: Item already has a type!");
                    }
                    if (x) {
                        this.x = x;
                    }
                    if (y) {
                        this.y = y;
                    }
                    const newRect = {
                        ...this,
                        _type: TYPE_RECT,
                        width: width ?? qanvas._defaultSize,
                        height: height ?? qanvas._defaultSize,
                        size(width, height) {
                            this.width = width;
                            this.height = height;
                            return this;
                        },
                        clear() {
                            if (!qanvasContext) {
                                throw new Error("qanvas: No context to use!");
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
                    };
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
