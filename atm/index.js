import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";
let sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));
let activityArray = ['Fast Case', 'Balance Inquiry', 'Cash Withdraw'];
let fastCashArray = ['500', '1000', '2000', '5000', '10,000', '15,000', '20,000'];
let balance = Math.floor(Math.random() * 100000);
let credentials = { 'userId': 'bilalmk', 'pin': 1230 };
let limit = 30000;
let lineBreak = () => console.log("\n");
Number.prototype.NumberWithCommas = function () {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
let doAnimation = () => {
    let counter = 0;
    let text = "Please wait transaction is in process.";
    let loader = animation.karaoke(text);
    let timer = setInterval(() => {
        text += ".";
        loader.replace(text);
        counter++;
        if (counter > 5) {
            clearInterval(timer);
            loader.stop();
        }
    }, 1000);
};
let showCredentials = () => console.log(`Your Atm information is \n\n user id : ${chalk.green.bold(credentials.userId)} \n pin     : ${chalk.green.bold(credentials.pin)} \n start balance : ${chalk.green.bold(balance)} \n\n`);
let showInput = async () => {
    await inquirer.prompt([
        {
            name: "userid",
            type: "string",
            message: "Enter your user id : ",
            filter: (value) => value !== credentials.userId ? "" : value,
            validate: (value) => value !== credentials.userId ? chalk.red("please provide correct user id") : true,
        },
        {
            name: "pin",
            type: "number",
            message: "Enter your pin : ",
            filter: (value) => value.toString() == "" || isNaN(value) || value != credentials.pin ? "" : value,
            validate: (value) => value != credentials.pin ? chalk.red("please provide correct pin code") : true
        },
        {
            name: "accountType",
            type: "list",
            choices: ['Saving Account', 'Current Account'],
            message: "Select account type"
        }
    ]);
};
let actvitiyMenu = async () => {
    const input = await inquirer.prompt([
        {
            name: "menu",
            type: "list",
            choices: activityArray,
            message: "Choose given below"
        }
    ]);
    return input.menu;
};
let inputAmount = async () => {
    const input = await inquirer.prompt([
        {
            name: "amount",
            type: "number",
            message: "Please enter amount",
            validate: (value) => !isNaN(value) && value > 0 ? true : "Please provide valid value in amount",
            filter: (value) => !isNaN(value) && value > 0 ? value : ""
        }
    ]);
    return input.amount;
};
let fastCashMenu = async () => {
    const input = await inquirer.prompt([
        {
            name: "menu",
            type: "list",
            choices: fastCashArray,
            message: "Choose given below"
        }
    ]);
    return input.menu;
};
let askAgain = async () => {
    lineBreak();
    let input = await inquirer.prompt([
        {
            type: "confirm",
            name: "askAgain",
            message: chalk.red("Do you want another transaction. Press (Y/N)"),
            default: true
        }
    ]);
    return input.askAgain;
};
let doFastCash = async () => {
    let fastCash = await fastCashMenu();
    lineBreak();
    doAnimation();
    await sleep(6000);
    lineBreak();
    fastCash = Number(fastCash.replace(",", ""));
    if (fastCash > balance)
        console.log(chalk.bgMagenta("Insufficiant balance, Please enter other amount"));
    else {
        balance -= fastCash;
        console.log(`${chalk.yellow(fastCash.NumberWithCommas())} has withdraw your new balance is ${chalk.yellow(balance.NumberWithCommas())}`);
    }
};
let doBalanceInquiry = async () => {
    lineBreak();
    doAnimation();
    await sleep(6000);
    lineBreak();
    console.log(`Your current balance is ${chalk.yellow(balance.NumberWithCommas())}`);
};
let doCashWithdraw = async () => {
    let amount = await inputAmount();
    lineBreak();
    doAnimation();
    await sleep(6000);
    lineBreak();
    if (amount > limit)
        console.log(chalk.bgMagenta("Maximum " + limit + " amount can be withdraw"));
    else if (amount > balance)
        console.log(chalk.bgMagenta("Insufficiant balance, Please enter other amount"));
    else {
        balance -= amount;
        console.log(`${chalk.yellow(amount.NumberWithCommas())} has withdraw your new balance is ${balance.NumberWithCommas()}`);
    }
};
let operation = async (value) => {
    switch (value) {
        case activityArray[0]:
            await doFastCash();
            break;
        case activityArray[1]:
            await doBalanceInquiry();
            break;
        case activityArray[2]:
            await doCashWithdraw();
            break;
        default:
            break;
    }
};
let main = async () => {
    let activity = await actvitiyMenu();
    await operation(activity);
    if (await askAgain()) {
        lineBreak();
        main();
    }
};
console.clear();
showCredentials();
await sleep(1000);
await showInput();
await main();
