import { app } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const start = async () => {
  try {
    await connectDB();
  } catch (e) {
    console.warn('MongoDB connection pending or failed. Retrying in background:', (e as Error).message);
  }

  app.listen(env.PORT, () => {
    console.log(`API on :${env.PORT}`);
  });
};

start();
