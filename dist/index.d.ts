declare const TYPE_RECT: number;
interface Item {
    _type?: number;
    _color: string;
    x: number;
    y: number;
    pos(x: number, y: number): Item;
    setx(x: number): Item;
    sety(y: number): Item;
    addx(x: number): Item;
    addy(y: number): Item;
    subx(x: number): Item;
    suby(y: number): Item;
    rect(x?: number, y?: number, width?: number, height?: number): Rect;
}
interface Rect extends Item {
    _type?: typeof TYPE_RECT;
    width: number;
    height: number;
    size(width: number, height: number): Item;
    clear(): Rect;
    draw(): Rect;
}
interface Qanvas {
    _canvas?: HTMLCanvasElement;
    _context?: CanvasRenderingContext2D;
    _items: Map<string, Item>;
    _defaultColor: string;
    _defaultPos: number;
    _defaultSize: number;
    set(selector: string): Qanvas;
}
declare function Q(...items: string[]): Item[] | Item | Qanvas;
export default Q;
