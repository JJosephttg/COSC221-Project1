import inquirer from "inquirer";
import { displayBinaryInputConversion } from "./binary-representations.js";

// Enum to keep track of response type
const MainMenuChoice = {
  BINARY: 'binary',
  INTEGER: 'integer'
}

function promptMainMenu() {
  // Prompting library to ask questions and get input on what type of input is expected and number entered from user
  inquirer.prompt([
    {
      name: 'numberType',
      message: 'Pick a number type to convert',
      loop: true,
      type: 'list',
      choices: [
        { name: '8-bit', value: MainMenuChoice.BINARY },
        { name: 'Signed decimal integer (-128 to +127)', value: MainMenuChoice.INTEGER },
        new inquirer.Separator(),
        { name: 'Quit' }
      ]
    },
    {
      name: 'userInput',
      message: 'Enter 8-bit binary number to convert',
      type: 'input',
      when: ({ numberType }) => numberType === MainMenuChoice.BINARY, //Only ask question in prompt if choice is 8-bit binary number
      filter: input => input.replaceAll(' ', ''),
      validate: input => new RegExp(/^[0-1]+$/).test(input) && input.length === 8 || 'Input should be a 8 bit binary number'
    },
    {
      name: 'userInput',
      message: 'Enter a signed decimal integer between -128 and 127',
      type: 'input',
      when: ({ numberType }) => numberType === MainMenuChoice.INTEGER, //Only ask question in prompt if choice is decimal number
      validate: input => {
        const parsedNum = parseInt(input);
        return (parsedNum >= -128 && parsedNum <= 127) || 'Input should be a number between -128 and 127';
      }
    }
  ]).then(({ numberType, userInput }) => {
    // Get response after questions are answered to determine what conversion is needed and pass user entered input to associated conversion method
    switch(numberType) {
      case MainMenuChoice.BINARY:
        displayBinaryInputConversion(userInput);
        promptMainMenu();
        break;
      case MainMenuChoice.INTEGER:
        //displayDecimalIntegerInputConversion(userInput);
        promptMainMenu();
        break;
      default:
        console.log('Quitting application...');
        break;
    }
  });
}

console.clear();
promptMainMenu();