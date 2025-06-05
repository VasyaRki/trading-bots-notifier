import { redis } from './redis/redisClient.js';
import { db } from './db/pg.js';
import { sendTelegramMessage } from './telegram/send.js';
import { formatMessage } from './telegram/formatter.js';

const BOT_A_TOKEN = '7022021292:AAFfG0B-Qy-DpcyNGPbtYyFqCyA8MBBe4vo'; // для OI
const BOT_B_TOKEN = '7808157706:AAHT4-z4gPE6c7D8s6uhPfPdKZqO_2_HCHU'; // для Pump

const getSubscribedUsers = async () => {
  const res = await db.query(
    'SELECT "userId" FROM users WHERE "subscriptionStatus" = true',
  );
  return res.rows.map((row) => row.userId);
};

export const initNotifierService = async () => {
  redis.subscribe('OI_EVENT', 'PUMP_EVENT', (err, count) => {
    if (err) {
      console.error('❌ Redis subscribe error:', err);
    } else {
      console.log(`✅ Subscribed to ${count} Redis channels`);
    }
  });

  redis.on('message', async (channel, message) => {
    try {
      const data = JSON.parse(message);

      if (channel === 'OI_EVENT') {
        const users = await getSubscribedUsers();
        const msg = formatMessage(data, 'oi');

        for (const userId of users) {
          await sendTelegramMessage(BOT_A_TOKEN, userId, msg);
        }
      }

      if (channel === 'PUMP_EVENT') {
        const users = await getSubscribedUsers();
        const msg = formatMessage(data, 'pump');

        for (const userId of users) {
          await sendTelegramMessage(BOT_B_TOKEN, userId, msg);
        }
      }
    } catch (err) {
      console.error('❌ Failed to process message:', err);
    }
  });

  console.log('✅ Notifier service is running...');
};
