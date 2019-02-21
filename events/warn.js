
const chalk = require("chalk");

module.exports = async (info) =>
{
    console.log(chalk.magentaBright("[+] WARNING EVENT --> START <-- [+]"));
    console.LOG(chalk.yellowBright(info));
    console.log(chalk.magentaBright("[+] WARNING EVENT --> END <-- [+]"));
};
