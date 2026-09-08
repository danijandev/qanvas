interface Qanvas {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    width?: number;
    height?: number;
    items: Map<string, Item>;
    set(selector: string): Qanvas;
    clear(): Qanvas;
}
declare class Item {
    protected name: string;
    x: number;
    y: number;
    protected type?: number;
    protected _color: string;
    constructor(name: string, x: number, y: number, color: string);
    pos(x: number, y: number): this;
    setx(x: number): this;
    sety(y: number): this;
    addpos(x: number, y: number): this;
    addx(x: number): this;
    addy(y: number): this;
    subpos(x: number, y: number): this;
    subx(x: number): this;
    suby(y: number): this;
    rect(x?: number, y?: number, width?: number, height?: number): Rect;
    back(): Qanvas;
}
declare class Rect extends Item {
    width: number;
    height: number;
    type: number;
    constructor(name: string, x: number, y: number, width: number, height: number, color: string);
    size(width: number, height: number): this;
    setwidth(width: number): this;
    setheight(height: number): this;
    addsize(width: number, height: number): this;
    addwidth(width: number): this;
    addheight(height: number): this;
    subsize(width: number, height: number): this;
    subwidth(width: number): this;
    subheight(height: number): this;
    clear(): this;
    draw(): this;
}
declare function Q(...items: string[]): Item[] | Item | Qanvas;
export default Q;
