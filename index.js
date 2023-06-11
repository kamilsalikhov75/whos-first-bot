const TelegramApi = require("node-telegram-bot-api");

const token = "6026389987:AAEE0cfDy7egpB0RRkZFKNuBRGQPz2lAa0U";

const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Старт" },
  { command: "/whos_first", description: "Узнать первого игрока" },
  { command: "/dice", description: "Кинуть кубик" },
]);

bot.on("message", (message) => {
  const text = message.text;
  const chatId = message.chat.id;
  if (text === "/start") {
    bot.sendMessage(chatId, "Привет");
    return;
  }
  if (text === "/dice") {
    const number = Math.floor(Math.random() * (7 - 1) + 1);
    bot.sendMessage(chatId, `Выпало ${number}!`);
    return;
  }
  if (text === "/whos_first") {
    bot.sendMessage(chatId, "Отправь имена через пробел");
    return;
  }
  if (text.match(/^((\s?)+([А-ЯЁ][а-яё]+)+(\s?)+)+$/)) {
    const players = message.text.split(" ");
    const chatId = message.chat.id;
    // if (players.length < 2) {
    //   bot.sendMessage(chatId, "Введи больше двух имен");
    //   return;
    // }
    players.map((player) => player.trim());
    const playerNumber = Math.floor(Math.random() * players.length);
    bot.sendMessage(chatId, `Первый игрок: ${players[playerNumber]}`);
    return;
  }
  // bot.sendMessage(chatId, "Я не понимаю 😞");
});
