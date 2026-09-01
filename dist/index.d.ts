declare const TYPE_RECT = 1;
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
}
interface Qanvas {
    _items: Map<string, Item>;
    _defaultColor: string;
    _defaultPos: number;
    _defaultSize: number;
}
declare function Q(...items: string[]): Item[] | Item | Qanvas;
export default Q;
