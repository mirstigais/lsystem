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
        this.p5js.noLoop();
        this.cache = this.inputData.start;
        for (let i = 0; i < this.inputData.iterations; i++) {
            this.cache = this.generate();
            this.draw();
        }
    }

    //needs a rewrite, I am a retard.
    generate() {
        let next = '';

        for (let i = 0; i < this.cache.length; i++) {
            let char = this.cache[i];
            
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
          let char = this.cache[i];
          
          if(char in this.drawRules) {
            this.drawRules[char]();
          }  
        }

        this.p5js.pop(); 
    }

    setUpDrawRules(): DrawRules{
        return {
            "F": () => {
              // this.p5js.stroke(this.inputData.drawColor);
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