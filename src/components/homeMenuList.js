const homeInlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "ترجمه با گوگل", callback_data: "/google" },
        { text: "ترجمه با مایکروسافت", callback_data: "/microsoft" },
      ],
      [{ text: "ترجمه با فرازین", callback_data: "/farazin" }],
    ],
  },
};

module.exports = homeInlineKeyboard;
