const RandomHello =
[
	"Greetings!", "Hi.", "Howdy!", "Hello there!", "Hi to you too.",
	"Hi sunshine,", "BEEP. BOOP. Hi.", "Hi to you too!", "Greetings to you too!",
	"Good day kind sir.", "Good day!", "Oh hey there!", "Oh hi.",
	"Oh hello there pleb!", "Hello.", "Hello!", "What's up?", "What's good?",
	"What's gucci?", "HOWDY!", "Errm, have you seen my cookies?", "How's your day?",
	"I can't find these cookies anywhere... Oh, hi!"
];

module.exports.run = async (bot, message, args) =>
{
    let szRandomGreet = RandomHello[Math.floor(Math.random() * RandomHello.length)];

    await message.channel.send( szRandomGreet + " I am a funny <:cookiemonsta:414433388104253450>  **Cookie Monsta**  <:cookiemonsta:414433388104253450> that can do stuff :smile:\nType **!help** so I can teach you what I can do!\nBtw, want a cookie :cookie: ?");
};

module.exports.help =
{
    name: "hello"
};