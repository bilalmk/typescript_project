import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";

const sleep = (ms=2000)=>new Promise(r=>setTimeout(r,ms));

async function welcome()
{
    const rainbow = animation.rainbow("Can you beat the computer????? \n\n");

    await sleep();
    rainbow.stop();

    console.log(`
        ${chalk.blue("Game Rules")}
        - Computer will generate a hidden number between 1 to 10
        - You will have 3 chances to guess the number
        - Computer will tell you if your number is lesser or greater
    `);
    await sleep();
}

const input = [
    {
        name:"guess",
        type:"number",
        message:"Please provide a number"
    }
]

let computerNumber = Math.round(Math.random()*10);

let attempt=0;

function main()
{
        inquirer.prompt(input).then(answer=>{

        let diff = answer.guess-computerNumber;
        attempt++;
        let attemptLeft = 3-attempt;
        if(answer.guess==computerNumber)
        {
            console.log("your guess is correct");
            process.exit(0);
        }
        else
        {
            if(attempt>=3)
            {
                console.log("You loss, Correct answer is "+computerNumber);
                process.exit(0);
            }

            diff>0? console.log("Incorrect Answer,try a lower number"): console.log("Incorrect Answer, try a big number");
            console.log(`${attemptLeft} attempt left\n\n`)
            main();
        }
    });
};

console.clear();
await welcome();
main();