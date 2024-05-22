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
  const lines = rulesString.split('\n');
  const rulesArr : RulesAssociativeArr = {};

  lines.forEach(function (line : string) {
    const split = line.split('=');
    const key = split[0];
    const value = split[1];
    rulesArr[key] = value;
  });

  return rulesArr;
}

const DrawingServiceUtils = {
  allowedChars,
  validateAllowedCharacters,
  convertRulesToAssociativeArr
}

export default DrawingServiceUtils;