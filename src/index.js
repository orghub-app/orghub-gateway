import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import proxy from 'http-proxy-middleware';
import config from './config';
import { errorHandler, logger } from './middleware';

const app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
}

app.use(helmet());
app.use(cors(config.cors));
app.use(config.rateLimit);
app.use(logger(config));

app.use('/login', proxy({ target: config.authServiceUrl, changeOrigin: true }));
app.use('/logout', proxy({ target: config.authServiceUrl, changeOrigin: true }));
app.use('/status', proxy({ target: config.authServiceUrl, changeOrigin: true }));
app.use('/unregister', proxy({ target: config.authServiceUrl, changeOrigin: true }));
app.use('/feed', proxy({ target: config.feedServiceUrl, changeOrigin: true }));
app.use('/stats', proxy({ target: config.statsServiceUrl, changeOrigin: true }));
app.use('/notifications', proxy({ target: config.notificationServiceUrl, changeOrigin: true }));
app.use('/payload', proxy({ target: config.notificationServiceUrl, changeOrigin: true }));

app.use(errorHandler);
app.listen(config.port, () => console.log(`server running at port ${config.port}`));

export default app;
