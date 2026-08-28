const qanvas = {
    set(selector) {
        const canvas = document.querySelector(selector);
        this.context = canvas.getContext("2d");
        this.canvas = canvas;
        return this;
    }
};
export default qanvas;
