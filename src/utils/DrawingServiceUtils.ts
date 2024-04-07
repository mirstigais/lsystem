import { RulesAssociativeArr } from "@services/DrawingService";

const allowedChars = ['F','+','-','|','[',']'];

const validateAllowedCharacters = (inputString: string) : boolean => {
    [...inputString].forEach(element => {
        if (!allowedChars.includes(element)) {
            return false;
        }
    });

    return true;
}

const convertRulesToAssociativeArr = (rulesString: string) : RulesAssociativeArr => {
    let lines = rulesString.split('\n');
    let rulesArr : RulesAssociativeArr = {};

    lines.forEach(function (line : string) {
        let split = line.split('=');
        let key = split[0];
        let value = split[1];
        rulesArr[key] = value;
    });

    console.log('Rules arr ' +rulesArr);

    return rulesArr;
}

const DrawingServiceUtils = {
    allowedChars,
    validateAllowedCharacters,
    convertRulesToAssociativeArr
}

export default DrawingServiceUtils;