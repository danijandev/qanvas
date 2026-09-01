declare const TYPE_RECT: number;
interface Item {
    _type?: number;
    _color: string;
    x: number;
    y: number;
    rect?(): Rect;
}
interface Rect extends Item {
    _type?: typeof TYPE_RECT;
    width: number;
    height: number;
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
