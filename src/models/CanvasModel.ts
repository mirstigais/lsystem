export class CanvasModel {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        if (!this.context) {
            throw new Error("2D rendering context not supported");
        }
    }

    clearCanvas() {
        if (this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            throw new Error("2D rendering context is null");
        }
    }
}