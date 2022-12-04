import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";
const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));
async function welcome() {
    const rainbow = animation.rainbow("Can you beat the computer????? \n\n");
    await sleep();
    //rainbow.stop();
    console.log(`
        ${chalk.blue("Game Rules")}
        - Computer will generate a hidden number between 1 to 10
        - You will have 3 chances to guess the number
        - Computer will tell you if your number is lesser or greater
    `);
    await sleep();
}
async function askAgain() {
    let ans = await inquirer.prompt([{
            type: "confirm",
            name: "askAgain",
            message: "Do you want to play again? Press (Y/N)",
            default: true
        }]);
    return ans.askAgain;
}
async function input() {
    let input = await inquirer.prompt([{
            name: "guess",
            type: "number",
            message: "Please provide a number"
        }]);
    return input.guess;
}
let computerNumber = Math.round(Math.random() * 10);
let attempt = 0;
async function main() {
    let completed = false;
    let answer = await input();
    attempt++;
    let diff = answer - computerNumber;
    let attemptLeft = 3 - attempt;
    if (answer == computerNumber) {
        console.log(chalk.white.bgBlue.bold("Your guess is correct \n\n"));
        completed = true;
    }
    else {
        if (attempt >= 3) {
            console.log(chalk.underline.bgRed.bold("You loss, Correct answer is  " + computerNumber + "\n\n"));
            completed = true;
        }
        else {
            diff > 0 ? console.log("Incorrect Answer,try a lower number") : console.log("Incorrect Answer, try a big number");
            console.log(`${chalk.yellow.bold(attemptLeft + " attempt left\n\n")}`);
            main();
        }
    }
    if (completed) {
        if (await askAgain()) {
            console.log("\n\n");
            attempt = 0;
            main();
        }
    }
}
;
console.clear();
await welcome();
main();
