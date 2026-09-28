import { app } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

connectDB().then(() => app.listen(env.PORT, () => console.log(`API on :${env.PORT}`)))
  .catch((e) => { console.error(e); process.exit(1); });
