interface Item {
    type: number;
    color: string;
    x: 0;
    y: 0;
}
interface Qanvas {
    items: Map<string, Item>;
}
declare function Q(...items: string[]): Item[] | Item | Qanvas;
export default Q;
