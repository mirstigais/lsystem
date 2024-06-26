import p5js from 'p5';

export class DrawInput {
    iterations: number;
    angle: number;
    start: string;
    rules: RulesAssociativeArr;
    length: number;
    drawColor: string;
    backgroundColor: string;

    constructor(
        iterations: number,
        angle: number,
        start: string,
        rules: RulesAssociativeArr,
        length: number,
        drawColor: string,
        backgroundColor: string,
        ) {
        this.iterations = iterations;
        this.angle = angle;
        this.start = start;
        this.length = length;
        this.rules = rules;
        this.drawColor = drawColor;
        this.backgroundColor = backgroundColor;
    }
}

export type RulesAssociativeArr = {
    [key: string]: string;
}

type DrawRules = {
    [key: string]: () => void;
}

export class DrawingService {
    inputData: DrawInput;
    cache: string;
    p5js: p5js;
    drawRules: DrawRules;

    constructor(input: DrawInput, p5js: p5js) {
        this.inputData = input;
        this.cache = '';
        this.p5js = p5js;
        this.drawRules = this.setupDrawRules();
    }

    start() {
        this.p5js.noLoop();
        this.cache = this.inputData.start;

        for (let i = 0; i < this.inputData.iterations; i++) {
            this.cache = this.generate();
        }

        this.draw();
    }

    //needs a rewrite, I am a retard.
    generate() {
        let next = '';

        for (let i = 0; i < this.cache.length; i++) {
            const char = this.cache[i];
            
            if (char in this.inputData.rules) {
                next += this.inputData.rules[char];
            } else {
                next += char;
            }
        }

        return next;
    }

    draw() {
        this.p5js.background(this.inputData.backgroundColor);
        this.p5js.stroke(this.inputData.drawColor);
        this.p5js.push();
        this.p5js.translate(this.p5js.width / 2, this.p5js.height / 2);
        // this.p5js.rotate(this.p5js.PI/180 * this.inputData.angle);
        
        for(let i = 0; i < this.cache.length; i ++) {
          const char = this.cache[i];
          
          if(char in this.drawRules) {
            this.drawRules[char]();
          }  
        }

        this.p5js.pop(); 
    }

    setupDrawRules(): DrawRules{
        return {
          "G": () => {
            this.p5js.line(0, 0, 0, -this.inputData.length);
            this.p5js.translate(0, -this.inputData.length);
          },
            "F": () => {
              this.p5js.line(0, 0, 0, -this.inputData.length);
              this.p5js.translate(0, -this.inputData.length);
            },
            "+": () => {
                this.p5js.rotate(this.p5js.PI/180 * -this.inputData.angle);
            },
            "-": () => {
              this.p5js.rotate(this.p5js.PI/180 * this.inputData.angle);
            },
            "[": () => this.p5js.push(),
            "]": () => {
                this.p5js.pop();
            },
          }
    }
}