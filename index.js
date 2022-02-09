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
    }
  ]).then(userInput => {
    switch(userInput.numberType) {
      case MainMenuChoice.BINARY: 
        promptBinaryQuestion();
        break;
      case MainMenuChoice.INTEGER:
        promptIntegerQuestion();
        break;
    }
  });
}

function promptBinaryQuestion() {

}

function promptIntegerQuestion() {
  
}

promptMainMenu();