interface Item {
    _type: number;
    _color: string;
    x: 0;
    y: 0;
}
interface Qanvas {
    _items: Map<string, Item>;
}
declare function Q(...items: string[]): Item[] | Item | Qanvas;
export default Q;
