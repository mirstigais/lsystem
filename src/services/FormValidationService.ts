export default {
    validateConstants(input:string): string {
        let allowedCharacters = ['F','f','+','-','|','[',']','#','!','@','{','}','>','<','&','(',')'];
        let rez = "";
        const pattern = new RegExp(`^([${allowedCharacters.join('')}])`);
        
        if (!pattern.test(input)) {
            console.log("String contains only allowed characters.");
        } else {
            console.log("String contains characters not allowed.");
            rez = "contains characters that are not allowed.";  
        }

        return rez;
    },

    validateIterations(input:number): string {
        let rez = "";

        if (input < 0) {
            rez = "Iterations cannot be negative";
        }

        return rez;
    },

    validateAngle(input:number): string {
        let rez = "";

        if (input < 0) {
            rez = "Angle cannot be negative";
        }

        return rez;
    },
}