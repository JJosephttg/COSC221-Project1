import inquirer from "inquirer";

const MainMenuChoice = {
  BINARY: 'binary',
  INTEGER: 'integer'
}


const baseMenuChoices = [
  { name: '8-bit', value: MainMenuChoice.BINARY },
  { name: 'Signed decimal integer (-128 to +127)', value: MainMenuChoice.INTEGER },
  new inquirer.Separator(),
  { name: 'Quit' }
];

function promptMainMenu() {
  inquirer.prompt([
    {
      name: 'numberType',
      message: 'Pick a number type to convert',
      loop: true,
      type: 'list',
      choices: baseMenuChoices
    },
    {
      name: 'userInput',
      message: 'Enter 8-bit binary number to convert',
      type: 'input',
      when: ({ numberType }) => numberType === MainMenuChoice.BINARY
    },
    {
      name: 'userInput',
      message: 'Enter a signed decimal integer between -128 and 127',
      type: 'input',
      when: ({ numberType }) => numberType === MainMenuChoice.INTEGER
    }
  ]).then(({ numberType, userInput }) => {
    switch(numberType) {
      case MainMenuChoice.BINARY:
        //displayBinaryInputConversion(userInput);
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

promptMainMenu();