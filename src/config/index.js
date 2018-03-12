import RateLimit from 'express-rate-limit';
import path from 'path';
import env from 'dotenv';

env.load();

export default {
  port: process.env.PORT || 5000,
  cors: { exposedHeaders: ['Link'] },
  logDirectory: path.join(__dirname, '/../../logs'),
  rateLimit: new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    delayMs: 0,
  }),
  authServiceUrl: process.env.AUTH_SERVICE_URL,
  statsServiceUrl: process.env.STATS_SERVICE_URL,
  feedServiceUrl: process.env.FEED_SERVICE_URL,
  notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL,
};
