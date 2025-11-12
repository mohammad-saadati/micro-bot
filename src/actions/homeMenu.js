const homeInlineKeyboard = require("../components/homeMenuList");

const homeMenue = (bot, id) => {
  bot.sendMessage(id, "سلام به ربات ترجمه خوش آمدید", homeInlineKeyboard);
};

module.exports = homeMenue;
