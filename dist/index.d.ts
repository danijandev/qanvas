interface Qanvas {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    items: Map<string, Item>;
    set(selector: string): Qanvas;
    get(name: string): Item;
    rect(name: string, x?: number, y?: number, width?: number, height?: number): Item | undefined;
}
interface Item {
    type: number;
    x: number;
    y: number;
    width: number;
    height: number;
    pos(x: number, y: number): Item;
}
declare const qanvas: Qanvas;
export default qanvas;
