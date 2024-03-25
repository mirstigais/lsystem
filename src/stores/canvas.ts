import {defineStore} from "pinia";
import { DrawInput } from "@services/DrawingService";
import { RulesAssociativeArr } from "@services/DrawingService";

export const useCanvasStore = defineStore("canvasStore", {
    state:() => ({
        length: 0,
        angle: 0,
        rules: {} as RulesAssociativeArr,
        constants: [] as string [],
        iterations: 0
    }),
    
    actions: {
        setInputData(input: DrawInput) {
            this.length = input.length;
            this.angle = input.angle;
            this.rules = input.rules;
            this.constants = input.constants;
            this.iterations = input.iterations;
        }
    }
});