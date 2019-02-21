
const chalk = require("chalk");

module.exports = async (error) =>
{
	console.log(chalk.magentaBright("[+] ERROR EVENT --> START <-- [+]"));
	console.log(chalk.redBright("Client error:\n\n" + err.stack));
	console.log(chalk.magentaBright("[+] ERROR EVENT --> END <-- [+]"));
};
