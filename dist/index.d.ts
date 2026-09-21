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
    color(color: string): this;
    rect(x?: number, y?: number, width?: number, height?: number): Item;
    back(): Qanvas;
}
declare function Q(...items: string[]): Item[] | Item | Qanvas;
export default Q;
