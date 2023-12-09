import { CanvasModel } from '@models/CanvasModelModel';

// interface Input {
//     iterations: number;
//     angle: number;
//     constants: string,
//     axiom: string,
//     length: number
// }

export class DrawingService {
    private iterations: number;
    private angle: number;
    private constants: string;
    private axiom: string;
    private rules: string;
    private length: number;
    private canvas: CanvasModel;
    
    constructor(
        iterations: number,
        angle: number,
        constants: string,
        axiom: string,
        length: number,
        rules: string,
        canvas: CanvasModel
        ) {
        this.canvas = canvas;
        this.iterations = iterations;
        this.angle = angle;
        this.constants = constants;
        this.axiom = axiom;
        this.length = length;
        this.rules = rules;
        this.canvas = canvas;
    }

    parseInput() {
        for (let i = 0; i < this.iterations; i++) {

        }
    }

    parseRules() {

    }   

    applyRules() {

    }

}