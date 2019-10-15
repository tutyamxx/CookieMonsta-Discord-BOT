
const chalk = require("chalk");

module.exports = async (event) =>
{
    console.log(chalk.magentaBright("[+] DISCONNECT EVENT --> START <-- [+]"));
    console.log(chalk.redBright(`Disconnected with code ${event.code} !`));
    console.log(chalk.magentaBright("[+] DISCONNECT EVENT --> END <-- [+]"));

    process.exit(0);
};
