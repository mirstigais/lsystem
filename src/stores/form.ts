import { defineStore } from "pinia";

export type formInput = {
  iterations: number;
  angle: number;
  start: string;
  rules: string;
  length: number;
  drawColor: string;
  backgroundColor: string;
};

export const useFormStore = defineStore("formStore", {
  state: () => ({
    iterations: 0,
    angle: 0,
    rules: "" as string,
    axiom: "" as string,
    start: "" as string,
    length: 0 as number,
    drawColor: "#000000" as string,
    backgroundColor: "#5E5D5D" as string,
  }),

  actions: {
    setInputData(input: formInput) {
      this.length = input.length;
      this.angle = input.angle;
      this.rules = input.rules;
      this.start = input.start;
      this.iterations = input.iterations;
      this.backgroundColor = input.backgroundColor;
      this.drawColor = input.drawColor;
    },
  },
});
