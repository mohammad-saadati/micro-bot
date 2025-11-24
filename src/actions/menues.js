const { homeInlineKeyboard } = require("../components/homeMenuList");
const redisClient = require("../redis");

const homeMenue = (bot, id) => {
  bot.sendMessage(id, "سلام به ربات ترجمه خوش آمدید", homeInlineKeyboard);
};

const sendTranslationKeyboard = async (
  bot,
  message,
  chatId,
  keyboard,
  messageId,
  action
) => {
  try {
    if (action) {
      await redisClient.set(`user:${chatId}:action`, action, { EX: 3 * 60 });
    }

    await bot.editMessageText(message, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: keyboard.reply_markup,
    });
  } catch (error) {
    console.error("Error in sendTranslationKeyboard:", error);

    try {
      await bot.sendMessage(chatId, message, keyboard);
    } catch (sendError) {
      console.error("Error sending fallback message:", sendError);
    }
  }
};

const sendLanguage = async (bot, chatId, language, message) => {
  await redisClient.set(`user:${chatId}:lang`, language, { EX: 3 * 60 });
  await bot.sendMessage(chatId, message);
};

module.exports = { homeMenue, sendTranslationKeyboard, sendLanguage };
