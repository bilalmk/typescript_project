import inquirer from "inquirer";
import animation from "chalk-animation";
let sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));
let activityArray = ['Fast Case', 'Balance Inquiry', 'Cash Withdraw'];
let fastCashArray = ['500', '1000', '2000', '5000', '10,000', '15,000', '20,000'];
let balance = Math.floor(Math.random() * 100000);
let credentials = { 'userId': 'bilalmk', 'pin': 1230 };
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
async function showInput() {
    let input = await inquirer.prompt([
        {
            name: "userid",
            type: "string",
            message: "Enter your user id : ",
            filter: (value) => value !== credentials.userId ? "" : value,
            validate: (value) => value !== credentials.userId ? "please provide correct user id" : true,
        },
        {
            name: "pin",
            type: "number",
            message: "Enter your pin : ",
            filter: (value) => value.toString() == "" || isNaN(value) || value != credentials.pin ? "" : value,
            validate: (value) => value != credentials.pin ? "please provide correct pin code" : true
        },
        {
            name: "accountType",
            type: "list",
            choices: ['Saving Account', 'Current Account'],
            message: "Select account type"
        }
    ]);
}
function showCredentials() {
    console.log(`Your Atm information is 
            user id : ${credentials.userId}
            pin : ${credentials.pin}
        `);
}
async function actvitiyMenu() {
    const input = await inquirer.prompt([
        {
            name: "menu",
            type: "list",
            choices: activityArray,
            message: "Choose given below"
        }
    ]);
    return input.menu;
}
async function fastCashMenu() {
    const input = await inquirer.prompt([
        {
            name: "menu",
            type: "list",
            choices: fastCashArray,
            message: "Choose given below"
        }
    ]);
    return input.menu;
}
async function inputAmount() {
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
}
async function doFastCash() {
    let fastCash = await fastCashMenu();
    await doAnimation();
    await sleep(6000);
    balance -= Number(fastCash);
    console.log(Number(fastCash).NumberWithCommas() + " has withdraw your new balance is " + balance.NumberWithCommas());
}
async function doBalanceInquiry() {
    await doAnimation();
    await sleep(6000);
    console.log("Your current balance is " + balance.NumberWithCommas());
}
async function doCashWithdraw() {
    let amount = await inputAmount();
    await doAnimation();
    await sleep(6000);
    balance -= amount;
    console.log(amount.NumberWithCommas() + " has withdraw your new balance is " + balance.NumberWithCommas());
}
async function askAgain() {
    let input = await inquirer.prompt([
        {
            type: "confirm",
            name: "askAgain",
            message: "Do you want other transaction. Press (Y/N)",
            default: true
        }
    ]);
    return input.askAgain;
}
async function operation(value) {
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
}
async function main() {
    console.clear();
    let activity = await actvitiyMenu();
    await operation(activity);
    if (await askAgain())
        main();
}
Number.prototype.NumberWithCommas = function () {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
showCredentials();
await sleep(1000);
await showInput();
await main();
