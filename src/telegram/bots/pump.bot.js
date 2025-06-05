import TelegramBot from 'node-telegram-bot-api';
import { db } from '../../db/pg.js';

const TOKEN = '7808157706:AAHT4-z4gPE6c7D8s6uhPfPdKZqO_2_HCHU';

const pumpBot = new TelegramBot(TOKEN, { polling: true });

pumpBot.onText(/\/start/, async (msg) => {
  const userId = String(msg.chat.id);
  await db.query(
    'INSERT INTO users ("userId", "subscriptionStatus") VALUES ($1, true) ON CONFLICT ("userId") DO NOTHING',
    [userId]
  );
  pumpBot.sendMessage(userId, '👋 Ви зареєстровані! Підписка активна для Pump-сповіщень.');
});

pumpBot.onText(/\/subscribe/, async (msg) => {
  const userId = String(msg.chat.id);
  await db.query(
    'INSERT INTO users ("userId", "subscriptionStatus") VALUES ($1, true) ON CONFLICT ("userId") DO UPDATE SET "subscriptionStatus" = true',
    [userId]
  );
  pumpBot.sendMessage(userId, '✅ Ви підписались на Pump-сповіщення.');
});

pumpBot.onText(/\/unsubscribe/, async (msg) => {
  const userId = String(msg.chat.id);
  await db.query(
    'UPDATE users SET "subscriptionStatus" = false WHERE "userId" = $1',
    [userId]
  );
  pumpBot.sendMessage(userId, '❌ Ви відписались від Pump-сповіщень.');
});

pumpBot.onText(/\/status/, async (msg) => {
  const userId = String(msg.chat.id);
  const res = await db.query(
    'SELECT "subscriptionStatus" FROM users WHERE "userId" = $1',
    [userId]
  );
  const status = res.rows[0]?.subscriptionStatus;
  const text = status ? '📬 Ви підписані на Pump-сповіщення.' : '📭 Ви не підписані.';
  pumpBot.sendMessage(userId, text);
});

console.log('✅ Bot B (Pump) запущено');
