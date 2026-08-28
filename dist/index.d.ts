type Qanvas = {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    set(selector: string): Qanvas;
};
declare const qanvas: Qanvas;
export default qanvas;
