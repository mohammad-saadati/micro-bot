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

const googleTranslateInlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "فارسی", callback_data: "/fa" },
        { text: "انگلیسی", callback_data: "/en" },
      ],
    ],
  },
};

const microsoftTranslateInlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "فارسی", callback_data: "/fa" },
        { text: "انگلیسی", callback_data: "/en" },
      ],
    ],
  },
};

const farazinTranslateInlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "فارسی", callback_data: "/en_fa" },
        { text: "انگلیسی", callback_data: "/fa_en" },
      ],
    ],
  },
};

module.exports = {
  homeInlineKeyboard,
  googleTranslateInlineKeyboard,
  microsoftTranslateInlineKeyboard,
  farazinTranslateInlineKeyboard,
};
