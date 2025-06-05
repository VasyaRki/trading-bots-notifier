import dotenv from 'dotenv';
dotenv.config();

import './telegram/bots/open-interest.bot.js';
import './telegram/bots/pump.bot.js';
import { initNotifierService } from './notifierService.js';
import { connectRedis } from './redis/redisClient.js';
import { connectPg } from './db/pg.js';

await connectPg();
await connectRedis();
await initNotifierService();
