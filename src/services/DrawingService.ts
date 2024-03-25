import p5js from 'p5';

export class DrawInput {
    iterations: number;
    angle: number;
    constants: string[];
    rules: RulesAssociativeArr;
    length: number;

    constructor(
        iterations: number,
        angle: number,
        constants: string[],
        rules: RulesAssociativeArr,
        length: number
        ) {
        this.iterations = iterations;
        this.angle = angle;
        this.constants = constants;
        this.length = length;
        this.rules = rules;
        //Why do I have to toString() for it to work?
        // rules = rules.toString().toUpperCase();
        // this.validate(rulesString);
        // this.rules = this.convertRulesToAssociativeArr(rulesString);
    }

    // validate(rules: string) {
    //     let passed = DrawingUtils.validateAllowedCharacters(rules);
    //     if (!passed) throw new Error('Rule validation failed');
    // }

    // convertRulesToAssociativeArr(rulesString : string) {
    //     let lines = rulesString.split(' ');
    //     let rulesArr : RulesAssociativeArr = {};

    //     lines.forEach(function (line : string) {
    //         let split = line.split('=');
    //         let key = split[0];
    //         let value = split[1];
    //         rulesArr[key] = value;
    //     });

    //     console.log('Rules arr ' +rulesArr);

    //     return rulesArr;
    // }
}

export interface RulesAssociativeArr {
    [key: string]: string;
}

interface DrawRules {
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
        this.drawRules = this.setUpDrawRules();
    }

    start() {
        this.p5js.background(220);
        this.p5js.noLoop();

        for (let i = 0; i < this.inputData.iterations; i++) {
            this.cache = this.generate();
            this.draw();
        }
    }

    generate() {
        let next = "";

        for (let i = 0; i < this.inputData.constants.length; i++) {
            let constant = this.inputData.constants[i];

            if (this.inputData.rules.hasOwnProperty(constant)) {
                next += this.inputData.rules[constant];
            } else {
                next += constant;
            }
        }

        return next;
    }

    draw() {
        this.p5js.push();
        this.p5js.translate(this.p5js.width/4, this.p5js.height);
        this.p5js.rotate(this.p5js.PI/180 * this.inputData.angle);
        
        for(let i = 0; i < this.cache.length; i ++) {
          let character = this.cache[i];
          
          if(character in this.drawRules) {
            this.drawRules[character]();
          }  
        }

        this.p5js.pop(); 
    }

    setUpDrawRules(): DrawRules{
        return {
            "F": () => {
              this.p5js.stroke(100, 50, 0);
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
                // this.p5js.noStroke();
                // this.p5js.fill(0, 200, 0);
                // this.p5js.ellipse(0, 0, 2 * this.inputData.length, 5 * this.inputData.length);
                this.p5js.pop();
            },
          }
    }
}