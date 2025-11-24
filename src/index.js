require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const db = require("./db");
const {
  homeMenue,
  sendTranslationKeyboard,
  sendLanguage,
} = require("./actions/menues");
const components = require("./components/homeMenuList");
const { translations } = require("./locales/messages");
const request = require("./utils/request");
const redisClient = require("./redis");

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

bot.on("message", async (msg) => {
  if (msg.text.startsWith("/")) return;

  const chatId = msg.chat.id;
  const translatorEndpoint = await redisClient.get(`user:${chatId}:action`);
  const target = await redisClient.get(`user:${chatId}:lang`);

  if (!translatorEndpoint || !target) {
    homeMenue(bot, chatId);
    return;
  }

  const text = msg.text;

  const body = {
    source: "fa",
    target,
    text,
  };

  try {
    const response = await request(translatorEndpoint, body);
    console.log(response);

    if (response && response.result) {
      await bot.sendMessage(chatId, response.result);
    } else {
      await bot.sendMessage(chatId, "خطا در ترجمه. لطفاً دوباره تلاش کنید.");
      console.error("Invalid response format:", response);
    }
  } catch (error) {
    console.error("Translation error:", error);
    await bot.sendMessage(
      chatId,
      "خطا در اتصال به سرویس ترجمه. لطفاً دوباره تلاش کنید."
    );
  }
});

bot.on("callback_query", async (query) => {
  const validCommands = ["google", "microsoft", "farazin"];
  const validLanguages = ["fa", "en", "fa_en", "en_fa"];
  const command = query.data.split("/")[1];
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  if (validCommands.includes(command)) {
    await sendTranslationKeyboard(
      bot,
      translations[`${command}Translate`],
      chatId,
      components[`${command}TranslateInlineKeyboard`],
      messageId,
      command
    );
  }

  if (validLanguages.includes(command)) {
    await sendLanguage(bot, chatId, command, translations.sendWord);
  }
});

bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});

bot.on("webhook_error", (error) => {
  console.error("Webhook error:", error);
});
