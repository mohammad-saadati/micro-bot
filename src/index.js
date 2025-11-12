require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const db = require("./db");
const homeMenue = require("./actions/homeMenu");

// Here is the token for bot stray_dogs @StrayDogsBot:
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error(
    "Error: TELEGRAM_BOT_TOKEN is not set in environment variables"
  );
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const id = msg.chat.id;

  homeMenue(bot, id);
});
