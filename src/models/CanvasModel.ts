// import p5js from 'p5';
// import {InputInterface, Rules} from '@services/DrawingService';

// export default class CanvasModel implements InputInterface {
//   iterations: number;
//   angle: number;
//   constants: [];
//   rules: Rules;
//   length: number;
//   p5: p5js;
//   cache: string

//   constructor(
//       input: InputInterface,
//       p5: p5js
//       ) {
//       this.p5 = p5;
//       this.iterations = input.iterations;
//       this.angle = input.angle;
//       this.constants = input.constants;
//       this.length = input.length;
//       this.rules = input.rules;
//       this.cache = '';
//       // this.testRules['X'] = 'F+[[X]-X]-F[-FX]+X';
//       // this.testRules['F'] = 'FF';
//   }

//   generate() {
//     let next = "";

//     for (let i = 0; i < this.constants.length; i++) {
//         let c = this.constants[i];

//         if (c in this.rules) {
//             next += this.rules[c];
//         } else {
//             next += c;
//         }
//     }

//     return next;
//   }

//   draw() {
//       this.canvas.clearCanvas();
//   };

//   start() {
//       for (let i = 0; i < this.iterations; i++) {
//           this.cache = this.generate();
//           this.draw();
//       }
//   };
// }