type Qanvas = {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    set(selector: string): Qanvas;
};

const qanvas: Qanvas = {
    set(selector: string) {
        const canvas = document.querySelector(selector) as HTMLCanvasElement;
        
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.canvas = canvas;
        
        return this;
    }
};

export default qanvas;