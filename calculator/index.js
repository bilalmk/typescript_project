import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";
let firstNumber;
let secondNumber;
let operator;
let result = 0;
let start = true;
let operations = { Addition: "addition", Subsctraction: "subsctraction", Multiplication: "multiplication", Division: "division" };
const inputs = [
    {
        type: 'number',
        name: 'firstNumber',
        message: 'Please enter first number',
    },
    {
        type: 'number',
        name: 'secondNumber',
        message: "Please enter second number",
    },
    {
        type: 'list',
        name: 'operations',
        message: 'Please select an operation',
        choices: ['Addition', 'Subsctraction', 'Multiplication', 'Division'],
        filter(val) {
            return val.toLowerCase();
        },
    },
];
const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));
async function validation() {
    if (operator == operations.Division && secondNumber === 0) {
        const rainbowTitle = animation.rainbow("Cannot divided by zero \n");
        rainbowTitle.start();
        process.exit(1);
    }
}
async function dislayResult() {
    switch (operator) {
        case operations.Addition:
            result = firstNumber + secondNumber;
            operator = "+";
            break;
        case operations.Subsctraction:
            result = firstNumber - secondNumber;
            operator = "-";
            break;
        case operations.Multiplication:
            result = firstNumber * secondNumber;
            operator = "*";
            break;
        case operations.Division:
            result = firstNumber / secondNumber;
            operator = "/";
            break;
        default:
            operator = "";
            break;
    }
    console.log(chalk.bgRed(firstNumber + " " + operator + " " + secondNumber + " = " + result));
}
async function askAgain() {
    let t = await inquirer.prompt([
        {
            type: "confirm",
            name: "askAgain",
            message: "Press y for continue, press n for exit",
            default: true,
        }
    ]);
    return t.askAgain;
}
async function main() {
    inquirer.prompt(inputs).then((answers) => {
        firstNumber = answers.firstNumber;
        secondNumber = answers.secondNumber;
        operator = answers.operations;
        validation();
        dislayResult();
        return askAgain();
    }).then(result => {
        console.log('\n\n\n');
        if (result)
            main();
        else {
            console.log("GoodBy");
            sleep();
        }
    });
}
console.clear();
main();
