import TelegramBot from 'node-telegram-bot-api';
import { db } from '../../db/pg.js';

const TOKEN = '7022021292:AAFfG0B-Qy-DpcyNGPbtYyFqCyA8MBBe4vo';

const openInterestBot = new TelegramBot(TOKEN, { polling: true });

openInterestBot.onText(/\/start/, async (msg) => {
  const userId = String(msg.chat.id);
  await db.query(
    'INSERT INTO users ("userId", "subscriptionStatus") VALUES ($1, true) ON CONFLICT ("userId") DO NOTHING',
    [userId],
  );
  openInterestBot.sendMessage(
    userId,
    '👋 Ви зареєстровані! Підписка активна для Open Interest.',
  );
});

openInterestBot.onText(/\/subscribe/, async (msg) => {
  const userId = String(msg.chat.id);
  await db.query(
    'INSERT INTO users ("userId", "subscriptionStatus") VALUES ($1, true) ON CONFLICT ("userId") DO UPDATE SET "subscriptionStatus" = true',
    [userId],
  );
  openInterestBot.sendMessage(userId, '✅ Ви підписались на OI-сповіщення.');
});

openInterestBot.onText(/\/unsubscribe/, async (msg) => {
  const userId = String(msg.chat.id);
  await db.query(
    'UPDATE users SET "subscriptionStatus" = false WHERE "userId" = $1',
    [userId],
  );
  openInterestBot.sendMessage(userId, '❌ Ви відписались від OI-сповіщень.');
});

openInterestBot.onText(/\/status/, async (msg) => {
  const userId = String(msg.chat.id);
  const res = await db.query(
    'SELECT "subscriptionStatus" FROM users WHERE "userId" = $1',
    [userId],
  );
  const status = res.rows[0]?.subscriptionStatus;
  const text = status
    ? '📬 Ви підписані на OI-сповіщення.'
    : '📭 Ви не підписані.';
  openInterestBot.sendMessage(userId, text);
});

console.log('✅ Bot A (OI) запущено');
