interface PrimitiveItem {
    name: string;
    type: string;
    x?: number;
    y?: number;
    color?: string;
    width?: number;
    height?: number;
}
declare class Item {
    parent: Qanvas;
    type: number;
    x: number;
    y: number;
    color: string;
    constructor(parent: Qanvas, type: number, x: number, y: number, color: string);
}
interface Qanvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    items: Map<string, Item>;
    add(item: PrimitiveItem): Item;
}
declare function newq(selector: string): Qanvas;
export { newq };
