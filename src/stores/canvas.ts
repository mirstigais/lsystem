import {defineStore} from "pinia";
import { DrawInput } from "@services/DrawingService";
import { RulesAssociativeArr } from "@services/DrawingService";

export const useCanvasStore = defineStore("canvasStore", {
    state:() => ({
        length: 0,
        angle: 0,
        rules: {} as RulesAssociativeArr,
        start: '' as string,
        iterations: 0,
        drawColor: '#000000',
        backgroundColor: '#5E5D5D',
    }),
    
    actions: {
        setInputData(input: DrawInput) {
            this.length = input.length;
            this.angle = input.angle;
            this.rules = input.rules;
            this.start = input.start;
            this.iterations = input.iterations;
            this.backgroundColor = input.backgroundColor;
            this.drawColor = input.drawColor;
        },
        setDrawColor(drawColor: string) {
          this.drawColor = drawColor;
        },
        setBackgroundColor(backgroundColor: string) {
          this.backgroundColor = backgroundColor;
        },
        saveImage() {
          return null;
        },
    }
});