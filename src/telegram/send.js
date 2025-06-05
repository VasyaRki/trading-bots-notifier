import fetch from 'node-fetch';

const TELEGRAM_API = 'https://api.telegram.org';

export const sendTelegramMessage = async (botToken, chatId, text) => {
  try {
    await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });
  } catch (err) {
    console.error(`❌ Failed to send message to ${chatId}:`, err.message);
  }
};
