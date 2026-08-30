declare const TYPE_RECT = 1;
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
    type: typeof TYPE_RECT;
    size(width: number, height: number): Rect;
}
declare const qanvas: Qanvas;
export default qanvas;
