interface Qanvas {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    items: Map<string, Rect>;
    set(selector: string): Qanvas;
    get(name: string): Item;
    rect(name: string, x?: number, y?: number, width?: number, height?: number): Rect;
}
interface Item {
    x: number;
    y: number;
    width: number;
    height: number;
    pos(x: number, y: number): Item;
}
interface Rect extends Item {
    type: 1;
    size(width: number, height: number): Rect;
}
declare const qanvas: Qanvas;
export default qanvas;
