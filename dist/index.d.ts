interface Qanvas {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    items: Map<string, Item>;
    set(selector: string): Qanvas;
    get(name: string): Item;
    rect(name: string, x?: number, y?: number, width?: number, height?: number, color?: string): Item | undefined;
    circle(name: string, x?: number, y?: number, radius?: number, color?: string): Item | undefined;
    draw(name: string): Qanvas;
}
interface Item {
    type: number;
    x: number;
    y: number;
    color: string;
    setpos(x: number, y: number): Item;
    setcolor(color: string): Item;
}
declare const qanvas: Qanvas;
export default qanvas;
